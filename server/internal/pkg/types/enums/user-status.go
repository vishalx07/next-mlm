package enums

import (
	"database/sql/driver"
	"fmt"

	enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"
)

type UserStatus string

const (
	UserStatus_ACTIVE  UserStatus = "ACTIVE"
	UserStatus_BLOCKED UserStatus = "BLOCKED"
)

func (s UserStatus) String() string {
	return string(s)
}

func (s *UserStatus) Scan(src interface{}) error {
	switch v := src.(type) {
	case []byte:
		*s = UserStatus(v)
		return nil
	case string:
		*s = UserStatus(v)
		return nil
	default:
		return fmt.Errorf("UserStatus: cannot scan %T", src)
	}
}

func (s UserStatus) Value() (driver.Value, error) {
	return string(s), nil
}

func ProtoToUserStatus(s enumsv1.UserStatus) UserStatus {
	switch s {
	case enumsv1.UserStatus_USER_STATUS_ACTIVE:
		return UserStatus_ACTIVE
	case enumsv1.UserStatus_USER_STATUS_BLOCKED:
		return UserStatus_BLOCKED
	default:
		return UserStatus_BLOCKED
	}
}

func UserStatusToProto(s UserStatus) enumsv1.UserStatus {
	switch s {
	case UserStatus_ACTIVE:
		return enumsv1.UserStatus_USER_STATUS_ACTIVE
	case UserStatus_BLOCKED:
		return enumsv1.UserStatus_USER_STATUS_BLOCKED
	default:
		return enumsv1.UserStatus_USER_STATUS_BLOCKED
	}
}
