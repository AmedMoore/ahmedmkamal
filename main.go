package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.File("index.html")
	})
	r.GET("/.well-known/openpgpkey/info=ahmedmkamal.com/B682F878CF8BD3B7D8F58EE5CE4D80E8E6A5E533.asc", func(c *gin.Context) {
		c.File(".well-known/openpgpkey/info=ahmedmkamal.com/B682F878CF8BD3B7D8F58EE5CE4D80E8E6A5E533.asc")
	})
	r.Run()
}
