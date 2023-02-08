import type { Entry } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export type RelatedEntries<T> = (Entry<T> | null)[];

export type Article = {
  title: string;
  slug: string;
  body: Document;
};

export type NewsArticle = {
  title: string;
  slug: string;
  date: string;
  author: string;
  body: Document;
  tags: string[];
};

export type Handbook = {
  name: string;
  slug: string;
  content: RelatedEntries<Article>;
};
