package versions

import (
	"gorm.io/gorm"
)

func Version20221110000008(tx *gorm.DB) error {
	type Account struct {
		gorm.Model
		Username string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Password string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		UserID   uint   `gorm:"TYPE:INT"`
	}

	type User struct {
		gorm.Model
		Avatar      string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Name        string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Email       string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Address     string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		PhoneNumber string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		About       string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Note        string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Username    string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Password    string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
	}

	type Customer struct {
		gorm.Model
		UserID      uint   `gorm:"TYPE:INT"`
		Role        string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Description string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
	}

	type Employee struct {
		gorm.Model
		UserID      uint   `gorm:"TYPE:INT"`
		Role        string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
		Description string `gorm:"TYPE:VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
	}

	return tx.AutoMigrate(&Employee{}, &Customer{}, &User{}, &Account{})
}
