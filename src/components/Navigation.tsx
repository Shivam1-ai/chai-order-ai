import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import SearchDialog from "./SearchDialog";
import AuthDialog from "./AuthDialog";
import CartSidebar from "./CartSidebar";

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
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
          <div 
            className="hidden md:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 flex-1 max-w-md mx-8 cursor-pointer"
            onClick={() => setShowSearch(true)}
          >
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants, cuisines..."
              className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 cursor-pointer"
              readOnly
            />
          </div>

          {/* Location & Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Delhi</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative" onClick={() => setShowCart(true)}>
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={isAuthenticated ? logout : () => setShowAuth(true)}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div 
          className="md:hidden mt-3 flex items-center space-x-2 bg-muted rounded-lg px-3 py-2 cursor-pointer"
          onClick={() => setShowSearch(true)}
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants, cuisines..."
            className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 cursor-pointer"
            readOnly
          />
        </div>
      </div>
      
      <SearchDialog open={showSearch} onOpenChange={setShowSearch} />
      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
      <CartSidebar open={showCart} onOpenChange={setShowCart} />
    </nav>
  );
};

export default Navigation;