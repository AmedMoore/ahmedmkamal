package models

type User struct {
	ID          string `gorm:"primaryKey"`
	Username    string `gorm:"uniqueIndex"`
	DisplayName string
	AvatarUrl   string
}
