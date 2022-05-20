package main

import (
	"html/template"
	"net/http"
	"time"
)

type Page struct {
	Title    string
	JsScript string
	Date     time.Time
	Data     any
}

type Post struct {
	ID    string
	Title string
}

type HttpHandlerFunc = func(http.ResponseWriter, *http.Request)

func sendFile(fname string) HttpHandlerFunc {
	t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
	if err != nil {
		panic(err.Error())
	}
	return func(w http.ResponseWriter, r *http.Request) {
		err = t.ExecuteTemplate(w, "T", "<script>alert('you have been pwned')</script>")
		http.ServeFile(w, r, fname)
	}
}

func main() {
	http.HandleFunc("/", sendFile("views/index.html"))
	http.ListenAndServe(":5000", nil)
}
