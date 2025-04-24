import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cuisines } from "@/data/cuisines";

export default function CuisineCategories() {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  
  const handleCuisineClick = (cuisineId: string) => {
    setSelectedCuisine(cuisineId);
    console.log("Selected cuisine:", cuisineId);
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-poppins mb-4 md:mb-0">Popular Cuisines</h2>
          <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline">
            View All <i className="ri-arrow-right-line"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cuisines.map((cuisine) => (
            <Card 
              key={cuisine.id}
              className={`cuisine-card bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer ${selectedCuisine === cuisine.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleCuisineClick(cuisine.id)}
            >
              <div className="h-32 overflow-hidden">
                <img 
                  src={cuisine.imageUrl} 
                  alt={`${cuisine.name} cuisine`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3 text-center">
                <h3 className="font-medium font-poppins">{cuisine.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
