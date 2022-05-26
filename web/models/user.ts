import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
import type { IUser } from "~/types/user";

export class User implements IUser {
  private constructor(
    public readonly id: string,
    public readonly displayName: string,
    public readonly username: string,
    public readonly avatarUrl: string,
  ) {}

  public static fake(): User {
    return User.from({
      id: nanoid(),
      displayName: faker.name.findName(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.avatar(),
    })!;
  }

  public static from(obj?: Record<string, unknown>): User | null {
    if (!obj || typeof obj !== "object") return null;
    if (typeof obj["id"] !== "string") return null;
    if (typeof obj["displayName"] !== "string") return null;
    if (typeof obj["username"] !== "string") return null;
    if (typeof obj["avatarUrl"] !== "string") return null;
    return new User(
      /* id */ obj["id"],
      /* displayName */ obj["displayName"],
      /* username */ obj["username"],
      /* avatarUrl */ obj["avatarUrl"],
    );
  }
}
