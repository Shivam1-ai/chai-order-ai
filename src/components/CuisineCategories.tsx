import { Badge } from "@/components/ui/badge";

const CuisineCategories = () => {
  const cuisines = [
    { name: "North Indian", icon: "🍛", color: "bg-gradient-primary" },
    { name: "South Indian", icon: "🥞", color: "bg-gradient-accent" },
    { name: "Street Food", icon: "🌮", color: "bg-mint-green" },
    { name: "Biryani", icon: "🍚", color: "bg-spice-red" },
    { name: "Chinese", icon: "🍜", color: "bg-curry-yellow" },
    { name: "Desserts", icon: "🧁", color: "bg-gradient-primary" },
    { name: "Beverages", icon: "🥤", color: "bg-mint-green" },
    { name: "Pizza", icon: "🍕", color: "bg-spice-red" },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          What's on your mind?
        </h2>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {cuisines.map((cuisine, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-xl hover:shadow-food transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-16 h-16 ${cuisine.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{cuisine.icon}</span>
              </div>
              <span className="text-sm font-medium text-foreground text-center leading-tight">
                {cuisine.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineCategories;