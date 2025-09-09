import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Clock, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const recentSearches = [
    'Biryani near me',
    'Pizza delivery',
    'South Indian breakfast',
    'Chinese food'
  ];

  const popularRestaurants = [
    { name: 'Spice Palace', cuisine: 'North Indian', rating: 4.5, time: '25-30 min', distance: '2.1 km' },
    { name: 'Dosa Corner', cuisine: 'South Indian', rating: 4.7, time: '20-25 min', distance: '1.8 km' },
    { name: 'Traditional Thali', cuisine: 'Vegetarian', rating: 4.6, time: '30-35 min', distance: '3.2 km' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onOpenChange(false);
    }
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search for restaurants and cuisines</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
                autoFocus
              />
            </div>
            <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
              Search
            </Button>
          </div>

          {!searchQuery && (
            <>
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Popular Restaurants</h3>
                <div className="space-y-3">
                  {popularRestaurants.map((restaurant, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => {
                        navigate(`/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`);
                        onOpenChange(false);
                      }}
                    >
                      <div>
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center mb-1">
                          <Star className="w-3 h-3 fill-mint-green text-mint-green mr-1" />
                          {restaurant.rating}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {restaurant.distance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;