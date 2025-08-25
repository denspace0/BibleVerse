import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Book, Bookmark, Search, Settings } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-l border-white/50 dark:border-slate-700/50">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Menu</SheetTitle>
        </SheetHeader>
        
        <nav className="space-y-3 mt-8">
          <button 
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-white bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 py-4 px-6 w-full text-left rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600 hover:border-transparent font-medium"
            data-testid="button-mobile-books"
          >
            <Book className="w-6 h-6 mr-4" />
            Books
          </button>
          <button 
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-white bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 py-4 px-6 w-full text-left rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600 hover:border-transparent font-medium"
            data-testid="button-mobile-bookmarks"
          >
            <Bookmark className="w-6 h-6 mr-4" />
            Bookmarks
          </button>
          <button 
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-white bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 py-4 px-6 w-full text-left rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600 hover:border-transparent font-medium"
            data-testid="button-mobile-search"
          >
            <Search className="w-6 h-6 mr-4" />
            Search
          </button>
          <button 
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-white bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 py-4 px-6 w-full text-left rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-600 hover:border-transparent font-medium"
            data-testid="button-mobile-settings"
          >
            <Settings className="w-6 h-6 mr-4" />
            Settings
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
