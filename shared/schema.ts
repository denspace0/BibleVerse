import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookmarks = pgTable("bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  text: text("text").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const verseExplanations = pgTable("verse_explanations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  commentary: text("commentary").notNull(),
  keyThemes: jsonb("key_themes").$type<string[]>(),
  crossReferences: jsonb("cross_references").$type<Array<{reference: string, text: string}>>(),
});

export const userSettings = pgTable("user_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  fontSize: text("font_size").default("text-lg"),
  highlightedVerses: jsonb("highlighted_verses").$type<Record<string, number[]>>(),
  lastReadBook: text("last_read_book").default("genesis"),
  lastReadChapter: integer("last_read_chapter").default(1),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true,
});

export const insertVerseExplanationSchema = createInsertSchema(verseExplanations).omit({
  id: true,
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;

export type InsertVerseExplanation = z.infer<typeof insertVerseExplanationSchema>;
export type VerseExplanation = typeof verseExplanations.$inferSelect;

export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UserSettings = typeof userSettings.$inferSelect;

// Bible data types (from API)
export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  testament: 'old' | 'new';
}

export interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  reference: string;
}
