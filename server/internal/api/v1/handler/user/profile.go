package user_handler

import (
	"context"

	"connectrpc.com/connect"
	typesv1 "github.com/vishalx07/next-mlm/gen/types/v1"
	profilev1 "github.com/vishalx07/next-mlm/gen/user/profile/v1"
	middleware "github.com/vishalx07/next-mlm/internal/middleware"
	models "github.com/vishalx07/next-mlm/internal/models"
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

	resp := connect.NewResponse(&profilev1.GetProfileResponse{
		User: h.transformUserModel(user),
	})

	return resp, nil
}

func (h *ProfileHandler) transformUserModel(user *models.User) *typesv1.User {
	var avatar string
	if user.Avatar != nil {
		avatar = *user.Avatar
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
		CreatedAt:   timestamppb.New(user.CreatedAt),
		UpdatedAt:   timestamppb.New(user.UpdatedAt),
	}
}
