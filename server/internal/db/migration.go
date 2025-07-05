package DB

import (
	"fmt"
	"io"
	"log"
	"os"
	"strings"

	"ariga.io/atlas-provider-gorm/gormschema"
	"github.com/vishalx07/next-mlm/internal/models"
	"github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	"gorm.io/gorm"
)

func getModels() []any {
	return []any{
		&models.User{},
		&models.Otp{},
	}
}

func AutoMigrate(db *gorm.DB) error {
	err := db.AutoMigrate(getModels()...)
	if err != nil {
		return fmt.Errorf("🚫 Failed to migrate database: %w", err)
	}
	log.Print("✅ Database migrated successfully")
	return nil
}

func AtlasMigration() {
	stmts, err := gormschema.New("postgres").Load(getModels()...)
	if err != nil {
		fmt.Fprintf(os.Stderr, "🚫 Failed to load gorm schema: %v\n", err)
	}
	io.WriteString(os.Stdout, stmts)
}

func CreateEnumTypes(db *gorm.DB) error {
	// Define enum types and their values
	enumTypes := map[string][]string{
		"user_role":   {enums.UserRole_USER.String(), enums.UserRole_ADMIN.String()},
		"user_status": {enums.UserStatus_ACTIVE.String(), enums.UserStatus_BLOCKED.String()},
		"otp_purpose": {enums.OtpPurpose_LOGIN.String(), enums.OtpPurpose_REGISTER.String()},
	}

	for enumName, values := range enumTypes {
		// Construct the enum values string
		var enumValues []string
		for _, val := range values {
			enumValues = append(enumValues, fmt.Sprintf("'%s'", val))
		}
		enumValuesStr := strings.Join(enumValues, ", ")

		// Construct the SQL statement
		query := fmt.Sprintf(`
			DO $$
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '%s') THEN
					CREATE TYPE %s AS ENUM (%s);
				END IF;
			END
			$$;
		`, enumName, enumName, enumValuesStr)

		// Execute the SQL statement
		if err := db.Exec(query).Error; err != nil {
			return fmt.Errorf("failed to create enum type %s, 🚫Error: %w", enumName, err)
		}
	}

	return nil
}
