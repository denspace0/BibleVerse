import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, X } from "lucide-react";
import { type VerseExplanation } from "@shared/schema";

interface VerseExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: string;
  chapter: number;
  verse: number | null;
  verseText?: string;
}

export default function VerseExplanationModal({
  isOpen,
  onClose,
  book,
  chapter,
  verse,
  verseText
}: VerseExplanationModalProps) {
  const { data: explanation, isLoading } = useQuery<VerseExplanation>({
    queryKey: ['/api/explanations', book, chapter, verse],
    enabled: isOpen && verse !== null,
  });

  const getBookDisplayName = (bookId: string) => {
    return bookId.charAt(0).toUpperCase() + bookId.slice(1);
  };

  const handleNavigateToVerse = (reference: string) => {
    // TODO: Implement navigation to cross-reference verses
    console.log('Navigate to:', reference);
  };

  const handleBookmarkVerse = () => {
    // TODO: Implement bookmarking functionality
    console.log('Bookmark verse:', `${book} ${chapter}:${verse}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle data-testid="text-explanation-title">
              {verse ? `${getBookDisplayName(book)} ${chapter}:${verse} Explanation` : 'Verse Explanation'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-explanation"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {verse && verseText && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm font-medium text-blue-600 mb-1">Verse Text</p>
            <p className="text-gray-800" data-testid="text-verse-content">
              "{verseText}"
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ) : explanation ? (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Commentary</h4>
              <p className="text-gray-700 leading-relaxed" data-testid="text-commentary">
                {explanation.commentary}
              </p>
            </div>

            {explanation.keyThemes && explanation.keyThemes.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Themes</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1" data-testid="list-key-themes">
                  {explanation.keyThemes.map((theme, index) => (
                    <li key={index}>{theme}</li>
                  ))}
                </ul>
              </div>
            )}

            {explanation.crossReferences && explanation.crossReferences.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Cross References</h4>
                <div className="space-y-2" data-testid="list-cross-references">
                  {explanation.crossReferences.map((ref, index) => (
                    <button
                      key={index}
                      className="block text-blue-600 hover:text-blue-800 text-sm text-left"
                      onClick={() => handleNavigateToVerse(ref.reference)}
                      data-testid={`button-reference-${index}`}
                    >
                      {ref.reference} - "{ref.text}"
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600" data-testid="text-no-explanation">
              No explanation available for this verse yet.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} data-testid="button-close">
            Close
          </Button>
          <Button onClick={handleBookmarkVerse} data-testid="button-bookmark">
            <Bookmark className="w-4 h-4 mr-2" />
            Bookmark
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
