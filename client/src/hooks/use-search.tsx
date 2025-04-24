import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedCuisine: string | null;
  setSelectedCuisine: (cuisine: string | null) => void;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
};

const initialState: SearchContextProps = {
  searchQuery: "",
  setSearchQuery: () => null,
  selectedArea: "all",
  setSelectedArea: () => null,
  selectedCuisine: null,
  setSelectedCuisine: () => null,
  isSearchActive: false,
  setIsSearchActive: () => null
};

const SearchContext = createContext<SearchContextProps>(initialState);

type SearchProviderProps = {
  children: ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const value = {
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    selectedCuisine,
    setSelectedCuisine,
    isSearchActive,
    setIsSearchActive
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  
  return context;
};