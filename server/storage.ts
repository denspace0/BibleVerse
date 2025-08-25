import { 
  type User, 
  type InsertUser, 
  type Bookmark, 
  type InsertBookmark,
  type VerseExplanation,
  type InsertVerseExplanation,
  type UserSettings,
  type InsertUserSettings
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bookmark methods
  getBookmarks(userId: string): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: string): Promise<void>;
  
  // Verse explanation methods
  getVerseExplanation(book: string, chapter: number, verse: number): Promise<VerseExplanation | undefined>;
  createVerseExplanation(explanation: InsertVerseExplanation): Promise<VerseExplanation>;
  
  // User settings methods
  getUserSettings(userId: string): Promise<UserSettings | undefined>;
  updateUserSettings(userId: string, settings: Partial<InsertUserSettings>): Promise<UserSettings>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookmarks: Map<string, Bookmark>;
  private verseExplanations: Map<string, VerseExplanation>;
  private userSettings: Map<string, UserSettings>;

  constructor() {
    this.users = new Map();
    this.bookmarks = new Map();
    this.verseExplanations = new Map();
    this.userSettings = new Map();
    
    // Initialize with default verse explanations
    this.initializeDefaultExplanations();
  }

  private initializeDefaultExplanations() {
    const explanations: InsertVerseExplanation[] = [
      {
        book: "genesis",
        chapter: 1,
        verse: 1,
        commentary: "This verse establishes God as the Creator of all things. The Hebrew word 'bara' means to create something from nothing, demonstrating God's supreme power and authority over all creation.",
        keyThemes: ["Creation", "Divine Authority", "Beginning of Time"],
        crossReferences: [
          { reference: "John 1:1", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
          { reference: "Hebrews 11:3", text: "Through faith we understand that the worlds were framed by the word of God..." }
        ]
      },
      {
        book: "genesis",
        chapter: 1,
        verse: 3,
        commentary: "This verse marks the first recorded words of God in Scripture, demonstrating His supreme authority over creation. The phrase 'Let there be light' shows God's power to create through His spoken word alone. This light was distinct from the sun, moon, and stars, which were created on the fourth day, suggesting it was the primordial light of God's presence.",
        keyThemes: ["Divine authority and creative power", "The Word of God as creative force", "Light as symbol of God's presence and goodness", "Order emerging from chaos"],
        crossReferences: [
          { reference: "John 1:1-5", text: "In the beginning was the Word..." },
          { reference: "2 Corinthians 4:6", text: "God who commanded light to shine out of darkness" },
          { reference: "Psalm 33:6", text: "By the word of the Lord were the heavens made" }
        ]
      }
    ];

    explanations.forEach(explanation => {
      const key = `${explanation.book}-${explanation.chapter}-${explanation.verse}`;
      const id = randomUUID();
      this.verseExplanations.set(id, { ...explanation, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBookmarks(userId: string): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(
      bookmark => bookmark.userId === userId
    );
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const id = randomUUID();
    const bookmark: Bookmark = { 
      ...insertBookmark, 
      id,
      userId: insertBookmark.userId || null,
      createdAt: new Date().toISOString()
    };
    this.bookmarks.set(id, bookmark);
    return bookmark;
  }

  async deleteBookmark(id: string): Promise<void> {
    this.bookmarks.delete(id);
  }

  async getVerseExplanation(book: string, chapter: number, verse: number): Promise<VerseExplanation | undefined> {
    return Array.from(this.verseExplanations.values()).find(
      explanation => explanation.book === book && 
                   explanation.chapter === chapter && 
                   explanation.verse === verse
    );
  }

  async createVerseExplanation(insertExplanation: InsertVerseExplanation): Promise<VerseExplanation> {
    const id = randomUUID();
    const explanation: VerseExplanation = { ...insertExplanation, id };
    this.verseExplanations.set(id, explanation);
    return explanation;
  }

  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    return Array.from(this.userSettings.values()).find(
      settings => settings.userId === userId
    );
  }

  async updateUserSettings(userId: string, settingsUpdate: Partial<InsertUserSettings>): Promise<UserSettings> {
    const existing = await this.getUserSettings(userId);
    if (existing) {
      const updated: UserSettings = { ...existing, ...settingsUpdate };
      this.userSettings.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const settings: UserSettings = { 
        id,
        userId,
        fontSize: "text-lg",
        highlightedVerses: {},
        lastReadBook: "genesis",
        lastReadChapter: 1,
        ...settingsUpdate
      };
      this.userSettings.set(id, settings);
      return settings;
    }
  }
}

export const storage = new MemStorage();
