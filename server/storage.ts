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
      },
      {
        book: "john",
        chapter: 3,
        verse: 16,
        commentary: "Often called the 'Golden Text' of the Bible, this verse encapsulates the entire gospel message. It reveals God's immense love for humanity, His provision of salvation through His Son Jesus Christ, and the simple requirement of faith for eternal life. The word 'world' (Greek: kosmos) emphasizes the universal scope of God's love and Christ's sacrifice.",
        keyThemes: ["God's Love", "Salvation", "Eternal Life", "Faith", "Universal Gospel"],
        crossReferences: [
          { reference: "Romans 5:8", text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
          { reference: "1 John 4:9", text: "In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him." },
          { reference: "John 1:12", text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name." }
        ]
      },
      {
        book: "john",
        chapter: 3,
        verse: 15,
        commentary: "This verse emphasizes that belief in Jesus Christ results in eternal life. The word 'believeth' indicates not just intellectual assent but complete trust and reliance on Christ. This eternal life begins the moment one believes and continues forever.",
        keyThemes: ["Faith", "Eternal Life", "Salvation", "Belief in Christ"],
        crossReferences: [
          { reference: "John 5:24", text: "Verily, verily, I say unto you, He that heareth my word, and believeth on him that sent me, hath everlasting life..." },
          { reference: "Romans 10:9", text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved." }
        ]
      },
      {
        book: "matthew",
        chapter: 1,
        verse: 1,
        commentary: "This opening verse introduces Jesus Christ's genealogy, emphasizing His royal lineage through David and His connection to Abraham, the father of the Jewish nation. Matthew presents Jesus as the promised Messiah who fulfills Old Testament prophecies about the coming King and Savior.",
        keyThemes: ["Messianic Lineage", "Fulfillment of Prophecy", "Royal Heritage", "Jewish Heritage"],
        crossReferences: [
          { reference: "Genesis 22:18", text: "And in thy seed shall all the nations of the earth be blessed..." },
          { reference: "2 Samuel 7:12", text: "And when thy days be fulfilled, and thou shalt sleep with thy fathers, I will set up thy seed after thee..." },
          { reference: "Luke 3:23", text: "And Jesus himself began to be about thirty years of age, being (as was supposed) the son of Joseph..." }
        ]
      },
      {
        book: "john",
        chapter: 1,
        verse: 1,
        commentary: "This profound opening parallels Genesis 1:1, establishing Jesus as the eternal Word (Logos) who existed before creation. The Word is both distinct from God ('with God') and identical to God ('was God'), introducing the concept of the Trinity. This verse affirms Christ's deity and eternal existence.",
        keyThemes: ["Deity of Christ", "Eternal Existence", "Trinity", "Divine Word", "Pre-existence"],
        crossReferences: [
          { reference: "Genesis 1:1", text: "In the beginning God created the heaven and the earth." },
          { reference: "Colossians 1:16", text: "For by him were all things created, that are in heaven, and that are in earth..." },
          { reference: "Hebrews 1:2", text: "Hath in these last days spoken unto us by his Son, whom he hath appointed heir of all things..." }
        ]
      },
      {
        book: "psalms",
        chapter: 23,
        verse: 1,
        commentary: "This beloved psalm presents God as a caring shepherd who provides for, protects, and guides His people. The imagery of shepherd and sheep was particularly meaningful in ancient Israel, where shepherding was common. David, who was himself a shepherd, speaks from personal experience of God's faithful care.",
        keyThemes: ["God as Shepherd", "Divine Providence", "Trust", "God's Care", "Contentment"],
        crossReferences: [
          { reference: "John 10:11", text: "I am the good shepherd: the good shepherd giveth his life for the sheep." },
          { reference: "Isaiah 40:11", text: "He shall feed his flock like a shepherd: he shall gather the lambs with his arm..." },
          { reference: "Ezekiel 34:12", text: "As a shepherd seeketh out his flock in the day that he is among his sheep that are scattered..." }
        ]
      },
      {
        book: "romans",
        chapter: 3,
        verse: 23,
        commentary: "This verse establishes the universal nature of sin and humanity's need for salvation. 'All have sinned' includes every person regardless of background, status, or effort. 'Fall short' means to miss the mark, like an arrow missing its target. The glory of God represents His perfect standard of righteousness.",
        keyThemes: ["Universal Sin", "Human Depravity", "Need for Salvation", "God's Standard", "Equality in Sin"],
        crossReferences: [
          { reference: "Romans 6:23", text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord." },
          { reference: "Ecclesiastes 7:20", text: "For there is not a just man upon earth, that doeth good, and sinneth not." },
          { reference: "1 John 1:8", text: "If we say that we have no sin, we deceive ourselves, and the truth is not in us." }
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
