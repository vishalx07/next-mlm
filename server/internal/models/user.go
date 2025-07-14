package models

import "github.com/vishalx07/next-mlm/internal/pkg/types/enums"

type User struct {
	ID
	UserId     int32            `gorm:"type:integer;uniqueIndex;not null"`
	Fullname   string           `gorm:"size:256;not null"`
	Email      string           `gorm:"size:256;uniqueIndex;not null"`
	Password   *string          `gorm:"size:256"`
	Role       enums.UserRole   `gorm:"type:user_role;default:USER;not null"`
	Status     enums.UserStatus `gorm:"type:user_status;default:ACTIVE;not null"`
	Avatar     *string          `gorm:"size:256"`
	Country    string           `gorm:"size:256;not null"`
	Phone      string           `gorm:"size:256;not null"`
	ReferralId int32            `gorm:"type:integer;not null"`
	Level      uint32           `gorm:"type:smallint;not null"`
	Timestamps
}

func (User) TableName() string {
	return "user"
}
