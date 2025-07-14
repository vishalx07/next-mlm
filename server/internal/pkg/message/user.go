package message

import (
	"errors"
	"fmt"
)

var (
	UserUpdateSuccess = "User updated successfully"
)

var (
	ErrUserNotFound           = errors.New("user not found")
	ErrUserEmailAlreadyExist  = errors.New("email is already exist")
	ErrUserBlocked            = errors.New("your account has been blocked")
	ErrPasswordNotUsed        = errors.New("account not use email & password")
	ErrUserReferralIdNotExist = errors.New("referral id not exist")
)

func ErrUserFailedToCreate(err error) error {
	return fmt.Errorf("error creating user: %w", err)
}

func ErrUserFailedToUpdate(err error) error {
	return fmt.Errorf("error updating user: %w", err)
}

func ErrUserFailedToDelete(err error) error {
	return fmt.Errorf("error deleting user: %w", err)
}

func ErrUserFailedToGetById(err error) error {
	return fmt.Errorf("error getting user by id: %w", err)
}

func ErrUserFailedToGetByUserId(err error) error {
	return fmt.Errorf("error getting user by user id: %w", err)
}

func ErrUserFailedToGetByEmail(err error) error {
	return fmt.Errorf("error getting user by email: %w", err)
}

func ErrUserFailedToGetAll(err error) error {
	return fmt.Errorf("error getting all users: %w", err)
}

func ErrUserFailedToGenerateUserId(err error) error {
	return fmt.Errorf("error generating user id: %w", err)
}
