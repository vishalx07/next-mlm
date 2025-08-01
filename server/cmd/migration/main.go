package main

import (
	"log"

	config "github.com/vishalx07/next-mlm/internal/config"
	DB "github.com/vishalx07/next-mlm/internal/db"
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

	return nil
}
