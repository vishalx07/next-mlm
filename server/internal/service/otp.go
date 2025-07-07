package service

import (
	"errors"
	"time"

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
	SendOtp(email string, purpose enums.OtpPurpose) (code int, err error)
	VerifyOtp(args *VerifyOtpArgs) error
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

func (s *OtpService) SendOtp(email string, purpose enums.OtpPurpose) (cdoe int, err error) {
	code := number.GenerateRandomNumberOfDigits(6)
	// otp will be valid for 3 minutes
	validTill := time.Now().Add(time.Minute * 3)

	otp := models.Otp{
		OTP:       code,
		Email:     email,
		Purpose:   purpose,
		ValidTill: validTill,
	}

	if err := s.Create(&otp); err != nil {
		return 0, err
	}

	return otp.OTP, nil
}

type VerifyOtpArgs struct {
	repo.GetOtpArgs
}

func (s *OtpService) VerifyOtp(args *VerifyOtpArgs) error {
	getOtpArgs := repo.GetOtpArgs{
		Email:   args.Email,
		Purpose: args.Purpose,
		OTP:     args.OTP,
	}
	otp, err := s.Get(&getOtpArgs)
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
