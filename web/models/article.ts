import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { format, isValid } from "date-fns";
import { Tag } from "~/models/tag";
import { User } from "~/models/user";
import type { IArticle } from "~/types/article";

export class Article implements IArticle {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly contentPreview: string,
    public readonly content: string,
    public readonly coverUrl: string,
    public readonly publishDate: string,
    public readonly publisher: User,
    public readonly tags: Tag[],
  ) {}

  public static fake(): Article {
    return Article.from({
      id: nanoid(),
      title: faker.hacker.phrase(),
      slug: faker.lorem.slug(),
      contentPreview: faker.lorem.paragraphs(1),
      content: faker.lorem.paragraphs(5),
      coverUrl: faker.image.business(),
      publishDate: faker.date.past(),
      publisher: faker.internet.userName(),
      tags: [Tag.fake(), Tag.fake(), Tag.fake()],
    })!;
  }

  public static from(obj?: Record<string, unknown>): Article | null {
    if (!obj || typeof obj !== "object") return null;
    if (typeof obj["id"] !== "string") return null;
    if (typeof obj["title"] !== "string") return null;
    if (typeof obj["slug"] !== "string") return null;
    if (typeof obj["contentPreview"] !== "string") return null;
    if (typeof obj["content"] !== "string") return null;
    if (obj["coverUrl"] && typeof obj["coverUrl"] !== "string") return null;
    if (!obj["publisher"] || typeof obj["publisher"] !== "object") return null;
    if (!Array.isArray(obj["tags"])) return null;
    if (
      typeof obj["publishDate"] !== "string" &&
      typeof obj["publishDate"] !== "number" &&
      !(obj["publishDate"] instanceof Date)
    ) {
      return null;
    }

    const publishDate = Article.formatDate(new Date(obj["publishDate"]));
    if (!publishDate) return null;

    const publisher = User.from(obj["publisher"] as Record<string, unknown>);
    if (!publisher) return null;

    const tags = obj["tags"].map(Tag.from).filter((tag) => !!tag) as Tag[];
    if (!tags) return null;

    return new Article(
      /* id */ obj["id"],
      /* title */ obj["title"],
      /* slug */ obj["slug"],
      /* contentPreview */ obj["contentPreview"],
      /* content */ obj["content"],
      /* coverUrl */ (obj["coverUrl"] as string) || "",
      /* publishDate */ publishDate,
      /* publisher */ publisher,
      /* tags */ tags,
    );
  }

  private static formatDate(date: Date): string | null {
    if (!isValid(date)) return null;
    return format(date, "MMM dd, yyyy");
  }
}
