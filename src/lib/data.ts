import type { Entry, EntryCollection } from "contentful";
import type {
  Article,
  CalendarEvent,
  Frontpage,
  Handbook,
  NewsArticle,
} from "../types";
import { contentfulClient, ContentTypes } from "./contentful";

export const getAllHandbooks = async (): Promise<Entry<Handbook>[]> => {
  return (
    await contentfulClient.getEntries<Handbook>({
      content_type: ContentTypes.handbook,
      include: 2,
      limit: 5,
    })
  ).items;
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

export const getLatestNewsArticles = async () => {
  const entries = await contentfulClient.getEntries<
    Pick<NewsArticle, "title" | "date" | "slug" | "image">
  >({
    content_type: ContentTypes.newsArticle,
    order: "-fields.date",
    select: "fields.title,fields.date,fields.slug,fields.image",
    include: 1,
    limit: 10,
  });

  return entries?.items ?? [];
};

export const getAllNewsArticleSlugs = async () => {
  const entries = await contentfulClient.getEntries<Pick<NewsArticle, "slug">>({
    content_type: ContentTypes.newsArticle,
    select: "fields.slug",
    include: 0,
    limit: 1000,
  });

  return entries?.items.map((item) => item.fields.slug) ?? [];
};

export const getNewsArticle = async (slug: string | undefined | null) => {
  if (!slug) {
    return null;
  }

  const entries = await contentfulClient.getEntries<NewsArticle>({
    content_type: ContentTypes.newsArticle,
    "fields.slug": slug,
    include: 1,
  });

  return entries?.items[0] ?? null;
};

export const getAllCalendarEvents = async () => {
  const entries = await contentfulClient.getEntries<CalendarEvent>({
    content_type: ContentTypes.calendarEvent,
    select: "fields",
    include: 0,
    limit: 1000,
    order: "fields.date",
  });

  return entries?.items ?? [];
};

export const getFrontpage = async () => {
  const entry = await contentfulClient.getEntry<Frontpage>(
    "5iXtENCpDgzFSzHL13H0LN"
  );

  const frontpage = entry?.fields ?? null;

  if (!frontpage) {
    throw new Error("Could not fetch frontpage");
  }

  return frontpage;
};
