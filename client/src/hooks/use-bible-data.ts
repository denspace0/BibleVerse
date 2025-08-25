import { useQuery } from "@tanstack/react-query";
import { type BibleBook, type BibleChapter } from "@shared/schema";

export function useBibleData(selectedBook: string, selectedChapter: number) {
  const { data: books = [], isLoading: isLoadingBooks } = useQuery<BibleBook[]>({
    queryKey: ['/api/bible/books'],
    select: (data: any[]) => {
      // Transform API data to include testament classification
      const oldTestamentBooks = [
        'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
        '1samuel', '2samuel', '1kings', '2kings', '1chronicles', '2chronicles', 'ezra', 'nehemiah',
        'esther', 'job', 'psalms', 'proverbs', 'ecclesiastes', 'songofsolomon', 'isaiah', 'jeremiah',
        'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah',
        'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi'
      ];

      return data.map(book => ({
        ...book,
        testament: oldTestamentBooks.includes(book.id) ? 'old' as const : 'new' as const
      }));
    }
  });

  const { data: chapter, isLoading: isLoadingChapter } = useQuery<BibleChapter>({
    queryKey: ['/api/bible', selectedBook, selectedChapter],
    enabled: !!selectedBook && !!selectedChapter,
  });

  return {
    books,
    chapter,
    isLoadingBooks,
    isLoadingChapter
  };
}
