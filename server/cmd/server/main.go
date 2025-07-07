package main

import (
	"log"
	"net/http"

	handler "github.com/vishalx07/next-mlm/internal/api/v1/handler"
	config "github.com/vishalx07/next-mlm/internal/config"
	DB "github.com/vishalx07/next-mlm/internal/db"
	server "github.com/vishalx07/next-mlm/internal/pkg/server"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	// load env
	env, err := config.LoadEnv()
	if err != nil {
		return err
	}

	// connect to db
	db, err := DB.ConnectDB(env)
	if err != nil {
		return err
	}

	// migrate
	if err := DB.CreateEnumTypes(db); err != nil {
		return err
	}
	if err := DB.AutoMigrate(db); err != nil {
		return err
	}

	// Set up HTTP server
	mux := http.NewServeMux()

	server := server.NewServer(db, env, mux)

	handler.RegisterHandler(server)

	if err := server.Run(); err != nil {
		return err
	}

	return nil
}
