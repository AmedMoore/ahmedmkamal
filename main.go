package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"
)

type PageMeta struct {
	Title       string
	Description string
	Keywords    string
	Version     string
}

type Page struct {
	Meta PageMeta
	Date time.Time
	Data any
}

type SocialMediaLink struct {
	Name string
	Url  string
}

type HttpHandlerFunc = func(http.ResponseWriter, *http.Request)

func sendFile(filename string) HttpHandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	}
}

func sendTemplate(filename string, page Page) HttpHandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles(filename))
		page.Meta.Version = fmt.Sprintf("%d", time.Now().UnixMilli())
		if err := tmpl.Execute(w, page); err != nil {
			fmt.Println(err.Error())
		}
	}
}

func main() {
	// serve static assets
	http.HandleFunc("/assets/styles/main.css", sendFile("assets/styles/main.css"))
	http.HandleFunc("/assets/scripts/main.js", sendFile("assets/scripts/main.js"))
	http.HandleFunc("/assets/images/ahmedmkamal.jpg", sendFile("assets/images/ahmedmkamal.jpg"))

	// serve index template
	http.HandleFunc("/", sendTemplate("views/index.html", Page{
		Meta: PageMeta{
			Title:       "Ahmed Kamal",
			Description: "Ahmed Kamal (@ahmedmkamal)",
			Keywords:    "Ahmed Kamal",
			Version:     fmt.Sprintf("%d", time.Now().UnixMilli()),
		},
		Date: time.Now(),
		Data: map[string]any{
			"Posts": PreviewPosts,
			"SocialMedia": []SocialMediaLink{
				{"Github", "//github.com/ahmedmkamal"},
				{"Twitter", "//twitter.com/akaahmedkamal"},
				{"Upwork", "//upwork.com/freelancers/~01f21e9baaabb64d1d"},
			},
		},
	}))

	// start the http server
	fmt.Println(http.ListenAndServe(":5001", nil))
}
