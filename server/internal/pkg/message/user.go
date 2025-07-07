package message

import (
	"errors"
	"fmt"
)

var (
	ErrUserNotFound     = errors.New("user not found")
	ErrUserAlreadyExist = errors.New("email is already associated with another account")
	ErrUserBlocked      = errors.New("your account has been blocked")
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

func ErrUserFailedToGetByID(err error) error {
	return fmt.Errorf("error getting user by id: %w", err)
}

func ErrUserFailedToGetByEmail(err error) error {
	return fmt.Errorf("error getting user by email: %w", err)
}

func ErrUserFailedToGetAll(err error) error {
	return fmt.Errorf("error getting all users: %w", err)
}
