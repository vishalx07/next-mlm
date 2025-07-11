package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"

	config "github.com/vishalx07/next-mlm/internal/config"
	models "github.com/vishalx07/next-mlm/internal/models"
	jwt "github.com/vishalx07/next-mlm/internal/pkg/jwt"
	service "github.com/vishalx07/next-mlm/internal/service"
)

type contextKey string

const KeyUser contextKey = "user"

// Middleware reads cookie, validates JWT, fetches user, injects into context
func AuthMiddleware(
	next http.Handler,
	env *config.Env,
	userService service.UserServiceInterface,
) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bearerToken := r.Header.Get("Authorization")

		if (bearerToken == "") || !strings.HasPrefix(bearerToken, "Bearer ") {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		token := strings.TrimPrefix(bearerToken, "Bearer ")

		id, err := jwt.VerifyToken(&jwt.VerifyTokenArgs{
			Token: token,
			Env:   env,
		})
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		user, err := userService.GetById(id)
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), KeyUser, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func UserFromContext(ctx context.Context) *models.User {
	user, ok := ctx.Value(KeyUser).(*models.User)
	if !ok {
		// This really shouldn't happen—middleware already checks auth
		log.Print("🚫 User not found in context")
	}
	return user
}
