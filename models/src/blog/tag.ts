import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import { Optional } from "../optional";

export class Tag {
  private constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  public static fake(): Tag {
    return Tag.from({
      id: nanoid(),
      name: faker.hacker.noun(),
    }).value;
  }

  public static from(obj?: Record<string, unknown>): Optional<Tag> {
    const tag = Optional.empty<Tag>();

    if (!obj || typeof obj !== "object") return tag;
    if (typeof obj["id"] !== "string") return tag;
    if (typeof obj["name"] !== "string") return tag;

    tag.value = new Tag(
      /* id */ obj["id"],
      /* name */ obj["name"],
    );

    return tag;
  }
}
