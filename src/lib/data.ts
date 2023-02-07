import type { Entry, EntryCollection } from "contentful";
import type { Article, Handbook } from "../types";
import { contentfulClient, ContentTypes } from "./contentful";

// Caches the request to fetch all handbooks
// This only works because we know the site is statically built
let allHandbooksPromise: Promise<EntryCollection<Handbook>> | null = null;

export const getAllHandbooks = async (): Promise<Entry<Handbook>[]> => {
  if (!allHandbooksPromise) {
    allHandbooksPromise = contentfulClient.getEntries<Handbook>({
      content_type: ContentTypes.handbook,
      include: 1,
      limit: 5,
    });
  }
  return (await allHandbooksPromise).items;
};

export const getHandbookBySlug = async (slug: string | undefined | null) => {
  if (!slug) {
    return null;
  }

  const handbooks = await getAllHandbooks();
  return handbooks.find((handbook) => handbook.fields.slug === slug) ?? null;
};

export const getArticleBySlug = async (slug: string | undefined | null) => {
  if (!slug) {
    return null;
  }

  const entries = await contentfulClient.getEntries<Article>({
    content_type: ContentTypes.article,
    "fields.slug": slug,
    include: 0,
  });

  return entries?.items[0] ?? null;
};
