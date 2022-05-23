package types

type PostAuthor struct {
	ID          string `json:"id"`
	Username    string `json:"username"`
	DisplayName string `json:"displayName"`
	AvatarUrl   string `json:"avatarUrl"`
}