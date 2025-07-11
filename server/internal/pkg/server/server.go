package server

import (
	"fmt"
	"log"
	"net/http"

	config "github.com/vishalx07/next-mlm/internal/config"
	middleware "github.com/vishalx07/next-mlm/internal/middleware"
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
		Handler: middleware.WithCORS(h2c.NewHandler(s.Mux, &http2.Server{}), s.Env),
	}
	if err := server.ListenAndServe(); err != nil {
		return fmt.Errorf("🚫 Error starting the server: %v", err)
	}

	return nil
}
