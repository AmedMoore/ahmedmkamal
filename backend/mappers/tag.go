package mappers

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/types"
)

func TagModelToJsonTag(tag *models.Tag, _ int) *types.Tag {
	if tag == nil {
		return nil
	}
	return &types.Tag{
		ID:   tag.ID,
		Name: tag.Name,
	}
}

func JsonTagToTagModel(tag *types.Tag, _ int) *models.Tag {
	if tag == nil {
		return nil
	}
	return &models.Tag{
		ID:   tag.ID,
		Name: tag.Name,
	}
}
