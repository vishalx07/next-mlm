package service

import (
	"errors"

	models "github.com/vishalx07/next-mlm/internal/models"
	message "github.com/vishalx07/next-mlm/internal/pkg/message"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	repo "github.com/vishalx07/next-mlm/internal/repository"
	"gorm.io/gorm"
)

type UserServiceInterface interface {
	Create(*models.User) error
	Update(*models.User) error
	GetByID(id string) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetAll() ([]*models.User, error)
	Delete(id string) error
	CheckUserExist(email string) (*models.User, error)
	IsEmailAlreadyExist(email string) error
	ValidateStatus(*models.User) error
}

type UserService struct {
	userRepo repo.UserRepoInterface
}

func NewUserService(userRepo repo.UserRepoInterface) UserServiceInterface {
	return &UserService{userRepo}
}

func (s *UserService) Create(user *models.User) error {
	if err := s.userRepo.Create(user); err != nil {
		return message.ErrUserFailedToCreate(err)
	}

	return nil
}

func (s *UserService) Update(user *models.User) error {
	if err := s.userRepo.Update(user); err != nil {
		return message.ErrUserFailedToUpdate(err)
	}

	return nil
}

func (s *UserService) GetByID(id string) (*models.User, error) {
	user, err := s.userRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, message.ErrUserNotFound
		}
		return nil, message.ErrUserFailedToGetByID(err)
	}

	return user, nil
}

func (s *UserService) GetByEmail(email string) (*models.User, error) {
	user, err := s.userRepo.GetByEmail(email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, message.ErrUserNotFound
		}
		return nil, message.ErrUserFailedToGetByEmail(err)
	}

	return user, nil
}

func (s *UserService) GetAll() ([]*models.User, error) {
	users, err := s.userRepo.GetAll()
	if err != nil {
		return nil, message.ErrUserFailedToGetAll(err)
	}

	return users, nil
}

func (s *UserService) Delete(id string) error {
	if err := s.userRepo.Delete(id); err != nil {
		return message.ErrUserFailedToDelete(err)
	}

	return nil
}

func (s *UserService) CheckUserExist(email string) (*models.User, error) {
	user, err := s.GetByEmail(email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) IsEmailAlreadyExist(email string) error {
	if _, err := s.userRepo.GetByEmail(email); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil
		}
		return message.ErrUserFailedToGetByEmail(err)
	}

	return message.ErrUserAlreadyExist
}

func (s *UserService) ValidateStatus(user *models.User) error {
	if user.Status != enums.UserStatus_ACTIVE {
		return message.ErrUserBlocked
	}

	return nil
}
