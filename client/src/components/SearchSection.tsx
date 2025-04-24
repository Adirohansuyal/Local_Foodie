import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearch } from "@/hooks/use-search";

export default function SearchSection() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedArea, 
    setSelectedArea,
    setIsSearchActive 
  } = useSearch();

  const handleSearch = () => {
    const area = selectedArea === "all" ? "All Areas" : selectedArea;
    console.log("Searching for:", searchQuery, "in area:", area);
    // Set search as active to filter restaurant list
    setIsSearchActive(true);
  };

  return (
    <section id="explore" className="py-8 bg-muted">
      <div className="container mx-auto px-4">
        <Card className="bg-background rounded-xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">Find Your Favorite Local Food</h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <Search size={18} />
                </div>
                <Input
                  type="text"
                  placeholder="Search for food or restaurants..."
                  className="w-full py-6 pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="md:w-48">
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-full h-[48px]">
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="uptown">Uptown</SelectItem>
                    <SelectItem value="westside">Westside</SelectItem>
                    <SelectItem value="eastside">Eastside</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="py-6 px-6 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
