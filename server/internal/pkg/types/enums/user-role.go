package enums

import (
	"database/sql/driver"
	"fmt"

	enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"
)

type UserRole string

const (
	UserRole_USER  UserRole = "USER"
	UserRole_ADMIN UserRole = "ADMIN"
)

func (r UserRole) String() string {
	return string(r)
}

func (r *UserRole) Scan(src interface{}) error {
	switch v := src.(type) {
	case []byte:
		*r = UserRole(v)
		return nil
	case string:
		*r = UserRole(v)
		return nil
	default:
		return fmt.Errorf("UserRole: cannot scan %T", src)
	}
}

func (r UserRole) Value() (driver.Value, error) {
	return string(r), nil
}

func ProtoToUserRole(r enumsv1.UserRole) UserRole {
	switch r {
	case enumsv1.UserRole_USER_ROLE_ADMIN:
		return UserRole_ADMIN
	case enumsv1.UserRole_USER_ROLE_USER:
		return UserRole_USER
	default:
		return UserRole_USER
	}
}

func UserRoleToProto(r UserRole) enumsv1.UserRole {
	switch r {
	case UserRole_ADMIN:
		return enumsv1.UserRole_USER_ROLE_ADMIN
	case UserRole_USER:
		return enumsv1.UserRole_USER_ROLE_USER
	default:
		return enumsv1.UserRole_USER_ROLE_USER
	}
}
