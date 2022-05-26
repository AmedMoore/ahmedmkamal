package main

import (
	"github.com/ahmedmkamal/ahmedmkamal/data"
	"github.com/ahmedmkamal/ahmedmkamal/routes"
	"github.com/skyareas/skyjet"
)

func main() {
	app := skyjet.App()
	app.Use("/", routes.RootRouter())
	app.Use("/blog", routes.BlogRouter())
	data.AutoMigrate()
	data.SeedAll()
	app.Run()
}
