package user_handler

import (
	"context"
	"errors"

	"connectrpc.com/connect"
	enumsv1 "github.com/vishalx07/next-mlm/gen/enums/v1"
	typesv1 "github.com/vishalx07/next-mlm/gen/types/v1"
	profilev1 "github.com/vishalx07/next-mlm/gen/user/profile/v1"
	middleware "github.com/vishalx07/next-mlm/internal/middleware"
	models "github.com/vishalx07/next-mlm/internal/models"
	bcrypt "github.com/vishalx07/next-mlm/internal/pkg/bcrypt"
	message "github.com/vishalx07/next-mlm/internal/pkg/message"
	enums "github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	service "github.com/vishalx07/next-mlm/internal/service"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ProfileHandler struct {
	userService service.UserServiceInterface
}

func NewProfileHandler(userService service.UserServiceInterface) *ProfileHandler {
	return &ProfileHandler{userService}
}

func (h *ProfileHandler) GetProfile(
	ctx context.Context,
	req *connect.Request[profilev1.GetProfileRequest],
) (*connect.Response[profilev1.GetProfileResponse], error) {
	user := middleware.UserFromContext(ctx)
	provider := middleware.ProviderFromContext(ctx)

	resp := connect.NewResponse(&profilev1.GetProfileResponse{
		User:        h.transformUserModel(user),
		LoginMethod: enums.AuthProviderToProto(provider),
	})

	return resp, nil
}

func (h *ProfileHandler) UpdateProfile(
	ctx context.Context,
	req *connect.Request[profilev1.UpdateProfileRequest],
) (*connect.Response[profilev1.UpdateProfileResponse], error) {
	user := middleware.UserFromContext(ctx)

	user.Avatar = &req.Msg.Avatar
	user.Fullname = req.Msg.Fullname
	user.Country = req.Msg.Country
	user.Phone = req.Msg.PhoneNumber

	err := h.userService.Update(user)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	resp := connect.NewResponse(&profilev1.UpdateProfileResponse{
		Message: message.UserUpdateSuccess,
		User:    h.transformUserModel(user),
	})

	return resp, nil
}

func (h *ProfileHandler) UpdatePassword(
	ctx context.Context,
	req *connect.Request[profilev1.UpdatePasswordRequest],
) (*connect.Response[profilev1.UpdatePasswordResponse], error) {
	user := middleware.UserFromContext(ctx)

	// verify password
	if err := h.userService.ValidatePassword(user, req.Msg.CurrentPassword); err != nil {
		if errors.Is(err, message.ErrPasswordNotUsed) {
			return nil, connect.NewError(connect.CodeFailedPrecondition, err)
		}
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	// hash password
	hashedPassword, err := bcrypt.HashPassword(req.Msg.NewPassword)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	user.Password = &hashedPassword

	if err := h.userService.Update(user); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	resp := connect.NewResponse(&profilev1.UpdatePasswordResponse{
		Message: message.UserPasswordUpdateSuccess,
	})

	return resp, nil
}

func (h *ProfileHandler) transformUserModel(user *models.User) *typesv1.User {
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
