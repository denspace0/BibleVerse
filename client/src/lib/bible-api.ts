export const BIBLE_API_BASE = 'https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/niv';

export interface ApiBibleBook {
  id: string;
  name: string;
  chapters: number;
}

export interface ApiBibleVerse {
  number: number;
  text: string;
}

export interface ApiBibleChapter {
  book: string;
  chapter: number;
  verses: ApiBibleVerse[];
}

export async function fetchBibleBooks(): Promise<ApiBibleBook[]> {
  const response = await fetch(`${BIBLE_API_BASE}/books.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch Bible books');
  }
  return response.json();
}

export async function fetchChapter(book: string, chapter: number): Promise<ApiBibleChapter> {
  const response = await fetch(`${BIBLE_API_BASE}/books/${book}/chapters/${chapter}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${book} chapter ${chapter}`);
  }
  return response.json();
}

export async function searchVerses(query: string): Promise<any> {
  // This is handled by our backend API
  const response = await fetch(`/api/bible/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Search failed');
  }
  return response.json();
}
