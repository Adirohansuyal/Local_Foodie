import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { restaurants } from "@/data/restaurants";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOption = "recommended" | "rating" | "delivery" | "price";

export default function RestaurantList() {
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  
  const getSortedRestaurants = () => {
    let sortedList = [...restaurants];
    
    switch(sortOption) {
      case "rating":
        return sortedList.sort((a, b) => b.rating - a.rating);
      case "delivery":
        return sortedList.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split("-")[0]);
          const bTime = parseInt(b.deliveryTime.split("-")[0]);
          return aTime - bTime;
        });
      case "price":
        return sortedList.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
      default:
        return sortedList;
    }
  };
  
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-poppins mb-4 md:mb-0">Local Favorites</h2>
          
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Sort by:</span>
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Recommended" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="delivery">Delivery Time</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSortedRestaurants().map((restaurant) => (
            <Card key={restaurant.id} className="restaurant-card bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="favorite-btn absolute top-3 right-3 p-2 bg-background rounded-full shadow-md hover:bg-muted"
                  onClick={() => toggleFavorite(restaurant.id)}
                >
                  <Heart 
                    className={favorites.has(restaurant.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"} 
                    size={20} 
                  />
                </Button>
                <div className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                  {restaurant.deliveryTime} min
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold font-poppins">{restaurant.name}</h3>
                  <div className="flex items-center gap-1">
                    <i className="ri-star-fill rating-star"></i>
                    <span className="font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.categories.map((category, index) => (
                    <span key={index} className="text-xs py-1 px-2 bg-muted rounded-full">
                      {category}
                    </span>
                  ))}
                  <span className="text-xs py-1 px-2 bg-muted rounded-full">
                    {restaurant.priceLevel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {restaurant.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{restaurant.distance} miles away</span>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {restaurant.offer}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full">
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
}
