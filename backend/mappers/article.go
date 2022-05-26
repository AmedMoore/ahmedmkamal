package mappers

import (
	"github.com/ahmedmkamal/ahmedmkamal/models"
	"github.com/ahmedmkamal/ahmedmkamal/types"
	"github.com/samber/lo"
)

func ArticleModelToJsonArticle(article *models.Article, _ int) *types.Article {
	if article == nil {
		return nil
	}
	return &types.Article{
		ID:             article.ID,
		Slug:           article.Slug,
		Title:          article.Title,
		Content:        article.Content,
		ContentPreview: article.ContentPreview,
		CoverUrl:       article.CoverUrl,
		PublishDate:    article.PublishDate,
		Publisher:      *UserModelToJsonUser(&article.Publisher, 0),
		Tags:           lo.Map(article.Tags, TagModelToJsonTag),
	}
}

func JsonArticleToArticleModel(article *types.Article, _ int) *models.Article {
	if article == nil {
		return nil
	}
	return &models.Article{
		ID:             article.ID,
		Slug:           article.Slug,
		Title:          article.Title,
		Content:        article.Content,
		ContentPreview: article.ContentPreview,
		CoverUrl:       article.CoverUrl,
		PublishDate:    article.PublishDate,
		PublisherID:    article.Publisher.ID,
		Publisher:      *JsonUserToUserModel(&article.Publisher, 0),
		Tags:           lo.Map(article.Tags, JsonTagToTagModel),
	}
}
