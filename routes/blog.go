package routes

import (
	"fmt"
	"time"

	"github.com/ahmedmkamal/ahmedmkamal/types"
	"github.com/skyareas/skyjet"
)

func BlogRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", blogIndex)
	return r
}

func blogIndex(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	return res.Render("blog.html", types.Page{
		Meta: types.PageMeta{
			Title:       "Blog / Ahmed Kamal",
			Description: "Ahmed Kamal (@ahmedmkamal)",
			Keywords:    "Ahmed Kamal",
			Version:     fmt.Sprintf("%d", time.Now().UnixMilli()),
		},
		Date: time.Now(),
		Data: skyjet.D{},
	})
}
