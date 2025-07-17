package service

import (
	"errors"

	models "github.com/vishalx07/next-mlm/internal/models"
	bcrypt "github.com/vishalx07/next-mlm/internal/pkg/bcrypt"
	message "github.com/vishalx07/next-mlm/internal/pkg/message"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	repo "github.com/vishalx07/next-mlm/internal/repository"
	"gorm.io/gorm"
)

type UserServiceInterface interface {
	Create(*models.User) error
	Update(*models.User) error
	GetById(id string) (*models.User, error)
	GetByUserId(userId int32) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetAll() ([]*models.User, error)
	Delete(id string) error
	CheckUserExist(email string) (*models.User, error)
	IsEmailAlreadyExist(email string) error
	CheckReferralIdExist(referralId int32) error
	ValidateStatus(*models.User) error
	GetPasswordOrThrowError(user *models.User) (string, error)
	ValidatePassword(*models.User, string) error
	GenerateUserId() (int32, error)
	GetMyReferrals(userId int32) ([]*models.User, error)
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

func (s *UserService) GetById(id string) (*models.User, error) {
	user, err := s.userRepo.GetById(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, message.ErrUserNotFound
		}
		return nil, message.ErrUserFailedToGetById(err)
	}

	return user, nil
}

func (s *UserService) GetByUserId(userId int32) (*models.User, error) {
	user, err := s.userRepo.GetByUserId(userId)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, message.ErrUserNotFound
		}
		return nil, message.ErrUserFailedToGetByUserId(err)
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

	return message.ErrUserEmailAlreadyExist
}

func (s *UserService) CheckReferralIdExist(referralId int32) error {
	if _, err := s.GetByUserId(referralId); err != nil {
		if errors.Is(err, message.ErrUserNotFound) {
			return message.ErrUserReferralIdNotExist
		}
		return err
	}

	return nil
}

func (s *UserService) ValidateStatus(user *models.User) error {
	if user.Status != enums.UserStatus_ACTIVE {
		return message.ErrUserBlocked
	}

	return nil
}

func (s *UserService) GetPasswordOrThrowError(user *models.User) (string, error) {
	if user.Password == nil {
		return "", message.ErrPasswordNotUsed
	}
	return *user.Password, nil
}

func (s *UserService) ValidatePassword(user *models.User, password string) error {
	passwordFromDB, err := s.GetPasswordOrThrowError(user)
	if err != nil {
		return err
	}
	if err := bcrypt.VerifyPassword(password, passwordFromDB); err != nil {
		return err
	}
	return nil
}

func (s *UserService) GenerateUserId() (int32, error) {
	userId, err := s.userRepo.GenerateUserId()
	if err != nil {
		return 0, message.ErrUserFailedToGenerateUserId(err)
	}
	return userId, nil
}

func (s *UserService) GetMyReferrals(userId int32) ([]*models.User, error) {
	users, err := s.userRepo.GetMyReferrals(userId)
	if err != nil {
		return nil, message.ErrUserFailedToGetMyReferrals(err)
	}
	return users, nil
}
