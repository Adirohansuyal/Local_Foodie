import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { useCart, CartItem } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.id);
    toast({
      title: "Item removed",
      description: `${item.name} has been removed from your cart`,
      variant: "default",
    });
  };

  const handleQuantityChange = (item: CartItem, increment: boolean) => {
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return;
    
    updateQuantity(item.id, newQuantity);
  };

  const handleCheckout = () => {
    toast({
      title: "Order placed!",
      description: `Your order has been placed successfully.`,
      variant: "default",
    });
    clearCart();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {cartItems.length === 0 
              ? "Your cart is empty." 
              : `You have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart.`}
          </DialogDescription>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-6">
              Your cart is empty. Add some items to place an order.
            </p>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Continue Browsing
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 my-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border rounded-lg overflow-hidden">
                  <div className="w-20 h-20 shrink-0">
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <span className="font-medium text-sm">{item.price}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item, false)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item, true)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-6">
                <span className="font-medium">Total</span>
                <span className="font-medium">{totalPrice}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}