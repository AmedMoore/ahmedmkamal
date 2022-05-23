import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { format, isValid } from "date-fns";
import { Tag } from "./tag";

export class Post {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly contentPreview: string,
    public readonly content: string,
    public readonly publishDate: string,
    public readonly author: Record<string, string>,
    public readonly tags: Tag[],
  ) {}

  public static fake(slug: string = faker.lorem.slug()): Post {
    return Post.from({
      id: nanoid(),
      title: faker.hacker.phrase(),
      slug,
      contentPreview: faker.lorem.paragraphs(1),
      content: faker.lorem.paragraphs(5),
      publishDate: faker.date.past(),
      author: faker.internet.userName(),
      tags: [Tag.fake(), Tag.fake(), Tag.fake()],
    })!;
  }

  public static from(obj?: Record<string, unknown>): Post | null {
    if (!obj || typeof obj !== "object") return null;
    if (typeof obj["id"] !== "string") return null;
    if (typeof obj["title"] !== "string") return null;
    if (typeof obj["slug"] !== "string") return null;
    if (typeof obj["contentPreview"] !== "string") return null;
    if (typeof obj["content"] !== "string") return null;
    if (!obj["author"] || typeof obj["author"] !== "object") return null;
    if (!Array.isArray(obj["tags"])) return null;
    if (
      typeof obj["publishDate"] !== "string" &&
      typeof obj["publishDate"] !== "number" &&
      !(obj["publishDate"] instanceof Date)
    ) {
      return null;
    }

    const publishDate = Post.formatDate(new Date(obj["publishDate"]));
    if (!publishDate) return null;

    return new Post(
      /* id */ obj["id"],
      /* title */ obj["title"],
      /* slug */ obj["slug"],
      /* contentPreview */ obj["contentPreview"],
      /* content */ obj["content"],
      /* publishDate */ publishDate,
      /* author */ obj["author"] as Record<string, string>,
      /* tags */ obj["tags"].map(Tag.from).filter((tag) => !!tag) as Tag[],
    );
  }

  private static formatDate(date: Date): string | null {
    if (!isValid(date)) return null;
    return format(date, "MMM dd yyyy");
  }
}
