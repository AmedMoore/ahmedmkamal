import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

export class Tag {
  private constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  public static fake(): Tag {
    return Tag.from({
      id: nanoid(),
      name: faker.hacker.noun(),
    })!;
  }

  public static from(obj?: Record<string, unknown>): Tag | null {
    if (!obj || typeof obj !== "object") return null;
    if (typeof obj["id"] !== "string") return null;
    if (typeof obj["name"] !== "string") return null;
    return new Tag(/* id */ obj["id"], /* name */ obj["name"]);
  }
}
