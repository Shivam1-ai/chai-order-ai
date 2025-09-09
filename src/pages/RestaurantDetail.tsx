import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, Clock, MapPin, Plus, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import restaurant1 from '@/assets/restaurant-1.jpg';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('recommended');

  // Mock restaurant data
  const restaurant = {
    id: '1',
    name: 'Spice Palace',
    cuisine: 'North Indian, Mughlai',
    rating: 4.5,
    reviews: 2350,
    deliveryTime: '25-30 min',
    distance: '2.1 km',
    deliveryFee: 25,
    image: restaurant1,
    description: 'Authentic North Indian cuisine with rich Mughlai flavors. Famous for biryanis and kebabs.',
    isOpen: true,
    offers: ['20% OFF on orders above ₹500', 'Free delivery on first order']
  };

  const categories = [
    'Recommended',
    'Biryani',
    'Kebabs',
    'Curry',
    'Breads',
    'Desserts',
    'Beverages'
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice with tender chicken pieces and aromatic spices',
      price: 299,
      category: 'biryani',
      rating: 4.6,
      isVeg: false,
      image: restaurant1
    },
    {
      id: '2',
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in rich tomato-based creamy curry',
      price: 249,
      category: 'curry',
      rating: 4.4,
      isVeg: true,
      image: restaurant1
    },
    {
      id: '3',
      name: 'Seekh Kebab',
      description: 'Spiced minced meat grilled to perfection on skewers',
      price: 199,
      category: 'kebabs',
      rating: 4.7,
      isVeg: false,
      image: restaurant1
    },
    {
      id: '4',
      name: 'Garlic Naan',
      description: 'Soft bread with garlic and herbs, baked in tandoor',
      price: 89,
      category: 'breads',
      rating: 4.5,
      isVeg: true,
      image: restaurant1
    }
  ];

  const filteredItems = selectedCategory === 'recommended' 
    ? menuItems.filter(item => item.rating >= 4.5)
    : menuItems.filter(item => item.category === selectedCategory.toLowerCase());

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      image: item.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${item.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-curry-yellow text-curry-yellow mr-1" />
              {restaurant.rating} ({restaurant.reviews})
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {restaurant.distance}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center">
                            <Badge variant={item.isVeg ? "secondary" : "destructive"} className="mr-2">
                              {item.isVeg ? '🟢' : '🔴'}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-lg">₹{item.price}</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-mint-green text-mint-green mr-1" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                          </div>
                          <Button onClick={() => handleAddToCart(item)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Restaurant Details Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Restaurant Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Cuisine</span>
                    <span>{restaurant.cuisine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Time</span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{restaurant.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <Badge variant={restaurant.isOpen ? "default" : "secondary"}>
                      {restaurant.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Offers</h3>
                <div className="space-y-2">
                  {restaurant.offers.map((offer, index) => (
                    <Badge key={index} variant="outline" className="w-full justify-start p-2">
                      {offer}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;