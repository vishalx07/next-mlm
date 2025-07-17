package user_handler

import (
	"context"

	"connectrpc.com/connect"
	my_networkv1 "github.com/vishalx07/next-mlm/gen/user/my_network/v1"
	middleware "github.com/vishalx07/next-mlm/internal/middleware"
	"github.com/vishalx07/next-mlm/internal/pkg/types/enums"
	service "github.com/vishalx07/next-mlm/internal/service"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type MyNetworkHandler struct {
	userService service.UserServiceInterface
}

func NewMyNetworkHandler(userService service.UserServiceInterface) *MyNetworkHandler {
	return &MyNetworkHandler{userService}
}

func (h *MyNetworkHandler) GetMyReferrals(
	ctx context.Context,
	req *connect.Request[my_networkv1.GetMyReferralsRequest],
) (*connect.Response[my_networkv1.GetMyReferralsResponse], error) {
	user := middleware.UserFromContext(ctx)

	users, err := h.userService.GetMyReferrals(user.UserId)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	referrals := make([]*my_networkv1.GetMyReferralsResponse_Referral, 0, len(users))
	for _, user := range users {
		var avatar string
		if user.Avatar != nil {
			avatar = *user.Avatar
		}
		referrals = append(referrals, &my_networkv1.GetMyReferralsResponse_Referral{
			Id:          user.Id,
			UserId:      user.UserId,
			Fullname:    user.Fullname,
			Email:       user.Email,
			Avatar:      avatar,
			Country:     user.Country,
			PhoneNumber: user.Phone,
			CreatedAt:   timestamppb.New(user.CreatedAt),
		})
	}

	resp := connect.NewResponse(&my_networkv1.GetMyReferralsResponse{
		Referrals: referrals,
	})

	return resp, nil
}

func (h *MyNetworkHandler) GetTotalTeam(
	ctx context.Context,
	req *connect.Request[my_networkv1.GetTotalTeamRequest],
) (*connect.Response[my_networkv1.GetTotalTeamResponse], error) {
	user := middleware.UserFromContext(ctx)

	users, err := h.userService.GetTotalTeam(user.UserId)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	team := make([]*my_networkv1.GetTotalTeamResponse_Team, 0, len(users))
	for _, user := range users {
		var avatar string
		if user.Avatar != nil {
			avatar = *user.Avatar
		}
		team = append(team, &my_networkv1.GetTotalTeamResponse_Team{
			Id:          user.Id,
			UserId:      user.UserId,
			ReferralId:  user.ReferralId,
			Fullname:    user.Fullname,
			Email:       user.Email,
			Avatar:      avatar,
			Country:     user.Country,
			PhoneNumber: user.Phone,
			Status:      enums.UserStatusToProto(user.Status),
			CreatedAt:   timestamppb.New(user.CreatedAt),
		})
	}

	resp := connect.NewResponse(&my_networkv1.GetTotalTeamResponse{
		Team: team,
	})

	return resp, nil
}
