package DB

import (
	"fmt"
	"log"

	config "github.com/vishalx07/next-mlm/internal/configs"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

func ConnectDB(env *config.Env) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(env.DatabaseUrl), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})
	if err != nil {
		return nil, fmt.Errorf("🚫 Failed to connect to database: %w", err)
	}

	// Get the underlying SQL DB object
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("🚫 Failed to get DB object: %v", err)
	}
	// Verify connection
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("🚫 Failed to ping DB: %v", err)
	}

	log.Print("✅ Database Connected")

	return db, nil
}
