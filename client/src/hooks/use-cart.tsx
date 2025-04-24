import { createContext, ReactNode, useContext, useState } from "react";

type CartContextType = {
  cart: Set<string>;
  addToCart: (id: string, name: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Set<string>>(new Set());

  const addToCart = (id: string, name: string) => {
    setCart((prev) => {
      const newCart = new Set(prev);
      newCart.add(id);
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = new Set(prev);
      newCart.delete(id);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart(new Set());
  };

  const isInCart = (id: string) => {
    return cart.has(id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: cart.size,
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