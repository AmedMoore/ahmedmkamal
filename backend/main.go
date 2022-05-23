package main

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/routes"
	"github.com/skyareas/skyjet"
)

func migrateDatabase() {
	if err := skyjet.DB().AutoMigrate(
		&models.User{},
		&models.Post{},
		&models.Tag{},
	).Error; err != nil {
		skyjet.Log().Fatalln(err)
	}
}

func seedDatabase() {}

func main() {
	app := skyjet.SharedApp()
	app.Use("/", routes.RootRouter())
	app.Use("/blog", routes.BlogRouter())
	migrateDatabase()
	seedDatabase()
	app.Run()
}
