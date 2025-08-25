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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
      <h3 className="font-semibold text-gray-900 mb-4">Books of the Bible</h3>
      
      {/* Testament Tabs */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          className={cn(
            "flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors",
            testament === 'old' 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-900"
          )}
          onClick={() => onTestamentChange('old')}
          data-testid="button-old-testament"
        >
          Old Testament
        </button>
        <button
          className={cn(
            "flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors",
            testament === 'new' 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-gray-600 hover:text-gray-900"
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
                "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                selectedBook === book.id
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-100 text-gray-700 hover:text-blue-600"
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
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">
            {currentBook.name} Chapters
          </h4>
          <div className="grid grid-cols-6 gap-1" data-testid="chapters-list">
            {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map((chapterNum) => (
              <button
                key={chapterNum}
                className={cn(
                  "w-8 h-8 text-xs font-medium rounded border transition-colors",
                  selectedChapter === chapterNum
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-600 hover:text-blue-600"
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
