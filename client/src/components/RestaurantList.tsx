import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { restaurants } from "@/data/restaurants";
import { Heart, ShoppingCart, ThumbsUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearch } from "@/hooks/use-search";
import { cuisines } from "@/data/cuisines";
import { useToast } from "@/hooks/use-toast";

type SortOption = "recommended" | "rating" | "delivery" | "price";

export default function RestaurantList() {
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [likedFoods, setLikedFoods] = useState<Set<string>>(new Set());
  const { searchQuery, selectedArea, selectedCuisine, isSearchActive, setIsSearchActive } = useSearch();
  const { toast } = useToast();
  
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
  
  const toggleCart = (id: string, name: string) => {
    setCart(prev => {
      const newCart = new Set(prev);
      if (newCart.has(id)) {
        newCart.delete(id);
        toast({
          title: "Removed from cart",
          description: `${name} has been removed from your cart`,
          variant: "default",
        });
      } else {
        newCart.add(id);
        toast({
          title: "Added to cart",
          description: `${name} has been added to your cart`,
          variant: "default",
        });
      }
      return newCart;
    });
  };
  
  const toggleLikeFood = (restaurantId: string, foodName: string) => {
    const likeId = `${restaurantId}-${foodName}`;
    setLikedFoods(prev => {
      const newLikedFoods = new Set(prev);
      if (newLikedFoods.has(likeId)) {
        newLikedFoods.delete(likeId);
      } else {
        newLikedFoods.add(likeId);
        toast({
          title: "Food liked",
          description: `You liked ${foodName}`,
          variant: "default",
        });
      }
      return newLikedFoods;
    });
  };
  
  // Filter restaurants based on search criteria
  const filteredRestaurants = useMemo(() => {
    if (!isSearchActive) {
      return restaurants;
    }
    
    return restaurants.filter(restaurant => {
      // Filter by search query
      const matchesQuery = searchQuery 
        ? restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      
      // Filter by area (if not "all")
      const matchesArea = selectedArea === "all" ? true : 
        // This is a simplified area check - in a real app we would match to restaurant.area
        selectedArea === "downtown" ? restaurant.distance <= "1.0" :
        selectedArea === "uptown" ? restaurant.distance > "1.0" && restaurant.distance <= "1.5" :
        selectedArea === "westside" ? restaurant.distance > "1.5" && restaurant.distance <= "2.0" :
        restaurant.distance > "2.0";
      
      // Filter by cuisine
      const matchesCuisine = selectedCuisine 
        ? restaurant.categories.some(category => {
            // Find the selected cuisine name
            const cuisine = cuisines.find(c => c.id === selectedCuisine);
            return cuisine && category.includes(cuisine.name);
          })
        : true;
      
      return matchesQuery && matchesArea && matchesCuisine;
    });
  }, [searchQuery, selectedArea, selectedCuisine, isSearchActive]);
  
  const getSortedRestaurants = () => {
    let sortedList = [...filteredRestaurants];
    
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
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold font-poppins mb-4 md:mb-0">
              {isSearchActive ? "Search Results" : "Local Favorites"}
            </h2>
            {isSearchActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchActive(false)}
                className="mb-4 md:mb-0"
              >
                Clear Search
              </Button>
            )}
          </div>
          
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
        
        {getSortedRestaurants().length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or explore different cuisines.</p>
            <Button 
              variant="default"
              onClick={() => setIsSearchActive(false)}
            >
              View All Restaurants
            </Button>
          </div>
        ) : (
          <>
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
                    
                    {/* Popular dish section with like button */}
                    <div className="mb-4 p-3 border border-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Popular Dish</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleLikeFood(restaurant.id, `${restaurant.categories[0]} Special`)}
                        >
                          <ThumbsUp 
                            className={likedFoods.has(`${restaurant.id}-${restaurant.categories[0]} Special`) ? "fill-blue-500 text-blue-500" : "text-muted-foreground"} 
                            size={16} 
                          />
                        </Button>
                      </div>
                      <p className="text-xs text-foreground font-medium">{restaurant.categories[0]} Special</p>
                      <p className="text-xs text-muted-foreground">Signature dish with local ingredients</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{restaurant.distance} miles away</span>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                        {restaurant.offer}
                      </span>
                    </div>
                    
                    {/* Add to cart button */}
                    <div className="mt-4">
                      <Button
                        variant={cart.has(restaurant.id) ? "default" : "outline"}
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => toggleCart(restaurant.id, restaurant.name)}
                      >
                        {cart.has(restaurant.id) ? (
                          <>
                            <Check size={16} />
                            <span>Added to Cart</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {!isSearchActive && (
              <div className="mt-10 text-center">
                <Button variant="outline" className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full">
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}