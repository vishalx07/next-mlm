package repo

import (
	models "github.com/vishalx07/next-mlm/internal/models"
	"gorm.io/gorm"
)

type UserRepoInterface interface {
	Create(*models.User) error
	Update(*models.User) error
	GetByID(id string) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetAll() ([]*models.User, error)
	Delete(id string) error
}

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) UserRepoInterface {
	return &UserRepo{db}
}

func (repo *UserRepo) Create(user *models.User) error {
	err := repo.db.Create(user).Error

	return err
}

func (repo *UserRepo) Update(user *models.User) error {
	err := repo.db.Where("id = ?", user.ID).Updates(user).Error

	return err
}

func (repo *UserRepo) GetByID(id string) (*models.User, error) {
	var user models.User
	if err := repo.db.Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (repo *UserRepo) GetByEmail(email string) (*models.User, error) {
	var user models.User
	if err := repo.db.Where("email = ?", email).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (repo *UserRepo) GetAll() ([]*models.User, error) {
	var users []*models.User
	if err := repo.db.Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

func (repo *UserRepo) Delete(id string) error {
	err := repo.db.Where("id = ?", id).Delete(&models.User{}).Error

	return err
}
