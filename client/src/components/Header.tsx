import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, ShoppingCart } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-primary text-3xl">
            <i className="ri-restaurant-2-fill"></i>
          </div>
          <h1 className="text-xl font-bold font-poppins text-primary">LocalFoodie</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-medium text-primary">Home</Link>
          <Link href="/explore" className="font-medium hover:text-primary transition-all">Explore</Link>
          <Link href="/contact" className="font-medium hover:text-primary transition-all">Contact</Link>
          
          {/* Cart Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium h-5 w-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
        
        {/* Mobile Navigation Button */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Mobile Cart Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium h-5 w-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="rounded-full hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open mobile menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background shadow-md p-4 md:hidden">
          <div className="flex flex-col space-y-3">
            <Link href="/" className="font-medium text-primary p-2">Home</Link>
            <Link href="/explore" className="font-medium hover:text-primary p-2 transition-all">Explore</Link>
            <Link href="/contact" className="font-medium hover:text-primary p-2 transition-all">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
