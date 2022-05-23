package routes

import (
	"github.com/skyareas/skyjet"
)

func BlogRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", getPosts)
	return r
}

func getPosts(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	return res.Json(PreviewPosts)
}
