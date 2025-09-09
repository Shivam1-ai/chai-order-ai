import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartSidebar = ({ open, onOpenChange }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    onOpenChange(false);
  };

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some delicious food to get started!</p>
            <Button onClick={() => onOpenChange(false)}>
              Browse Restaurants
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Your Cart</SheetTitle>
            <Button variant="ghost" size="sm" onClick={clearCart}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.restaurantName}</p>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  
                  <Badge variant="secondary">{item.quantity}</Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;