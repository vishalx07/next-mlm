package cuid

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/nrednav/cuid2"
)

func Generate() string {
	return cuid2.Generate()
}

func Validate(id string) error {
	isValidId := cuid2.IsCuid(id)

	if !isValidId {
		return fmt.Errorf("invalid id: %s", id)
	}

	validate := validator.New()
	if err := validate.Var(id, "required,len=24"); err != nil {
		return fmt.Errorf("invalid id: %s", id)
	}

	return nil
}
