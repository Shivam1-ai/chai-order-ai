import RestaurantCard from "./RestaurantCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";

const FeaturedSection = () => {
  const featuredRestaurants = [
    {
      name: "Spice Palace",
      cuisine: "North Indian, Mughlai",
      rating: 4.5,
      deliveryTime: "25-30 min",
      distance: "2.1 km",
      offer: "20% OFF",
      image: restaurant1,
    },
    {
      name: "Dosa Corner",
      cuisine: "South Indian, Street Food",
      rating: 4.7,
      deliveryTime: "20-25 min", 
      distance: "1.8 km",
      offer: "Buy 1 Get 1",
      image: restaurant2,
    },
    {
      name: "Traditional Thali",
      cuisine: "Traditional, Vegetarian",
      rating: 4.6,
      deliveryTime: "30-35 min",
      distance: "3.2 km",
      image: restaurant3,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Popular Near You
            </h2>
            <p className="text-muted-foreground">
              Top-rated restaurants delivering to your location
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center space-x-2">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} />
          ))}
        </div>

        <div className="md:hidden mt-6 flex justify-center">
          <Button variant="outline" className="flex items-center space-x-2">
            <span>View All Restaurants</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;