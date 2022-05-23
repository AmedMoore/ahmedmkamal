package routes

import (
	"github.com/skyareas/skyjet"
)

func RootRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", healthCheck)
	return r
}

func healthCheck(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	return res.Json(skyjet.D{"status": "healthy"})
}
