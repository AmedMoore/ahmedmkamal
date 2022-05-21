package main

import (
	"github.com/ahmedmkamal/ahmedmkamal/routes"
	"github.com/skyareas/skyjet"
)

func main() {
	app := skyjet.SharedApp()
	app.Use("/assets", skyjet.Static())
	app.Use("/", routes.RootRouter())
	app.Use("/blog", routes.BlogRouter())
	app.Run()
}
