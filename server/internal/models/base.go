package models

import (
	"time"

	cuid "github.com/vishalx07/next-mlm/internal/pkg/cuid"
	"gorm.io/gorm"
)

type ID struct {
	Id string `gorm:"primaryKey;size:24;not null"`
}

type Timestamps struct {
	CreatedAt time.Time `gorm:"not null"`
	UpdatedAt time.Time `gorm:"not null"`
}

func (b *ID) BeforeCreate(tx *gorm.DB) error {
	if b.Id == "" {
		id := cuid.Generate()
		b.Id = id
	}
	return nil
}
