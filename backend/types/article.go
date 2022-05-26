package types

import "time"

type Article struct {
	ID             string    `json:"id"`
	Slug           string    `json:"slug"`
	Title          string    `json:"title"`
	Content        string    `json:"content"`
	ContentPreview string    `json:"contentPreview"`
	CoverUrl       string    `json:"coverUrl"`
	PublishDate    time.Time `json:"publishDate"`
	Publisher      User      `json:"publisher"`
	Tags           []*Tag    `json:"tags"`
}
