package routes

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/skyareas/skyjet"
)

func BlogRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", getPosts)
	return r
}

func getPosts(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	posts := make([]models.Post, 0)
	err := skyjet.DB().Find(&posts).Error
	if err != nil {
		return res.Json(skyjet.D{"error": err.Error(), "data": nil})
	}
	return res.Json(skyjet.D{"data": posts, "error": nil})
}
