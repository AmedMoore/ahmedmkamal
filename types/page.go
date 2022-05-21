package types

import "time"

type Page struct {
	Meta PageMeta
	Date time.Time
	Data any
}
