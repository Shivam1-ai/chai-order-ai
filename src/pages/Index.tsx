import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CuisineCategories from "@/components/CuisineCategories";
import FeaturedSection from "@/components/FeaturedSection";
import { Button } from "@/components/ui/button";
import { Smartphone, Truck, CreditCard, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CuisineCategories />
      <FeaturedSection />
      
      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose FoodieIndia?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Easy Ordering</h3>
              <p className="text-muted-foreground text-sm">Order in just a few taps with our user-friendly app</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-mint-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Quick delivery with real-time tracking</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-curry-yellow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">Multiple payment options including UPI, cards & COD</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-spice-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Quality Food</h3>
              <p className="text-muted-foreground text-sm">Fresh ingredients and authentic Indian flavors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🍛</span>
                </div>
                <span className="font-bold text-lg">FoodieIndia</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Bringing authentic Indian flavors to your doorstep
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">For Restaurants</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Partner With Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Restaurant Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 FoodieIndia. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
