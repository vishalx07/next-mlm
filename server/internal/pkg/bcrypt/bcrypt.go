package bcrypt

import (
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (hash string, err error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	return string(hashedPassword), nil
}

func VerifyPassword(password string, hash string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)); err != nil {
		return errors.New("password does not match")
	}
	return nil
}
