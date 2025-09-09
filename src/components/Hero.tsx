import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-food.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[70vh] bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delicious Indian cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-spice-red/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Taste of India
            <span className="block text-curry-yellow">Delivered Fresh</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Discover authentic Indian flavors from your favorite local restaurants. 
            Order now and get fresh, hot meals delivered to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-food" onClick={() => navigate('/search')}>
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/search')}>
              Explore Restaurants
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 mr-2 text-curry-yellow" />
                <span className="text-2xl font-bold">500+</span>
              </div>
              <p className="text-sm text-white/80">Restaurants</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 mr-2 text-curry-yellow" />
                <span className="text-2xl font-bold">30min</span>
              </div>
              <p className="text-sm text-white/80">Avg Delivery</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 mr-2 text-curry-yellow" />
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <p className="text-sm text-white/80">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;