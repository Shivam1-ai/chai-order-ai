import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍛</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FoodieIndia</h1>
              <p className="text-xs text-muted-foreground">Taste of India</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 flex-1 max-w-md mx-8">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants, cuisines..."
              className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>

          {/* Location & Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Delhi</span>
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3 flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants, cuisines..."
            className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;