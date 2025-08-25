import { Search, ChevronLeft, ChevronRight, Bookmark, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type BibleChapter } from "@shared/schema";

interface ChapterContentProps {
  book: string;
  chapter: BibleChapter | undefined;
  selectedChapter: number;
  highlightedVerses: Set<number>;
  fontSize: string;
  onVerseHighlight: (verseNumber: number) => void;
  onShowExplanation: (verseNumber: number) => void;
  onFontSizeChange: (increase: boolean) => void;
  onNavigateChapter: (direction: 'prev' | 'next') => void;
  onToggleSearch: () => void;
  isLoading: boolean;
}

export default function ChapterContent({
  book,
  chapter,
  selectedChapter,
  highlightedVerses,
  fontSize,
  onVerseHighlight,
  onShowExplanation,
  onFontSizeChange,
  onNavigateChapter,
  onToggleSearch,
  isLoading
}: ChapterContentProps) {

  const getBookDisplayName = (bookId: string) => {
    return bookId.charAt(0).toUpperCase() + bookId.slice(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Search Bar Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Header Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-10 h-10" />
              <Skeleton className="w-10 h-10" />
              <Skeleton className="w-10 h-10" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="w-10 h-8" />
            <Skeleton className="w-10 h-8" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex">
                <Skeleton className="w-8 h-6 mr-2 flex-shrink-0" />
                <Skeleton className={cn("h-6", i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5")} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search verses, topics, or keywords..."
            className="pl-10 py-3 h-12"
            onFocus={onToggleSearch}
            data-testid="input-search"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Chapter Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-chapter-title">
              {getBookDisplayName(book)} Chapter {selectedChapter}
            </h2>
            <p className="text-gray-600 mt-1">King James Version</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600"
              onClick={() => onNavigateChapter('prev')}
              data-testid="button-prev-chapter"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600"
              onClick={() => onNavigateChapter('next')}
              data-testid="button-next-chapter"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-600"
              data-testid="button-bookmark-chapter"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Font Size Controls */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Text Size:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFontSizeChange(false)}
            data-testid="button-decrease-font"
          >
            A-
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFontSizeChange(true)}
            data-testid="button-increase-font"
          >
            A+
          </Button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="max-w-none" data-testid="chapter-content">
          {chapter?.verses?.map((verse) => (
            <div key={verse.number} className="verse-container mb-4 group" data-testid={`verse-${verse.number}`}>
              <span className="verse-number inline-block w-8 text-xs font-semibold text-blue-600 mr-2 select-none">
                {verse.number}
              </span>
              <span
                className={cn(
                  "verse-text leading-relaxed cursor-pointer transition-colors rounded px-1",
                  fontSize,
                  highlightedVerses.has(verse.number)
                    ? "bg-yellow-200"
                    : "hover:bg-yellow-100"
                )}
                onClick={() => onVerseHighlight(verse.number)}
                data-testid={`text-verse-${verse.number}`}
              >
                {verse.text}
              </span>
              <button
                className={cn(
                  "ml-2 text-xs transition-opacity",
                  highlightedVerses.has(verse.number)
                    ? "opacity-100 text-blue-600"
                    : "opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-600"
                )}
                onClick={() => onShowExplanation(verse.number)}
                title="Show explanation"
                data-testid={`button-explanation-${verse.number}`}
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => onNavigateChapter('prev')}
            data-testid="button-prev-chapter-bottom"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous Chapter
          </Button>
          <span className="text-sm text-gray-600" data-testid="text-chapter-info">
            {getBookDisplayName(book)} {selectedChapter}
          </span>
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => onNavigateChapter('next')}
            data-testid="button-next-chapter-bottom"
          >
            Next Chapter
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
