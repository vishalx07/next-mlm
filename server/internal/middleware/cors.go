package middleware

import (
	"net/http"
	"strings"

	connectcors "connectrpc.com/cors"
	"github.com/rs/cors"
	config "github.com/vishalx07/next-mlm/internal/config"
)

// withCORS adds CORS support to a Connect HTTP handler.
func WithCORS(h http.Handler, env *config.Env) http.Handler {
	allowedOrigins := strings.Split(env.AllowedOrigins, ",")
	allowedHeaders := append(connectcors.AllowedHeaders(),
		"Authorization",
		// "X-Admin-Authorization",
	)

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,               // Replace with your Next.js frontend origin [13]
		AllowedMethods:   connectcors.AllowedMethods(), // GET, POST [10, 13]
		AllowedHeaders:   allowedHeaders,               // Content-Type, Connect-Protocol-Version, etc. [10, 13]
		ExposedHeaders:   connectcors.ExposedHeaders(), // Grpc-Status, Grpc-Message, etc. [10, 13]
		MaxAge:           7200,                         // 2 hours cache for preflight requests [13]
		AllowCredentials: true,                         // Important if you plan to use cookies/auth headers later
	})
	return c.Handler(h)
}
