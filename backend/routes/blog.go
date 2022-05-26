package routes

import (
	"net/http"

	"github.com/ahmedmkamal/ahmedmkamal/mappers"
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/samber/lo"
	"github.com/skyareas/skyjet"
)

func BlogRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", getPosts)
	r.Get("/:slug", getPost)
	return r
}

func getPosts(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	var posts []*models.Article
	err := skyjet.DB().Preload("Publisher").Preload("Tags").Find(&posts).Error
	if err != nil {
		return res.Json(skyjet.D{"error": err.Error(), "data": nil}, http.StatusInternalServerError)
	}

	return res.Json(skyjet.D{"data": lo.Map(posts, mappers.ArticleModelToJsonArticle), "error": nil})
}

func getPost(req *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	slug := req.Param("slug")

	var post models.Article
	err := skyjet.DB().Preload("Publisher").Preload("Tags").Where("slug = ?", slug).First(&post).Error
	if err != nil {
		return res.Json(skyjet.D{"error": err.Error(), "data": nil}, http.StatusInternalServerError)
	}

	return res.Json(skyjet.D{"data": mappers.ArticleModelToJsonArticle(&post, 0), "error": nil})
}
