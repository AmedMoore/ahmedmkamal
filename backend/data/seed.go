package data

import (
	"encoding/json"
	"io/fs"
	"io/ioutil"
	"path/filepath"

	"github.com/ahmedmkamal/ahmedmkamal/mappers"
	"github.com/samber/lo"
	"github.com/skyareas/skyjet"
	"golang.org/x/exp/slices"
	"gorm.io/gorm"
)

func getDirName(f fs.FileInfo, _ int) (string, bool) {
	return f.Name(), f.IsDir()
}

func seedDataDir() string {
	return skyjet.App().Config().CustomConfig["seedDataDir"].(string)
}

func latestDataSnapshot() string {
	files, err := ioutil.ReadDir(seedDataDir())
	if err != nil {
		skyjet.Log().Fatalln(err.Error())
	}

	dirNames := lo.FilterMap(files, getDirName)
	slices.Sort(dirNames)

	latestSnapshot, err := lo.Last(dirNames)
	if err != nil {
		skyjet.Log().Fatalln(err.Error())
	}

	return latestSnapshot
}

func readSeedDataFile(filename string) []byte {
	path := filepath.Join(seedDataDir(), latestDataSnapshot(), filename)
	data, err := ioutil.ReadFile(path)
	if err != nil {
		skyjet.Log().Fatalln(err.Error())
	}
	return data
}

func getSeedDataMapped[T any, TM any](filename string, mapFunc func(item T, index int) TM) []TM {
	data := readSeedDataFile(filename)

	var items []T
	if err := json.Unmarshal(data, &items); err != nil {
		skyjet.Log().Fatalln(err.Error())
	}

	return lo.Map(items, mapFunc)
}

func seedData[T any](tx *gorm.DB, data []T) error {
	return lo.Reduce(data, func(err error, item T, _ int) error {
		if err == nil {
			return tx.FirstOrCreate(item, item).Error
		}
		return err
	}, nil)
}

func SeedUsers(tx *gorm.DB) error {
	return seedData(tx, getSeedDataMapped("users.json", mappers.JsonUserToUserModel))
}

func SeedTags(tx *gorm.DB) error {
	return seedData(tx, getSeedDataMapped("tags.json", mappers.JsonTagToTagModel))
}

func SeedArticles(tx *gorm.DB) error {
	return seedData(tx, getSeedDataMapped("articles.json", mappers.JsonArticleToArticleModel))
}

func SeedAll() {
	_ = skyjet.DB().Transaction(func(tx *gorm.DB) error {
		if err := SeedUsers(tx); err != nil {
			return err
		}
		if err := SeedTags(tx); err != nil {
			return err
		}
		return SeedArticles(tx)
	})
}
