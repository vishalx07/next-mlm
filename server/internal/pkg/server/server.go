package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	connectcors "connectrpc.com/cors"
	"github.com/rs/cors"
	config "github.com/vishalx07/next-mlm/internal/config"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"gorm.io/gorm"
)

type Server struct {
	DB  *gorm.DB
	Env *config.Env
	Mux *http.ServeMux
}

func NewServer(db *gorm.DB, env *config.Env, mux *http.ServeMux) *Server {
	return &Server{db, env, mux}
}

func (s *Server) Run() error {
	log.Printf("✅ Server listening on port %v", s.Env.Port)
	// Use h2c to support HTTP/2 without TLS for gRPC
	server := &http.Server{
		Addr:    "localhost:" + s.Env.Port,
		Handler: withCORS(h2c.NewHandler(s.Mux, &http2.Server{}), s.Env),
	}
	if err := server.ListenAndServe(); err != nil {
		return fmt.Errorf("🚫 Error starting the server: %v", err)
	}

	return nil
}

// withCORS adds CORS support to a Connect HTTP handler.
func withCORS(h http.Handler, env *config.Env) http.Handler {
	allowedOrigins := strings.Split(env.AllowedOrigins, ",")

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,               // Replace with your Next.js frontend origin [13]
		AllowedMethods:   connectcors.AllowedMethods(), // GET, POST [10, 13]
		AllowedHeaders:   connectcors.AllowedHeaders(), // Content-Type, Connect-Protocol-Version, etc. [10, 13]
		ExposedHeaders:   connectcors.ExposedHeaders(), // Grpc-Status, Grpc-Message, etc. [10, 13]
		MaxAge:           7200,                         // 2 hours cache for preflight requests [13]
		AllowCredentials: true,                         // Important if you plan to use cookies/auth headers later
	})
	return c.Handler(h)
}
