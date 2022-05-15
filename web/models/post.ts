import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { format, isValid } from "date-fns";
import { Optional } from "~/models/optional";

export class Post {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly preview: string,
    public readonly content: string,
    public readonly publishDate: string,
  ) {}

  public static fake(slug: string = faker.lorem.slug()): Post {
    return Post.from({
      id: nanoid(),
      title: faker.hacker.phrase(),
      preview: faker.lorem.paragraphs(1),
      content: faker.lorem.paragraphs(5),
      publishDate: faker.date.past(),
      slug,
    }).value;
  }

  public static from(obj?: Record<string, unknown>): Optional<Post> {
    const post = Optional.empty<Post>();

    if (!obj || typeof obj !== "object") return post;
    if (typeof obj["id"] !== "string") return post;
    if (typeof obj["title"] !== "string") return post;
    if (typeof obj["slug"] !== "string") return post;
    if (typeof obj["preview"] !== "string") return post;
    if (typeof obj["content"] !== "string") return post;

    const publishDate = Optional.empty<string>();
    if (
      typeof obj["publishDate"] !== "string" &&
      typeof obj["publishDate"] !== "number" &&
      !(obj["publishDate"] instanceof Date)
    ) {
      return post;
    }

    publishDate.value = Post.formatDate(new Date(obj["publishDate"])).value;
    if (!publishDate.hasValue) return post;

    post.value = new Post(
      /* id */ obj["id"],
      /* title */ obj["title"],
      /* slug */ obj["slug"],
      /* preview */ obj["preview"],
      /* content */ obj["content"],
      /* publishDate */ publishDate.value,
    );

    return post;
  }

  private static formatDate(date: Date): Optional<string> {
    if (!isValid(date)) return Optional.empty();
    return Optional.of(format(date, "MMM dd yyyy"));
  }
}
