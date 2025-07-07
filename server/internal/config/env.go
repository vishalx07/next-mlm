package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
)

type Env struct {
	Port           string `env:"PORT,required,notEmpty" envDefault:"8080"`
	ApiUrl         string `env:"API_URL,required,notEmpty"`
	AllowedOrigins string `env:"ALLOWED_ORIGINS,required"`
	DatabaseUrl    string `env:"DATABASE_URL,required,notEmpty"`
	JWTSecret      string `env:"JWT_SECRET,required,notEmpty"`
}

func LoadEnv() (*Env, error) {
	// 1. Load .env from project root
	if err := godotenv.Load(); err != nil {
		return nil, fmt.Errorf("🚫 Error while loading env file: %w", err)
	}

	// 2. Parse into struct
	var envVars Env
	if err := env.Parse(&envVars); err != nil {
		return nil, fmt.Errorf("🚫 Error while parsing environment variables: %w", err)
	}

	return &envVars, nil
}
