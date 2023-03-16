package model

import "gorm.io/gorm"

type Account struct {
	gorm.Model
	Avatar   string
	Username string
	UserID   int
}
