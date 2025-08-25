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
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <nav className="space-y-4 mt-6">
          <button 
            className="flex items-center text-gray-700 hover:text-blue-600 py-2 w-full text-left"
            data-testid="button-mobile-books"
          >
            <Book className="w-5 h-5 mr-3" />
            Books
          </button>
          <button 
            className="flex items-center text-gray-700 hover:text-blue-600 py-2 w-full text-left"
            data-testid="button-mobile-bookmarks"
          >
            <Bookmark className="w-5 h-5 mr-3" />
            Bookmarks
          </button>
          <button 
            className="flex items-center text-gray-700 hover:text-blue-600 py-2 w-full text-left"
            data-testid="button-mobile-search"
          >
            <Search className="w-5 h-5 mr-3" />
            Search
          </button>
          <button 
            className="flex items-center text-gray-700 hover:text-blue-600 py-2 w-full text-left"
            data-testid="button-mobile-settings"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
