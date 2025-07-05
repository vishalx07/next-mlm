package main

import (
	"log"

	config "github.com/vishalx07/next-mlm/internal/configs"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	// load env
	_, err := config.LoadEnv()
	if err != nil {
		return err
	}

	return nil
}
