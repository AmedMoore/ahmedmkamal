package models

import "time"

type Article struct {
	ID             string `gorm:"primaryKey"`
	Slug           string `gorm:"uniqueIndex"`
	Title          string
	Content        string
	ContentPreview string
	CoverUrl       string
	PublishDate    time.Time
	Publisher      User
	PublisherID    string
	Tags           []*Tag `gorm:"many2many:article_tags;"`
}
