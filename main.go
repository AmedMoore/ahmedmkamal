package main

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

var pgpContentPath = "./.well-known/openpgpkey"

func main() {
	r := gin.New()

	if gin.Mode() != gin.ReleaseMode {
		r.Use(gin.Logger())
	}

	r.Use(gin.Recovery())

	r.GET("/", func(ctx *gin.Context) {
		ctx.File("index.html")
	})

	pgpEntities := getOpenPgpEntities()

	openpgpkey := r.Group("/.well-known/openpgpkey")
	{
		openpgpkey.Use(cors.Default())

		domain := openpgpkey.Group("/:domain")
		{
			domain.GET("/policy", func(ctx *gin.Context) {

				domain := ctx.Params.ByName("domain")
				entities := pgpEntities[domain]

				if len(entities) == 0 {
					ctx.Abort()
					ctx.String(http.StatusNotFound, http.StatusText(http.StatusNotFound))
				} else {
					ctx.File(knownEntityPolicyFilePath(domain))
				}
			})

			domain.GET("/hu/:hash", func(ctx *gin.Context) {
				domain := ctx.Params.ByName("domain")
				hash := ctx.Params.ByName("hash")

				entities := pgpEntities[domain]
				if len(entities) == 0 || !lo.Contains(entities, hash) {
					ctx.Abort()
					ctx.String(http.StatusNotFound, http.StatusText(http.StatusNotFound))
				} else {
					ctx.File(knownEntityKeyFilePath(domain, hash))
				}
			})
		}
	}

	r.Run()
}

// Map of domain and name hashes
type PgpEntities = map[string][]string

func knownEntityPolicyFilePath(domain string) string {
	return filepath.Join(pgpContentPath, domain, "policy")
}

func knownEntityKeyFilePath(domain, hash string) string {
	return filepath.Join(pgpContentPath, domain, "hu", hash)
}

func getOpenPgpEntities() PgpEntities {
	files, err := os.ReadDir(pgpContentPath)
	if err != nil {
		panic(err)
	}

	entities := make(PgpEntities)

	for _, file := range files {
		domain := file.Name()
		entities[domain] = appendEntities(domain)
	}

	return entities
}

func appendEntities(domain string) []string {
	files, err := os.ReadDir(filepath.Join(pgpContentPath, domain, "hu"))
	if err != nil {
		panic(err)
	}

	hashes := make([]string, len(files))

	for idx, file := range files {
		hashes[idx] = file.Name()
	}

	return hashes
}
