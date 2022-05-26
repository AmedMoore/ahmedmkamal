import type { ITag } from "~/types/tag";
import type { IUser } from "~/types/user";

export interface IArticle {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly contentPreview: string;
  readonly content: string;
  readonly coverUrl: string;
  readonly publishDate: string;
  readonly publisher: IUser;
  readonly tags: ITag[];
}
