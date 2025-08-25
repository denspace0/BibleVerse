import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X, Bookmark } from "lucide-react";
import { type SearchResult } from "@shared/schema";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToVerse: (book: string, chapter: number, verse: number) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onNavigateToVerse
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: searchData, isLoading } = useQuery<{results: SearchResult[]}>({
    queryKey: ['/api/bible/search', { q: debouncedQuery }],
    enabled: isOpen && debouncedQuery.length > 2,
  });

  const handleNavigateToResult = (result: SearchResult) => {
    const bookId = result.book.toLowerCase().replace(/\s+/g, '');
    onNavigateToVerse(bookId, result.chapter, result.verse);
  };

  const handleBookmarkResult = (result: SearchResult) => {
    // TODO: Implement bookmarking functionality
    console.log('Bookmark result:', result);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle data-testid="text-search-title">Search Results</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-search"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search verses, topics, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
            data-testid="input-search-modal"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery.length <= 2 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600" data-testid="text-search-prompt">
                Enter at least 3 characters to search the Bible
              </p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Skeleton className="h-5 w-24 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="w-6 h-6 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchData?.results && searchData.results.length > 0 ? (
            <div className="space-y-4" data-testid="search-results">
              {searchData.results.map((result: SearchResult, index: number) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
                  onClick={() => handleNavigateToResult(result)}
                  data-testid={`search-result-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-blue-600 mb-1" data-testid={`text-reference-${index}`}>
                        {result.reference}
                      </p>
                      <p className="text-gray-800 mb-2" data-testid={`text-result-${index}`}>
                        "{result.text}"
                      </p>
                      <p className="text-sm text-gray-600" data-testid={`text-context-${index}`}>
                        {result.book}, Chapter {result.chapter}
                      </p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-600 ml-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkResult(result);
                      }}
                      data-testid={`button-bookmark-result-${index}`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="text-center py-8">
              <p className="text-gray-600" data-testid="text-no-results">
                No results found for "{searchQuery}"
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          {searchData?.results && searchData.results.length > 0 ? (
            <p className="text-sm text-gray-600" data-testid="text-results-count">
              Found {searchData.results.length} results for "{debouncedQuery}"
            </p>
          ) : (
            <div />
          )}
          <Button variant="outline" onClick={onClose} data-testid="button-close-modal">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
