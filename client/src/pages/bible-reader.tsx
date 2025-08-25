import { useState, useEffect } from "react";
import { useParams } from "wouter";
import BibleHeader from "@/components/bible-header";
import BookSelector from "@/components/book-selector";
import ChapterContent from "@/components/chapter-content";
import VerseExplanationModal from "@/components/verse-explanation-modal";
import SearchModal from "@/components/search-modal";
import MobileMenu from "@/components/mobile-menu";
import { useBibleData } from "@/hooks/use-bible-data";

export default function BibleReader() {
  const params = useParams();
  const [selectedBook, setSelectedBook] = useState(params.book || 'genesis');
  const [selectedChapter, setSelectedChapter] = useState(parseInt(params.chapter || '1'));
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [highlightedVerses, setHighlightedVerses] = useState<Set<number>>(new Set());
  const [fontSize, setFontSize] = useState('text-lg');
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [testament, setTestament] = useState<'old' | 'new'>('old');

  const { books, chapter, isLoadingBooks, isLoadingChapter } = useBibleData(selectedBook, selectedChapter);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('bible-font-size');
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    const savedHighlights = localStorage.getItem(`bible-highlights-${selectedBook}-${selectedChapter}`);
    if (savedHighlights) {
      setHighlightedVerses(new Set(JSON.parse(savedHighlights)));
    }
  }, [selectedBook, selectedChapter]);

  // Save font size to localStorage
  useEffect(() => {
    localStorage.setItem('bible-font-size', fontSize);
  }, [fontSize]);

  // Save highlighted verses to localStorage
  useEffect(() => {
    localStorage.setItem(
      `bible-highlights-${selectedBook}-${selectedChapter}`,
      JSON.stringify(Array.from(highlightedVerses))
    );
  }, [highlightedVerses, selectedBook, selectedChapter]);

  const handleBookChange = (bookId: string) => {
    setSelectedBook(bookId);
    setSelectedChapter(1);
    setHighlightedVerses(new Set());
    setSelectedVerse(null);
  };

  const handleChapterChange = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
    setHighlightedVerses(new Set());
    setSelectedVerse(null);
  };

  const handleVerseHighlight = (verseNumber: number) => {
    const newHighlights = new Set(highlightedVerses);
    if (newHighlights.has(verseNumber)) {
      newHighlights.delete(verseNumber);
    } else {
      newHighlights.add(verseNumber);
    }
    setHighlightedVerses(newHighlights);
    setSelectedVerse(verseNumber);
  };

  const handleShowExplanation = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
    setShowExplanationModal(true);
  };

  const adjustFontSize = (increase: boolean) => {
    const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
    const currentIndex = sizes.indexOf(fontSize);
    let newIndex = increase ? currentIndex + 1 : currentIndex - 1;
    newIndex = Math.max(0, Math.min(sizes.length - 1, newIndex));
    setFontSize(sizes[newIndex]);
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedChapter > 1) {
      handleChapterChange(selectedChapter - 1);
    } else if (direction === 'next') {
      // In a real implementation, we'd check the max chapters for the book
      handleChapterChange(selectedChapter + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <BibleHeader
        onToggleSearch={() => setShowSearchModal(true)}
        onToggleMobileMenu={() => setShowMobileMenu(true)}
      />

      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <BookSelector
              books={books}
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              testament={testament}
              onBookChange={handleBookChange}
              onChapterChange={handleChapterChange}
              onTestamentChange={setTestament}
              isLoading={isLoadingBooks}
            />
          </div>

          <div className="lg:col-span-3">
            <ChapterContent
              book={selectedBook}
              chapter={chapter}
              selectedChapter={selectedChapter}
              highlightedVerses={highlightedVerses}
              fontSize={fontSize}
              onVerseHighlight={handleVerseHighlight}
              onShowExplanation={handleShowExplanation}
              onFontSizeChange={adjustFontSize}
              onNavigateChapter={navigateChapter}
              onToggleSearch={() => setShowSearchModal(true)}
              isLoading={isLoadingChapter}
            />
          </div>
        </div>
      </main>

      <VerseExplanationModal
        isOpen={showExplanationModal}
        onClose={() => setShowExplanationModal(false)}
        book={selectedBook}
        chapter={selectedChapter}
        verse={selectedVerse}
        verseText={chapter?.verses?.find(v => v.number === selectedVerse)?.text}
      />

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onNavigateToVerse={(book, chapter, verse) => {
          setSelectedBook(book);
          setSelectedChapter(chapter);
          setSelectedVerse(verse);
          setShowSearchModal(false);
        }}
      />
    </div>
  );
}
