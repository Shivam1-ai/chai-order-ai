import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter, SlidersHorizontal } from 'lucide-react';
import RestaurantCard from '@/components/RestaurantCard';
import restaurant1 from '@/assets/restaurant-1.jpg';
import restaurant2 from '@/assets/restaurant-2.jpg';
import restaurant3 from '@/assets/restaurant-3.jpg';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results
  const allRestaurants = [
    {
      id: '1',
      name: 'Spice Palace',
      cuisine: 'North Indian, Mughlai',
      rating: 4.5,
      deliveryTime: '25-30 min',
      distance: '2.1 km',
      offer: '20% OFF',
      image: restaurant1,
    },
    {
      id: '2',
      name: 'Dosa Corner',
      cuisine: 'South Indian, Street Food',
      rating: 4.7,
      deliveryTime: '20-25 min',
      distance: '1.8 km',
      offer: 'Buy 1 Get 1',
      image: restaurant2,
    },
    {
      id: '3',
      name: 'Traditional Thali',
      cuisine: 'Traditional, Vegetarian',
      rating: 4.6,
      deliveryTime: '30-35 min',
      distance: '3.2 km',
      image: restaurant3,
    },
    {
      id: '4',
      name: 'Pizza Corner',
      cuisine: 'Italian, Pizza',
      rating: 4.3,
      deliveryTime: '35-40 min',
      distance: '4.1 km',
      offer: '30% OFF',
      image: restaurant1,
    },
    {
      id: '5',
      name: 'Biryani House',
      cuisine: 'Hyderabadi, Biryani',
      rating: 4.8,
      deliveryTime: '40-45 min',
      distance: '5.2 km',
      image: restaurant2,
    }
  ];

  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);

  useEffect(() => {
    let results = allRestaurants;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (filterBy !== 'all') {
      results = results.filter(restaurant =>
        restaurant.cuisine.toLowerCase().includes(filterBy.toLowerCase())
      );
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        results.sort((a, b) => 
          parseInt(a.deliveryTime.split('-')[0]) - parseInt(b.deliveryTime.split('-')[0])
        );
        break;
      case 'distance':
        results.sort((a, b) => 
          parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
        );
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredRestaurants(results);
  }, [searchQuery, sortBy, filterBy]);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex-1 flex items-center space-x-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-medium">Filter:</span>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cuisines</SelectItem>
                    <SelectItem value="north indian">North Indian</SelectItem>
                    <SelectItem value="south indian">South Indian</SelectItem>
                    <SelectItem value="pizza">Pizza</SelectItem>
                    <SelectItem value="biryani">Biryani</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : 'All Restaurants'}
          </h1>
          <p className="text-muted-foreground">
            Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                <RestaurantCard {...restaurant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
