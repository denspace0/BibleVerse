import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type BibleBook } from "@shared/schema";

interface BookSelectorProps {
  books: BibleBook[];
  selectedBook: string;
  selectedChapter: number;
  testament: 'old' | 'new';
  onBookChange: (bookId: string) => void;
  onChapterChange: (chapter: number) => void;
  onTestamentChange: (testament: 'old' | 'new') => void;
  isLoading: boolean;
}

export default function BookSelector({
  books,
  selectedBook,
  selectedChapter,
  testament,
  onBookChange,
  onChapterChange,
  onTestamentChange,
  isLoading
}: BookSelectorProps) {
  const currentBook = books.find(book => book.id === selectedBook);
  const testamentBooks = books.filter(book => book.testament === testament);

  if (isLoading) {
    return (
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-6 sticky top-24">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="flex mb-4 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
          <Skeleton className="flex-1 h-8 rounded-md" />
          <Skeleton className="flex-1 h-8 rounded-md ml-1" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-6 sticky top-24">
      <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Books of the Bible</h3>
      
      {/* Testament Tabs */}
      <div className="flex mb-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-xl p-1 shadow-inner">
        <button
          className={cn(
            "flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200",
            testament === 'old' 
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105" 
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          )}
          onClick={() => onTestamentChange('old')}
          data-testid="button-old-testament"
        >
          Old Testament
        </button>
        <button
          className={cn(
            "flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200",
            testament === 'new' 
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105" 
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          )}
          onClick={() => onTestamentChange('new')}
          data-testid="button-new-testament"
        >
          New Testament
        </button>
      </div>

      {/* Books List */}
      <ScrollArea className="h-96">
        <div className="space-y-1" data-testid="books-list">
          {testamentBooks.map((book) => (
            <button
              key={book.id}
              className={cn(
                "w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 font-medium",
                selectedBook === book.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-800 dark:hover:to-slate-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md"
              )}
              onClick={() => onBookChange(book.id)}
              data-testid={`button-book-${book.id}`}
            >
              {book.name}
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Chapter Selector */}
      {currentBook && (
        <div className="mt-8 pt-6 border-t border-gradient-to-r from-gray-200 to-gray-300 dark:border-gray-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base">
            {currentBook.name} Chapters
          </h4>
          <div className="grid grid-cols-6 gap-1" data-testid="chapters-list">
            {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map((chapterNum) => (
              <button
                key={chapterNum}
                className={cn(
                  "w-9 h-9 text-xs font-bold rounded-lg border-2 transition-all duration-200 shadow-sm",
                  selectedChapter === chapterNum
                    ? "border-blue-500 text-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transform scale-110"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105 bg-white/50 dark:bg-slate-800/50"
                )}
                onClick={() => onChapterChange(chapterNum)}
                data-testid={`button-chapter-${chapterNum}`}
              >
                {chapterNum}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
