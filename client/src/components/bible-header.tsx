import { Book, Bookmark, Search, Menu } from "lucide-react";

interface BibleHeaderProps {
  onToggleSearch: () => void;
  onToggleMobileMenu: () => void;
}

export default function BibleHeader({ onToggleSearch, onToggleMobileMenu }: BibleHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Holy Bible</h1>
              <p className="text-sm text-gray-500">King James Version</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              data-testid="button-books"
            >
              <Book className="w-4 h-4 mr-2" />
              Books
            </button>
            <button 
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              data-testid="button-bookmarks"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </button>
            <button 
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              onClick={onToggleSearch}
              data-testid="button-search"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={onToggleMobileMenu}
            data-testid="button-mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
