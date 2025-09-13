import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, CreditCard, Smartphone, Wallet, Banknote } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { createOrder, isLoading } = useOrder();
  const { user } = useAuth();
  const { toast } = useToast();

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: user?.addresses?.[0]?.street || '',
    area: user?.addresses?.[0]?.area || '',
    city: user?.addresses?.[0]?.city || '',
    pincode: user?.addresses?.[0]?.pincode || '',
    landmark: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const deliveryFee = 25;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Please Login",
        description: "You need to login to place an order",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart",
        variant: "destructive"
      });
      return;
    }

    if (!deliveryAddress.street || !deliveryAddress.area || !deliveryAddress.city || !deliveryAddress.pincode) {
      toast({
        title: "Address Required",
        description: "Please fill in your delivery address",
        variant: "destructive"
      });
      return;
    }

    // Group items by restaurant
    const restaurantGroups = items.reduce((acc, item) => {
      if (!acc[item.restaurantId]) {
        acc[item.restaurantId] = {
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
          items: []
        };
      }
      acc[item.restaurantId].items.push({
        item_id: item.id,
        item_name: item.name,
        item_price: item.price,
        quantity: item.quantity,
        total_price: item.price * item.quantity
      });
      return acc;
    }, {} as any);

    // Create orders for each restaurant
    for (const group of Object.values(restaurantGroups) as any[]) {
      const groupTotal = group.items.reduce((sum: number, item: any) => sum + item.total_price, 0);
      
      const orderId = await createOrder({
        restaurant_id: group.restaurantId,
        restaurant_name: group.restaurantName,
        items: group.items,
        total_amount: groupTotal + deliveryFee,
        delivery_fee: deliveryFee,
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
        special_instructions: specialInstructions
      });

      if (orderId) {
        clearCart();
        navigate(`/order/${orderId}`);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={deliveryAddress.street}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                      placeholder="Enter street address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area</Label>
                    <Input
                      id="area"
                      value={deliveryAddress.area}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, area: e.target.value }))}
                      placeholder="Enter area"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={deliveryAddress.landmark}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, landmark: e.target.value }))}
                    placeholder="Enter landmark"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center cursor-pointer">
                      <Smartphone className="w-4 h-4 mr-2" />
                      UPI
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                      <Wallet className="w-4 h-4 mr-2" />
                      Digital Wallet
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center cursor-pointer">
                      <Banknote className="w-4 h-4 mr-2" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Special Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special instructions for delivery..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.restaurantName} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder} 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Placing Order...' : `Place Order • ₹${total}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;