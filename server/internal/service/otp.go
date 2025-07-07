package service

import (
	"errors"
	"time"

	config "github.com/vishalx07/next-mlm/internal/config"
	models "github.com/vishalx07/next-mlm/internal/models"
	message "github.com/vishalx07/next-mlm/internal/pkg/message"
	number "github.com/vishalx07/next-mlm/internal/pkg/number"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	repo "github.com/vishalx07/next-mlm/internal/repository"
	"gorm.io/gorm"
)

type OtpServiceInterface interface {
	Create(*models.Otp) error
	Get(args *repo.GetOtpArgs) (*models.Otp, error)
	Delete(id string) error
	SendOtp(email string, purpose enums.OtpPurpose) (code int32, err error)
	VerifyOtp(args *repo.GetOtpArgs) error
}

type OtpService struct {
	otpRepo repo.OtpRepoInterface
}

func NewOtpService(otpRepo repo.OtpRepoInterface) OtpServiceInterface {
	return &OtpService{otpRepo}
}

func (s *OtpService) Create(otp *models.Otp) error {
	if err := s.otpRepo.Create(otp); err != nil {
		return message.ErrOtpFailedToCreate(err)
	}

	return nil
}

func (s *OtpService) Get(args *repo.GetOtpArgs) (*models.Otp, error) {
	otp, err := s.otpRepo.Get(args)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, message.ErrInvalidOtp
		}
		return nil, message.ErrOtpFailedToGet(err)
	}

	return otp, nil
}

func (s *OtpService) Delete(id string) error {
	if err := s.otpRepo.Delete(id); err != nil {
		return message.ErrOtpFailedToDelete(err)
	}

	return nil
}

func (s *OtpService) SendOtp(email string, purpose enums.OtpPurpose) (cdoe int32, err error) {
	code := number.GenerateRandomNumberOfDigits(config.OTP_LENGTH)
	// otp will be valid for 3 minutes
	validTill := time.Now().Add(config.OTP_EXPIRE_TIME)

	otp := models.Otp{
		Otp:       int32(code),
		Email:     email,
		Purpose:   purpose,
		ValidTill: validTill,
	}

	if err := s.Create(&otp); err != nil {
		return 0, err
	}

	return otp.Otp, nil
}

func (s *OtpService) VerifyOtp(args *repo.GetOtpArgs) error {
	otp, err := s.Get(args)
	if err != nil {
		return err
	}
	if otp.ValidTill.Before(time.Now()) {
		return message.ErrOtpExpired
	}
	if err := s.Delete(otp.Id); err != nil {
		return err
	}

	return nil
}
