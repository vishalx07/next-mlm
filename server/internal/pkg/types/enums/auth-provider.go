package enums

import (
	"database/sql/driver"
	"fmt"
	"strings"

	enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"
)

type AuthProvider string

const (
	AuthProvider_EMAIL_PASSWORD AuthProvider = "EMAIL_PASSWORD"
	AuthProvider_GOOGLE         AuthProvider = "GOOGLE"
	AuthProvider_LINKEDIN       AuthProvider = "LINKEDIN"
)

func (p AuthProvider) String() string {
	return string(p)
}

// AuthProviders is a custom type representing a slice of AuthProvider enums.
//
// We implement sql.Scanner to convert DB values into this type on SELECT,
// and driver.Valuer to convert it back to a DB-friendly format on INSERT/UPDATE.
type AuthProviders []AuthProvider

// Value marshals the slice into PostgreSQL array string format, e.g. '{GOOGLE,EMAIL_PASSWORD}'
func (p AuthProviders) Value() (driver.Value, error) {
	// Return an empty array when there are no providers
	if len(p) == 0 {
		return "{}", nil
	}
	strs := make([]string, len(p))
	for i, v := range p {
		strs[i] = v.String() // using your enum’s String() method
	}
	joined := strings.Join(strs, ",")
	return fmt.Sprintf("{%s}", joined), nil
}

// Scan parses a PostgreSQL array string into AuthProviders,
// e.g. '{GOOGLE,EMAIL_PASSWORD}' → []AuthProvider{"GOOGLE","EMAIL_PASSWORD"}
func (p *AuthProviders) Scan(src interface{}) error {
	var srcStr string

	switch v := src.(type) {
	case string:
		srcStr = v
	case []byte:
		srcStr = string(v)
	default:
		return fmt.Errorf("AuthProviders: cannot scan %T", src)
	}

	trimmed := strings.Trim(srcStr, "{}")
	if trimmed == "" {
		*p = []AuthProvider{}
		return nil
	}

	parts := strings.Split(trimmed, ",")
	out := make(AuthProviders, len(parts))
	for i, part := range parts {
		out[i] = AuthProvider(part)
	}
	*p = out
	return nil
}

func ProtoToAuthProvider(p enumsv1.AuthProvider) AuthProvider {
	switch p {
	case enumsv1.AuthProvider_AUTH_PROVIDER_EMAIL_PASSWORD:
		return AuthProvider_EMAIL_PASSWORD
	case enumsv1.AuthProvider_AUTH_PROVIDER_GOOGLE:
		return AuthProvider_GOOGLE
	case enumsv1.AuthProvider_AUTH_PROVIDER_LINKEDIN:
		return AuthProvider_LINKEDIN
	default:
		return AuthProvider_LINKEDIN
	}
}

func AuthProviderToProto(p AuthProvider) enumsv1.AuthProvider {
	switch p {
	case AuthProvider_EMAIL_PASSWORD:
		return enumsv1.AuthProvider_AUTH_PROVIDER_EMAIL_PASSWORD
	case AuthProvider_GOOGLE:
		return enumsv1.AuthProvider_AUTH_PROVIDER_GOOGLE
	case AuthProvider_LINKEDIN:
		return enumsv1.AuthProvider_AUTH_PROVIDER_LINKEDIN
	default:
		return enumsv1.AuthProvider_AUTH_PROVIDER_LINKEDIN
	}
}
