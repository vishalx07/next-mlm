package models

import (
	"time"

	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
)

type Otp struct {
	ID
	OTP       int              `gorm:"type:integer;not null"`
	Email     string           `gorm:"size:256;not null"`
	Purpose   enums.OtpPurpose `gorm:"type:otp_purpose;not null"`
	ValidTill time.Time        `gorm:"not null"`
}

func (Otp) TableName() string {
	return "otp"
}
