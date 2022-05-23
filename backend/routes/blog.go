package routes

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/types"
	"github.com/skyareas/skyjet"
)

func BlogRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", getPosts)
	return r
}

func getPosts(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	postModels := make([]models.Post, 0)
	err := skyjet.DB().Preload("Author").Preload("Tags").Find(&postModels).Error
	if err != nil {
		return res.Json(skyjet.D{"error": err.Error(), "data": nil})
	}
	posts := make([]types.Post, len(postModels))
	for idx, post := range postModels {
		posts[idx] = types.Post{
			ID:             post.ID,
			Slug:           post.Slug,
			Title:          post.Title,
			ContentPreview: post.ContentPreview,
			Content:        post.Content,
			CoverUrl:       post.CoverUrl,
			Author: types.PostAuthor{
				ID:          post.Author.ID,
				DisplayName: post.Author.DisplayName,
				Username:    post.Author.Username,
				AvatarUrl:   post.Author.AvatarUrl,
			},
			Tags: make([]types.Tag, len(post.Tags)),
		}
		for tagIdx, tag := range post.Tags {
			posts[idx].Tags[tagIdx] = types.Tag{
				ID:   tag.ID,
				Name: tag.Name,
			}
		}
	}
	return res.Json(skyjet.D{"data": posts, "error": nil})
}
