package message

import (
	"errors"
	"fmt"
)

var (
	ErrInvalidOtp = errors.New("invalid otp")
	ErrOtpExpired = errors.New("otp has been expired")
)

func ErrOtpFailedToCreate(err error) error {
	return fmt.Errorf("error creating otp: %w", err)
}

func ErrOtpFailedToDelete(err error) error {
	return fmt.Errorf("error deleting otp: %w", err)
}

func ErrOtpFailedToGet(err error) error {
	return fmt.Errorf("error getting otp: %w", err)
}
