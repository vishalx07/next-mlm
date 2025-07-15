package root_handler

import (
	"context"
	"errors"

	"connectrpc.com/connect"
	authv1 "github.com/vishalx07/next-mlm/gen/auth/v1"
	"github.com/vishalx07/next-mlm/gen/auth/v1/authv1connect"
	enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"
	typesv1 "github.com/vishalx07/next-mlm/gen/types/v1"
	config "github.com/vishalx07/next-mlm/internal/config"
	models "github.com/vishalx07/next-mlm/internal/models"
	bcrypt "github.com/vishalx07/next-mlm/internal/pkg/bcrypt"
	jwt "github.com/vishalx07/next-mlm/internal/pkg/jwt"
	message "github.com/vishalx07/next-mlm/internal/pkg/message"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	repo "github.com/vishalx07/next-mlm/internal/repository"
	service "github.com/vishalx07/next-mlm/internal/service"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AuthHandler struct {
	env         *config.Env
	userService service.UserServiceInterface
	otpService  service.OtpServiceInterface
	authv1connect.UnimplementedAuthServiceHandler
}

func NewAuthHandler(
	env *config.Env,
	userService service.UserServiceInterface,
	otpService service.OtpServiceInterface) *AuthHandler {
	return &AuthHandler{
		env:         env,
		userService: userService,
		otpService:  otpService,
	}
}

// Login
func (h *AuthHandler) Login(
	ctx context.Context,
	req *connect.Request[authv1.LoginRequest],
) (*connect.Response[authv1.LoginResponse], error) {
	// check user exist
	user, err := h.userService.CheckUserExist(req.Msg.Email)
	if err != nil {
		if errors.Is(err, message.ErrUserNotFound) {
			return nil, connect.NewError(connect.CodeNotFound, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// check user status
	if err := h.userService.ValidateStatus(user); err != nil {
		return nil, connect.NewError(connect.CodeFailedPrecondition, err)
	}

	// verify password
	if err := h.userService.ValidatePassword(user, req.Msg.Password); err != nil {
		if errors.Is(err, message.ErrPasswordNotUsed) {
			return nil, connect.NewError(connect.CodeFailedPrecondition, err)
		}
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	// generate token
	token, err := jwt.GenerateToken(&jwt.GenerateTokenArgs{
		Id:     user.Id,
		Expiry: config.TOKEN_EXPIRE_TIME,
		Env:    h.env,
	})
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	resp := connect.NewResponse(&authv1.LoginResponse{
		Message: message.LoginSuccess,
		Token:   token,
		User:    h.transformUserModel(user),
	})

	return resp, nil
}

// Register
func (h *AuthHandler) RegisterStep1(
	ctx context.Context,
	req *connect.Request[authv1.RegisterStep1Request],
) (*connect.Response[authv1.RegisterStep1Response], error) {
	// check email already exist
	if err := h.userService.IsEmailAlreadyExist(req.Msg.Email); err != nil {
		if errors.Is(err, message.ErrUserEmailAlreadyExist) {
			return nil, connect.NewError(connect.CodeAlreadyExists, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	resp := connect.NewResponse(&authv1.RegisterStep1Response{
		Message: message.RegisterStep1Success,
	})

	return resp, nil
}

func (h *AuthHandler) RegisterStep2(
	ctx context.Context,
	req *connect.Request[authv1.RegisterStep2Request],
) (*connect.Response[authv1.RegisterStep2Response], error) {
	// check email already exist
	if err := h.userService.IsEmailAlreadyExist(req.Msg.Step1.Email); err != nil {
		if errors.Is(err, message.ErrUserEmailAlreadyExist) {
			return nil, connect.NewError(connect.CodeAlreadyExists, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// check referral id exist
	if err := h.userService.CheckReferralIdExist(req.Msg.ReferralId); err != nil {
		if errors.Is(err, message.ErrUserReferralIdNotExist) {
			return nil, connect.NewError(connect.CodeNotFound, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// send otp
	_, err := h.otpService.SendOtp(req.Msg.Step1.Email, enums.OtpPurpose_REGISTER)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// todo: send otp to email

	resp := connect.NewResponse(&authv1.RegisterStep2Response{
		Message: message.RegisterStep2Success,
	})

	return resp, nil
}

func (h *AuthHandler) Register(
	ctx context.Context,
	req *connect.Request[authv1.RegisterRequest],
) (*connect.Response[authv1.RegisterResponse], error) {
	user := h.transformUserRPC(req)

	// check referral id exist
	if err := h.userService.CheckReferralIdExist(user.ReferralId); err != nil {
		if errors.Is(err, message.ErrUserReferralIdNotExist) {
			return nil, connect.NewError(connect.CodeNotFound, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// check email already exist
	if err := h.userService.IsEmailAlreadyExist(user.Email); err != nil {
		if errors.Is(err, message.ErrUserEmailAlreadyExist) {
			return nil, connect.NewError(connect.CodeAlreadyExists, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// hash password
	hashedPassword, err := bcrypt.HashPassword(*user.Password)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	user.Password = &hashedPassword

	// generate user id
	userId, err := h.userService.GenerateUserId()
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	user.UserId = userId

	// generate token
	token, err := jwt.GenerateToken(&jwt.GenerateTokenArgs{
		Id:     user.Id,
		Expiry: config.TOKEN_EXPIRE_TIME,
		Env:    h.env,
	})
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// verify otp
	verifyOtpArgs := repo.GetOtpArgs{
		Email:   user.Email,
		Purpose: enums.OtpPurpose_REGISTER,
		Otp:     req.Msg.Otp,
	}
	if err := h.otpService.VerifyOtp(&verifyOtpArgs); err != nil {
		if errors.Is(err, message.ErrInvalidOtp) {
			return nil, connect.NewError(connect.CodeInvalidArgument, err)
		}
		if errors.Is(err, message.ErrOtpExpired) {
			return nil, connect.NewError(connect.CodeFailedPrecondition, err)
		}
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// create user
	if err = h.userService.Create(user); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// todo: send register success email

	resp := connect.NewResponse(&authv1.RegisterResponse{
		Message: message.RegisterSuccess,
		Token:   token,
		User:    h.transformUserModel(user),
	})

	return resp, nil
}

// Transforms
func (h *AuthHandler) transformUserRPC(req *connect.Request[authv1.RegisterRequest]) *models.User {
	return &models.User{
		ReferralId: req.Msg.Step2.ReferralId,
		Fullname:   req.Msg.Step2.Fullname,
		Email:      req.Msg.Step1.Email,
		Password:   &req.Msg.Step1.Password,
		Country:    req.Msg.Step2.Country,
		Phone:      req.Msg.Step2.PhoneNumber,
		Providers:  []enums.AuthProvider{enums.AuthProvider_EMAIL_PASSWORD},
	}
}

func (h *AuthHandler) transformUserModel(user *models.User) *typesv1.User {
	var avatar string
	if user.Avatar != nil {
		avatar = *user.Avatar
	}

	// var pbProviders []enumsv1.AuthProvider
	pbProviders := make([]enumsv1.AuthProvider, 0, len(user.Providers))
	for _, p := range user.Providers {
		pbProviders = append(pbProviders, enums.AuthProviderToProto(p))
	}

	return &typesv1.User{
		Id:          user.Id,
		UserId:      user.UserId,
		Fullname:    user.Fullname,
		Email:       user.Email,
		Role:        enums.UserRoleToProto(user.Role),
		Status:      enums.UserStatusToProto(user.Status),
		Avatar:      avatar,
		Country:     user.Country,
		PhoneNumber: user.Phone,
		ReferralId:  user.ReferralId,
		Level:       user.Level,
		Providers:   pbProviders,
		CreatedAt:   timestamppb.New(user.CreatedAt),
		UpdatedAt:   timestamppb.New(user.UpdatedAt),
	}
}
