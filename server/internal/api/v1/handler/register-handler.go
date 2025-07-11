package handler

import (
	"log"
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/validate"
	"github.com/vishalx07/next-mlm/gen/auth/v1/authv1connect"
	"github.com/vishalx07/next-mlm/gen/user/profile/v1/profilev1connect"
	root_handler "github.com/vishalx07/next-mlm/internal/api/v1/handler/root"
	user_handler "github.com/vishalx07/next-mlm/internal/api/v1/handler/user"
	middleware "github.com/vishalx07/next-mlm/internal/middleware"
	server "github.com/vishalx07/next-mlm/internal/pkg/server"
	repo "github.com/vishalx07/next-mlm/internal/repository"
	service "github.com/vishalx07/next-mlm/internal/service"
)

func newValidationInterceptor() *validate.Interceptor {
	// Create the validation interceptor provided by connectrpc.com/validate.
	validateInterceptor, err := validate.NewInterceptor()
	if err != nil {
		log.Fatalf("🚫 Error creating validation interceptor: %v", err)
	}

	return validateInterceptor
}

func RegisterHandler(s *server.Server) {
	db := s.DB
	env := s.Env
	mux := s.Mux
	validateInterceptor := newValidationInterceptor()

	// =============================== REPOSITORIES ===============================
	userRepo := repo.NewUserRepo(db)
	otpRepo := repo.NewOtpRepo(db)

	// =============================== SERVICES ===============================
	userService := service.NewUserService(userRepo)
	otpService := service.NewOtpService(otpRepo)

	// =============================== ROOT SERVICES ===============================
	// Auth Service
	authHandler := root_handler.NewAuthHandler(env, userService, otpService)
	authServicePath, authServiceHandler := authv1connect.NewAuthServiceHandler(authHandler, connect.WithInterceptors(validateInterceptor))
	mux.Handle(authServicePath, authServiceHandler)

	// =============================== USER SERVICES ===============================
	userMw := func(next http.Handler) http.Handler {
		return middleware.AuthMiddleware(next, env, userService)
	}

	profileHandler := user_handler.NewProfileHandler(userService)
	profileServicePath, profileServiceHandler := profilev1connect.NewProfileServiceHandler(profileHandler, connect.WithInterceptors(validateInterceptor))
	mux.Handle(profileServicePath, userMw(profileServiceHandler))

	// =============================== ADMIN SERVICES ===============================
}
