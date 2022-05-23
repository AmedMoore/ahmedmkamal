package main

import (
	"time"

	"github.com/ahmedmkamal/ahmedmkamal/models"
	nanoid "github.com/matoous/go-nanoid/v2"
	"github.com/skyareas/skyjet"
)

// it returns a new nano-id or f*ck up the app, good luck!
func newNanoId() string {
	id, err := nanoid.New()
	if err != nil {
		skyjet.Log().Fatalln(err.Error())
	}
	return id
}

func getSeedPosts() []models.Post {
	user := models.User{
		ID:          newNanoId(),
		Username:    "ahmedmkamal",
		DisplayName: "Ahmed Kamal",
		AvatarUrl:   "https://avatars.githubusercontent.com/u/35304348?v=4",
	}

	return []models.Post{{
		ID:             newNanoId(),
		Slug:           "rule-unto-void-green-land-wherein-first-very-whose-midst-she_d-be-saying-you_re-hath-cattle-good_-void-us",
		Title:          "Rule unto Void green land wherein first very whose midst she'd be Saying you're hath cattle good, void us.",
		ContentPreview: "Rule unto Void green land wherein first very whose midst she'd be Saying you're hath cattle good, void us.\n\nImage creeping called. Itself Living gathered there days replenish saw doesn't creepeth made thing were.\n\nLesser seasons appear cattle. Over form us without set seasons days made to yielding whose, god over rule open. Bring he open doesn't yielding likeness shall seasons shall is blessed us.\n\nLife kind days you, two. Our seas fifth yielding moveth. Second very likeness waters abundantly appear firmament don't of abundantly midst together to don't two open. I. Fowl fifth likeness, darkness created, seasons lights first.",
		Content:        "Rule unto Void green land wherein first very whose midst she'd be Saying you're hath cattle good, void us. Image creeping called. Itself Living gathered there days replenish saw doesn't creepeth made thing were...",
		CoverUrl:       "https://picsum.photos/1200/700?id=qCix9aIWAj0iy-Z4i_EKA",
		PublishDate:    time.Now(),
		Author:         user,
		Tags: []models.Tag{
			{
				ID:   newNanoId(),
				Name: "Computer Science",
			},
			{
				ID:   newNanoId(),
				Name: "Algorithms",
			},
			{
				ID:   newNanoId(),
				Name: "Math",
			},
		},
	},
		{
			ID:             newNanoId(),
			Slug:           "blessed-after-gathered-beast-signs_-a-she_d-from-sea-fish_-all-said-a-yield",
			Title:          "Blessed after gathered beast signs. A she'd from sea fish, all said a yield…",
			ContentPreview: "Blessed after gathered beast signs. A she'd from sea fish, all said a yielding fruit air fruitful days herb whales, above.\n\nOne darkness i one dominion shall third firmament second midst grass Over. Gathering for so fish air fruitful deep so meat form, great And, earth from beginning place sea blessed, have, they're after bring saying replenish of gathered had you're it image face.\n\nAir unto without also face is from earth living they're evening great shall darkness. Moving sea without itself own in multiply under had, to created you're very, fruit be. Likeness. Creepeth deep greater let under to.",
			Content:        "Blessed after gathered beast signs. A she'd from sea fish, all said a yielding fruit air fruitful days herb whales, above. One darkness i one dominion shall third firmament second midst grass Over...",
			CoverUrl:       "https://picsum.photos/1200/700?id=rij2CxYCE_cpvg-ND_kYW",
			PublishDate:    time.Now(),
			Author:         user,
			Tags: []models.Tag{
				{
					ID:   newNanoId(),
					Name: "Computer Science",
				},
				{
					ID:   newNanoId(),
					Name: "Algorithms",
				},
				{
					ID:   newNanoId(),
					Name: "Math",
				},
			},
		},
		{
			ID:             newNanoId(),
			Slug:           "morning-it-evening-you_-may-land-for-night-land-cattle_-first",
			Title:          "Morning it evening you. May land for night land cattle, first.",
			ContentPreview: "Morning it evening you. May land for night land cattle, first. His tree sea form stars had second meat evening.\n\nEvening two stars above saying two. Green above. Lesser dominion herb in earth don't. Cattle said given void Midst called. Unto Good blessed fourth. Thing that upon were blessed image living it over dry And fill. Together. Great yielding make seasons, created may sea kind.\n\nEvening open unto gathered third beast. Fruitful seed life seed i shall them form saw dominion life them kind gathered stars third good. You days is stars from itself saying made made don't evening. Lesser.",
			Content:        "Morning it evening you. May land for night land cattle, first. His tree sea form stars had second meat evening. Evening two stars above saying two. Green above. Lesser dominion herb in earth don't...",
			CoverUrl:       "https://picsum.photos/1200/700?id=fFMJPm2akxb_kdHYAI3l2",
			PublishDate:    time.Now(),
			Author:         user,
			Tags: []models.Tag{
				{
					ID:   newNanoId(),
					Name: "Computer Science",
				},
				{
					ID:   newNanoId(),
					Name: "Algorithms",
				},
				{
					ID:   newNanoId(),
					Name: "Math",
				},
			},
		},

		{
			ID:             newNanoId(),
			Slug:           "midst_-face-bring-beginning-wherein",
			Title:          "Midst. Face bring beginning wherein.",
			ContentPreview: "Midst. Face bring beginning wherein. You. Gathering there day great over Called them the itself also first above thing, his their sixth i above whose called face is darkness.\n\nAll night face of multiply likeness, seed multiply two man set after fly male. Yielding kind let let in darkness fowl have all given she'd itself whales sea for were. Replenish Cattle set hath. Also greater. Fifth seasons moveth, every.\n\nFifth darkness created his his. Behold wherein isn't fowl won't the rule creature. Appear. Can't god, he dry made itself all cattle given given called green wherein creepeth evening sixth fly.",
			Content:        "Midst. Face bring beginning wherein. You. Gathering there day great over Called them the itself also first above thing, his their sixth i above whose called face is darkness...",
			CoverUrl:       "https://picsum.photos/1200/700?id=jSoz8fpP3Pa-CT4WluQQS",
			PublishDate:    time.Now(),
			Author:         user,
			Tags: []models.Tag{
				{
					ID:   newNanoId(),
					Name: "Computer Science",
				},
				{
					ID:   newNanoId(),
					Name: "Algorithms",
				},
				{
					ID:   newNanoId(),
					Name: "Math",
				},
			},
		},
	}
}
