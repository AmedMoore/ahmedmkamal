package models

type Tag struct {
	ID       string    `gorm:"primaryKey"`
	Name     string    `gorm:"unique"`
	Articles []Article `gorm:"many2many:article_tags;"`
}
