package routes

import (
	"fmt"
	"time"

	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/types"
	"github.com/skyareas/skyjet"
)

func RootRouter() *skyjet.Router {
	r := skyjet.NewRouter()
	r.Get("/", index)
	r.Get("/contact", contact)
	r.Get("/projects", projects)
	return r
}

func index(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	return res.Render("index.html", types.Page{
		Meta: types.PageMeta{
			Title:       "Ahmed Kamal",
			Description: "Ahmed Kamal (@ahmedmkamal)",
			Keywords:    "Ahmed Kamal",
			Version:     fmt.Sprintf("%d", time.Now().UnixMilli()),
		},
		Date: time.Now(),
		Data: skyjet.D{
			"Posts": PreviewPosts,
			"SocialMedia": []models.SocialMediaLink{
				{"Github", "//github.com/ahmedmkamal"},
				{"Twitter", "//twitter.com/akaahmedkamal"},
				{"Upwork", "//upwork.com/freelancers/~01f21e9baaabb64d1d"},
			},
		},
	})
}

func contact(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	return res.Render("contact.html", types.Page{
		Meta: types.PageMeta{
			Title:       "Contact / Ahmed Kamal",
			Description: "Ahmed Kamal (@ahmedmkamal)",
			Keywords:    "Ahmed Kamal",
			Version:     fmt.Sprintf("%d", time.Now().UnixMilli()),
		},
		Date: time.Now(),
		Data: skyjet.D{},
	})
}

func projects(_ *skyjet.HttpRequest, res *skyjet.HttpResponse) error {
	return res.Render("projects.html", types.Page{
		Meta: types.PageMeta{
			Title:       "Projects / Ahmed Kamal",
			Description: "Ahmed Kamal (@ahmedmkamal)",
			Keywords:    "Ahmed Kamal",
			Version:     fmt.Sprintf("%d", time.Now().UnixMilli()),
		},
		Date: time.Now(),
		Data: skyjet.D{},
	})
}
