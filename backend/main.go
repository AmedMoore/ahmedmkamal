package main

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/routes"
	"github.com/skyareas/skyjet"
)

func handleBootstrapException(err error) {
	if err != nil {
		skyjet.Log().Fatalln(err.Error())
	}
}

func migrateDatabase() {
	handleBootstrapException(
		skyjet.DB().AutoMigrate(
			&models.User{},
			&models.Post{},
			&models.Tag{},
		),
	)
}

func seedDatabase() {
	db := skyjet.DB()

	var count int64
	handleBootstrapException(
		db.Model(&models.Post{}).Count(&count).Error,
	)
	if count > 0 {
		return
	}

	handleBootstrapException(
		skyjet.DB().Create(getSeedPosts()).Error,
	)
}

func main() {
	app := skyjet.SharedApp()
	app.Use("/", routes.RootRouter())
	app.Use("/blog", routes.BlogRouter())
	migrateDatabase()
	seedDatabase()
	app.Run()
}
