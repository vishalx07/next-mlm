package enums

import enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"

type UserStatus string

const (
	UserStatus_ACTIVE  UserStatus = "ACTIVE"
	UserStatus_BLOCKED UserStatus = "BLOCKED"
)

func (r UserStatus) String() string {
	return string(r)
}

func ProtoToUserStatus(r enumsv1.UserStatus) UserStatus {
	switch r {
	case enumsv1.UserStatus_USER_STATUS_ACTIVE:
		return UserStatus_ACTIVE
	case enumsv1.UserStatus_USER_STATUS_BLOCKED:
		fallthrough
	default:
		return UserStatus_BLOCKED
	}
}

func UserStatusToProto(r UserStatus) enumsv1.UserStatus {
	switch r {
	case UserStatus_ACTIVE:
		return enumsv1.UserStatus_USER_STATUS_ACTIVE
	case UserStatus_BLOCKED:
		fallthrough
	default:
		return enumsv1.UserStatus_USER_STATUS_BLOCKED
	}
}
