import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  offer?: string;
  image: string;
}

const RestaurantCard = ({ name, cuisine, rating, deliveryTime, distance, offer, image }: RestaurantCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-food transition-all duration-300 cursor-pointer border-0 shadow-elegant">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {offer && (
          <Badge className="absolute top-3 left-3 bg-spice-red text-white font-semibold">
            {offer}
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-16" />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{name}</h3>
          <div className="flex items-center space-x-1 bg-mint-green/10 px-2 py-1 rounded">
            <Star className="w-3 h-3 fill-mint-green text-mint-green" />
            <span className="text-sm font-medium text-mint-green">{rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{cuisine}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{distance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;