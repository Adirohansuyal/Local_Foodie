import { createContext, ReactNode, useContext, useState } from "react";
import { restaurants } from "@/data/restaurants";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  imageUrl?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (id: string, name: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  cartCount: number;
  totalPrice: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (id: string, name: string) => {
    setCartItems((prev) => {
      // Check if item already exists in cart
      if (prev.some(item => item.id === id)) {
        return prev;
      }
      
      // Find restaurant details
      const restaurant = restaurants.find(r => r.id === id);
      
      if (!restaurant) return prev;
      
      // Generate a random price based on the restaurant's price level
      const priceLevel = restaurant.priceLevel.length;
      const basePrice = 5 + (priceLevel * 3);
      const price = `$${basePrice.toFixed(2)}`;
      
      // Add new item with quantity 1
      return [...prev, {
        id,
        name,
        price,
        quantity: 1,
        imageUrl: restaurant.imageUrl
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prev) => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };
  
  // Calculate total price of all items in cart
  const calculateTotalPrice = (): string => {
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + (price * item.quantity);
    }, 0);
    
    return `$${total.toFixed(2)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount: cartItems.length,
        totalPrice: calculateTotalPrice()
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}