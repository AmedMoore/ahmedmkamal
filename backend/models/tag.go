package models

type Tag struct {
	ID    string `gorm:"primaryKey"`
	Name  string `gorm:"unique"`
	Posts []Post `gorm:"many2many:post_tags;"`
}
