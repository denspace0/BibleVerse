import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookmarkSchema, insertVerseExplanationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get Bible books list
  app.get("/api/bible/books", async (req, res) => {
    try {
      // Return predefined book list for Bible API
      const books = [
        // Old Testament
        { id: "genesis", name: "Genesis", chapters: 50, testament: "old" },
        { id: "exodus", name: "Exodus", chapters: 40, testament: "old" },
        { id: "leviticus", name: "Leviticus", chapters: 27, testament: "old" },
        { id: "numbers", name: "Numbers", chapters: 36, testament: "old" },
        { id: "deuteronomy", name: "Deuteronomy", chapters: 34, testament: "old" },
        { id: "joshua", name: "Joshua", chapters: 24, testament: "old" },
        { id: "judges", name: "Judges", chapters: 21, testament: "old" },
        { id: "ruth", name: "Ruth", chapters: 4, testament: "old" },
        { id: "1samuel", name: "1 Samuel", chapters: 31, testament: "old" },
        { id: "2samuel", name: "2 Samuel", chapters: 24, testament: "old" },
        { id: "1kings", name: "1 Kings", chapters: 22, testament: "old" },
        { id: "2kings", name: "2 Kings", chapters: 25, testament: "old" },
        { id: "1chronicles", name: "1 Chronicles", chapters: 29, testament: "old" },
        { id: "2chronicles", name: "2 Chronicles", chapters: 36, testament: "old" },
        { id: "ezra", name: "Ezra", chapters: 10, testament: "old" },
        { id: "nehemiah", name: "Nehemiah", chapters: 13, testament: "old" },
        { id: "esther", name: "Esther", chapters: 10, testament: "old" },
        { id: "job", name: "Job", chapters: 42, testament: "old" },
        { id: "psalms", name: "Psalms", chapters: 150, testament: "old" },
        { id: "proverbs", name: "Proverbs", chapters: 31, testament: "old" },
        { id: "ecclesiastes", name: "Ecclesiastes", chapters: 12, testament: "old" },
        { id: "songofsolomon", name: "Song of Solomon", chapters: 8, testament: "old" },
        { id: "isaiah", name: "Isaiah", chapters: 66, testament: "old" },
        { id: "jeremiah", name: "Jeremiah", chapters: 52, testament: "old" },
        { id: "lamentations", name: "Lamentations", chapters: 5, testament: "old" },
        { id: "ezekiel", name: "Ezekiel", chapters: 48, testament: "old" },
        { id: "daniel", name: "Daniel", chapters: 12, testament: "old" },
        { id: "hosea", name: "Hosea", chapters: 14, testament: "old" },
        { id: "joel", name: "Joel", chapters: 3, testament: "old" },
        { id: "amos", name: "Amos", chapters: 9, testament: "old" },
        { id: "obadiah", name: "Obadiah", chapters: 1, testament: "old" },
        { id: "jonah", name: "Jonah", chapters: 4, testament: "old" },
        { id: "micah", name: "Micah", chapters: 7, testament: "old" },
        { id: "nahum", name: "Nahum", chapters: 3, testament: "old" },
        { id: "habakkuk", name: "Habakkuk", chapters: 3, testament: "old" },
        { id: "zephaniah", name: "Zephaniah", chapters: 3, testament: "old" },
        { id: "haggai", name: "Haggai", chapters: 2, testament: "old" },
        { id: "zechariah", name: "Zechariah", chapters: 14, testament: "old" },
        { id: "malachi", name: "Malachi", chapters: 4, testament: "old" },
        // New Testament
        { id: "matthew", name: "Matthew", chapters: 28, testament: "new" },
        { id: "mark", name: "Mark", chapters: 16, testament: "new" },
        { id: "luke", name: "Luke", chapters: 24, testament: "new" },
        { id: "john", name: "John", chapters: 21, testament: "new" },
        { id: "acts", name: "Acts", chapters: 28, testament: "new" },
        { id: "romans", name: "Romans", chapters: 16, testament: "new" },
        { id: "1corinthians", name: "1 Corinthians", chapters: 16, testament: "new" },
        { id: "2corinthians", name: "2 Corinthians", chapters: 13, testament: "new" },
        { id: "galatians", name: "Galatians", chapters: 6, testament: "new" },
        { id: "ephesians", name: "Ephesians", chapters: 6, testament: "new" },
        { id: "philippians", name: "Philippians", chapters: 4, testament: "new" },
        { id: "colossians", name: "Colossians", chapters: 4, testament: "new" },
        { id: "1thessalonians", name: "1 Thessalonians", chapters: 5, testament: "new" },
        { id: "2thessalonians", name: "2 Thessalonians", chapters: 3, testament: "new" },
        { id: "1timothy", name: "1 Timothy", chapters: 6, testament: "new" },
        { id: "2timothy", name: "2 Timothy", chapters: 4, testament: "new" },
        { id: "titus", name: "Titus", chapters: 3, testament: "new" },
        { id: "philemon", name: "Philemon", chapters: 1, testament: "new" },
        { id: "hebrews", name: "Hebrews", chapters: 13, testament: "new" },
        { id: "james", name: "James", chapters: 5, testament: "new" },
        { id: "1peter", name: "1 Peter", chapters: 5, testament: "new" },
        { id: "2peter", name: "2 Peter", chapters: 3, testament: "new" },
        { id: "1john", name: "1 John", chapters: 5, testament: "new" },
        { id: "2john", name: "2 John", chapters: 1, testament: "new" },
        { id: "3john", name: "3 John", chapters: 1, testament: "new" },
        { id: "jude", name: "Jude", chapters: 1, testament: "new" },
        { id: "revelation", name: "Revelation", chapters: 22, testament: "new" }
      ];
      res.json(books);
    } catch (error) {
      console.error('Error fetching Bible books:', error);
      res.status(500).json({ error: 'Failed to load Bible books' });
    }
  });

  // Get specific chapter
  app.get("/api/bible/:book/:chapter", async (req, res) => {
    try {
      const { book, chapter } = req.params;
      const response = await fetch(`https://bible-api.com/${book}+${chapter}?translation=kjv`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${book} chapter ${chapter}`);
      }
      const data = await response.json();
      
      // Transform the response to match our expected format
      const chapterData = {
        book: data.reference.replace(/\s\d+$/, ''), // Remove chapter number from reference
        chapter: parseInt(chapter),
        verses: data.verses.map((verse: any) => ({
          number: verse.verse,
          text: verse.text
        }))
      };
      
      res.json(chapterData);
    } catch (error) {
      console.error('Error fetching chapter:', error);
      res.status(500).json({ error: 'Failed to load chapter' });
    }
  });

  // Search verses
  app.get("/api/bible/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }

      // Use Bible API search by looking through multiple passages
      const searchResults = [];
      const booksToSearch = ['genesis', 'exodus', 'psalms', 'matthew', 'john', 'romans'];
      
      for (const book of booksToSearch) {
        try {
          // Search through first few chapters of each book
          for (let chapterNum = 1; chapterNum <= 3; chapterNum++) {
            try {
              const response = await fetch(`https://bible-api.com/${book}+${chapterNum}?translation=kjv`);
              if (response.ok) {
                const data = await response.json();
                
                // Search through verses
                for (const verse of data.verses || []) {
                  if (verse.text.toLowerCase().includes(q.toLowerCase())) {
                    searchResults.push({
                      book: data.reference.replace(/\s\d+$/, ''),
                      chapter: chapterNum,
                      verse: verse.verse,
                      text: verse.text,
                      reference: `${data.reference.replace(/\s\d+$/, '')} ${chapterNum}:${verse.verse}`
                    });
                  }
                }
              }
            } catch (chapterError) {
              // Continue to next chapter if this one fails
            }
          }
        } catch (bookError) {
          console.error(`Error searching book ${book}:`, bookError);
        }
      }

      res.json({ results: searchResults.slice(0, 20) }); // Limit to 20 results
    } catch (error) {
      console.error('Error searching verses:', error);
      res.status(500).json({ error: 'Search failed' });
    }
  });

  // Get verse explanation
  app.get("/api/explanations/:book/:chapter/:verse", async (req, res) => {
    try {
      const { book, chapter, verse } = req.params;
      const explanation = await storage.getVerseExplanation(
        book, 
        parseInt(chapter), 
        parseInt(verse)
      );
      
      if (explanation) {
        res.json(explanation);
      } else {
        res.status(404).json({ error: 'Explanation not found' });
      }
    } catch (error) {
      console.error('Error fetching explanation:', error);
      res.status(500).json({ error: 'Failed to load explanation' });
    }
  });

  // Create verse explanation (admin functionality)
  app.post("/api/explanations", async (req, res) => {
    try {
      const explanationData = insertVerseExplanationSchema.parse(req.body);
      const explanation = await storage.createVerseExplanation(explanationData);
      res.status(201).json(explanation);
    } catch (error) {
      console.error('Error creating explanation:', error);
      res.status(400).json({ error: 'Invalid explanation data' });
    }
  });

  // Bookmark endpoints (for future user functionality)
  app.get("/api/bookmarks", async (req, res) => {
    try {
      // For demo purposes, return empty bookmarks
      // In real implementation, this would check user authentication
      res.json([]);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      res.status(500).json({ error: 'Failed to load bookmarks' });
    }
  });

  app.post("/api/bookmarks", async (req, res) => {
    try {
      const bookmarkData = insertBookmarkSchema.parse(req.body);
      // For demo purposes, just return success
      // In real implementation, this would save to database with user auth
      res.status(201).json({ message: 'Bookmark saved' });
    } catch (error) {
      console.error('Error creating bookmark:', error);
      res.status(400).json({ error: 'Invalid bookmark data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
