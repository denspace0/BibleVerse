import { Book, Bookmark, Search, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface BibleHeaderProps {
  onToggleSearch: () => void;
  onToggleMobileMenu: () => void;
}

export default function BibleHeader({ onToggleSearch, onToggleMobileMenu }: BibleHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-lg border-b border-white/20 dark:border-white/10 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 dark:bg-white/10 text-white p-2 rounded-xl backdrop-blur-sm border border-white/30 dark:border-white/20 shadow-lg">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-sm">Holy Bible</h1>
              <p className="text-sm text-white/80">King James Version</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              className="text-white/90 hover:text-white transition-all duration-200 flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/30"
              data-testid="button-books"
            >
              <Book className="w-4 h-4 mr-2" />
              Books
            </button>
            <button 
              className="text-white/90 hover:text-white transition-all duration-200 flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/30"
              data-testid="button-bookmarks"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </button>
            <button 
              className="text-white/90 hover:text-white transition-all duration-200 flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/30"
              onClick={onToggleSearch}
              data-testid="button-search"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-white/90 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200"
              onClick={onToggleMobileMenu}
              data-testid="button-mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
