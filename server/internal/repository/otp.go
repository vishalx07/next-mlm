package repo

import (
	models "github.com/vishalx07/next-mlm/internal/models"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	"gorm.io/gorm"
)

type OtpRepoInterface interface {
	Create(*models.Otp) error
	Get(args *GetOtpArgs) (*models.Otp, error)
	Delete(id string) error
}

type OtpRepo struct {
	db *gorm.DB
}

func NewOtpRepo(db *gorm.DB) OtpRepoInterface {
	return &OtpRepo{db}
}

func (repo *OtpRepo) Create(otp *models.Otp) error {
	err := repo.db.Create(otp).Error

	return err
}

type GetOtpArgs struct {
	Email   string
	Purpose enums.OtpPurpose
	OTP     int
}

func (repo *OtpRepo) Get(args *GetOtpArgs) (*models.Otp, error) {
	var otp models.Otp
	err := repo.db.
		Where("email = ? AND purpose = ? AND otp = ?", args.Email, args.Purpose, args.OTP).
		Order("valid_till DESC").
		Take(&otp).
		Error
	if err != nil {
		return nil, err
	}

	return &otp, nil
}

func (repo *OtpRepo) Delete(id string) error {
	err := repo.db.Where("id = ?", id).Delete(&models.Otp{}).Error

	return err
}
