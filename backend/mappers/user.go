package mappers

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/types"
)

func UserModelToJsonUser(user *models.User, _ int) *types.User {
	if user == nil {
		return nil
	}
	return &types.User{
		ID:          user.ID,
		Username:    user.Username,
		DisplayName: user.DisplayName,
		AvatarUrl:   user.AvatarUrl,
	}
}

func JsonUserToUserModel(user *types.User, _ int) *models.User {
	if user == nil {
		return nil
	}
	return &models.User{
		ID:          user.ID,
		Username:    user.Username,
		DisplayName: user.DisplayName,
		AvatarUrl:   user.AvatarUrl,
	}
}
