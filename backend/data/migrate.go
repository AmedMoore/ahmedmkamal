package data

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/skyareas/skyjet"
)

func AutoMigrate() {
	if err := skyjet.DB().AutoMigrate(
		&models.User{},
		&models.Article{},
		&models.Tag{},
	); err != nil {
		skyjet.Log().Fatalln(err.Error())
	}
}
