package models

import "time"

type Post struct {
	ID             string `gorm:"primaryKey"`
	Slug           string `gorm:"uniqueIndex"`
	Title          string
	Content        string
	ContentPreview string
	CoverUrl       string
	PublishDate    time.Time
	Author         User
	AuthorID       string
	Tags           []Tag `gorm:"many2many:post_tags;"`
}
