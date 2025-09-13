import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { supabase } from '@/integrations/supabase/client';

interface TrackingUpdate {
  id: string;
  status: string;
  message: string;
  created_at: string;
  estimated_time?: number;
}

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, fetchOrders } = useOrder();
  const [trackingUpdates, setTrackingUpdates] = useState<TrackingUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const order = orderId ? getOrder(orderId) : null;

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
      fetchTrackingUpdates();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    await fetchOrders();
  };

  const fetchTrackingUpdates = async () => {
    if (!orderId) return;

    try {
      const { data, error } = await supabase
        .from('delivery_tracking')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrackingUpdates(data || []);
    } catch (error) {
      console.error('Error fetching tracking updates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'secondary';
      case 'confirmed':
        return 'default';
      case 'preparing':
        return 'default';
      case 'out_for_delivery':
        return 'default';
      case 'delivered':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order not found</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
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
          {/* Order Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{order.id.slice(-8)}</span>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Estimated Delivery</span>
                    </div>
                    <span className="font-medium">
                      {order.estimated_delivery_time ? `${order.estimated_delivery_time} mins` : 'TBD'}
                    </span>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-1" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">
                        {order.delivery_address.street}, {order.delivery_address.area}<br />
                        {order.delivery_address.city}, {order.delivery_address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingUpdates.map((update, index) => (
                    <div key={update.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-primary' : 'bg-muted'
                        }`} />
                        {index < trackingUpdates.length - 1 && (
                          <div className="w-px h-8 bg-muted mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{update.status}</h4>
                        <p className="text-sm text-muted-foreground">{update.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(update.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Restaurant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{order.restaurant_name}</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.item_id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.item_name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">₹{item.total_price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{order.total_amount - order.delivery_fee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹{order.delivery_fee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{order.total_amount}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Payment:</strong> {order.payment_method.toUpperCase()}</p>
                  <p><strong>Status:</strong> {order.payment_status.toUpperCase()}</p>
                </div>

                {order.special_instructions && (
                  <div>
                    <p className="font-medium text-sm mb-1">Special Instructions</p>
                    <p className="text-sm text-muted-foreground">{order.special_instructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;