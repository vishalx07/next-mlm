package enums

import enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"

type UserRole string

const (
	UserRole_USER  UserRole = "USER"
	UserRole_ADMIN UserRole = "ADMIN"
)

func (r UserRole) String() string {
	return string(r)
}

func ProtoToUserRole(r enumsv1.UserRole) UserRole {
	switch r {
	case enumsv1.UserRole_USER_ROLE_ADMIN:
		return UserRole_ADMIN
	case enumsv1.UserRole_USER_ROLE_USER:
		fallthrough
	default:
		return UserRole_USER
	}
}

func UserRoleToProto(r UserRole) enumsv1.UserRole {
	switch r {
	case UserRole_ADMIN:
		return enumsv1.UserRole_USER_ROLE_ADMIN
	case UserRole_USER:
		fallthrough
	default:
		return enumsv1.UserRole_USER_ROLE_USER
	}
}
