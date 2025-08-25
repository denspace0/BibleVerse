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
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-6">
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Header Skeleton */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="w-12 h-10 rounded-lg" />
            <Skeleton className="w-12 h-10 rounded-lg" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-8">
          <div className="space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex">
                <Skeleton className="w-10 h-8 mr-4 flex-shrink-0 rounded-lg" />
                <Skeleton className={cn("h-8 rounded-lg", i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5")} />
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
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search verses, topics, or keywords..."
            className="pl-12 py-4 h-14 text-lg bg-white/70 dark:bg-slate-800/70 border-2 border-blue-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-inner"
            onFocus={onToggleSearch}
            data-testid="input-search"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-300 w-6 h-6" />
        </div>
      </div>

      {/* Chapter Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" data-testid="text-chapter-title">
              {getBookDisplayName(book)} Chapter {selectedChapter}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">King James Version</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white/50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg"
              onClick={() => onNavigateChapter('prev')}
              data-testid="button-prev-chapter"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white/50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg"
              onClick={() => onNavigateChapter('next')}
              data-testid="button-next-chapter"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 bg-white/50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/30 border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500 rounded-xl transition-all duration-200 hover:scale-110 shadow-lg"
              data-testid="button-bookmark-chapter"
            >
              <Bookmark className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Font Size Controls */}
        <div className="flex items-center space-x-6">
          <span className="text-base font-medium text-gray-600 dark:text-gray-300">Text Size:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFontSizeChange(false)}
            className="h-10 px-4 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-md"
            data-testid="button-decrease-font"
          >
            A-
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFontSizeChange(true)}
            className="h-10 px-4 bg-white/50 dark:bg-slate-800/50 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-lg font-bold transition-all duration-200 hover:scale-105 shadow-md"
            data-testid="button-increase-font"
          >
            A+
          </Button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 dark:border-slate-700/50 p-8">
        <div className="max-w-none" data-testid="chapter-content">
          {chapter?.verses?.map((verse) => (
            <div key={verse.number} className="verse-container mb-6 group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-slate-800/50 dark:hover:to-slate-700/50 p-4 rounded-xl transition-all duration-200" data-testid={`verse-${verse.number}`}>
              <span className="verse-number inline-block w-12 h-8 text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4 select-none flex items-center justify-center shadow-lg">
                {verse.number}
              </span>
              <span
                className={cn(
                  "verse-text leading-relaxed cursor-pointer transition-all duration-200 rounded-lg px-3 py-2 inline-block",
                  fontSize,
                  highlightedVerses.has(verse.number)
                    ? "bg-gradient-to-r from-yellow-200 to-amber-200 dark:from-yellow-800 dark:to-amber-800 text-gray-900 dark:text-gray-100 shadow-lg transform scale-105"
                    : "hover:bg-gradient-to-r hover:from-yellow-100 hover:to-amber-100 dark:hover:from-yellow-900/30 dark:hover:to-amber-900/30 hover:shadow-md text-gray-800 dark:text-gray-200"
                )}
                onClick={() => onVerseHighlight(verse.number)}
                data-testid={`text-verse-${verse.number}`}
              >
                {verse.text}
              </span>
              <button
                className={cn(
                  "ml-3 p-2 rounded-full transition-all duration-200 shadow-lg",
                  highlightedVerses.has(verse.number)
                    ? "opacity-100 text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform scale-110"
                    : "opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-400 hover:text-white bg-white/50 dark:bg-slate-800/50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 border border-gray-300 dark:border-gray-600 hover:border-transparent hover:scale-110"
                )}
                onClick={() => onShowExplanation(verse.number)}
                title="Show explanation"
                data-testid={`button-explanation-${verse.number}`}
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gradient-to-r from-gray-200 to-gray-300 dark:border-gray-700">
          <Button
            variant="ghost"
            className="text-blue-600 dark:text-blue-400 hover:text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg border border-blue-200 dark:border-blue-600 hover:border-transparent"
            onClick={() => onNavigateChapter('prev')}
            data-testid="button-prev-chapter-bottom"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous Chapter
          </Button>
          <span className="text-lg font-bold text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-slate-800/50 px-6 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600" data-testid="text-chapter-info">
            {getBookDisplayName(book)} {selectedChapter}
          </span>
          <Button
            variant="ghost"
            className="text-blue-600 dark:text-blue-400 hover:text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg border border-blue-200 dark:border-blue-600 hover:border-transparent"
            onClick={() => onNavigateChapter('next')}
            data-testid="button-next-chapter-bottom"
          >
            Next Chapter
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
