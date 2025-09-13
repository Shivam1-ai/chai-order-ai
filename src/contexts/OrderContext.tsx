import React, { createContext, useContext, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DeliveryAddress {
  street: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
}

interface OrderItem {
  item_id: string;
  item_name: string;
  item_price: number;
  quantity: number;
  total_price: number;
}

interface Order {
  id: string;
  restaurant_id: string;
  restaurant_name: string;
  status: string;
  total_amount: number;
  delivery_fee: number;
  delivery_address: DeliveryAddress;
  payment_method: string;
  payment_status: string;
  estimated_delivery_time?: number;
  special_instructions?: string;
  created_at: string;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  createOrder: (orderData: {
    restaurant_id: string;
    restaurant_name: string;
    items: OrderItem[];
    total_amount: number;
    delivery_fee: number;
    delivery_address: DeliveryAddress;
    payment_method: string;
    special_instructions?: string;
  }) => Promise<string | null>;
  fetchOrders: () => Promise<void>;
  getOrder: (orderId: string) => Order | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const createOrder = async (orderData: {
    restaurant_id: string;
    restaurant_name: string;
    items: OrderItem[];
    total_amount: number;
    delivery_fee: number;
    delivery_address: DeliveryAddress;
    payment_method: string;
    special_instructions?: string;
  }): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to place an order",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          restaurant_id: orderData.restaurant_id,
          restaurant_name: orderData.restaurant_name,
          total_amount: orderData.total_amount,
          delivery_fee: orderData.delivery_fee,
          delivery_address: orderData.delivery_address as any,
          payment_method: orderData.payment_method,
          special_instructions: orderData.special_instructions,
          estimated_delivery_time: 30 // Default 30 minutes
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItemsData = orderData.items.map(item => ({
        order_id: order.id,
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        quantity: item.quantity,
        total_price: item.total_price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData);

      if (itemsError) throw itemsError;

      // Add initial tracking entry
      await supabase
        .from('delivery_tracking')
        .insert({
          order_id: order.id,
          status: 'Order Placed',
          message: 'Your order has been placed successfully'
        });

      toast({
        title: "Order Placed Successfully",
        description: `Order #${order.id.slice(-8)} has been placed`,
      });

      await fetchOrders();
      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order Failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const ordersWithItems = ordersData.map(order => ({
        ...order,
        delivery_address: order.delivery_address as unknown as DeliveryAddress,
        items: order.order_items || []
      }));

      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getOrder = (orderId: string): Order | null => {
    return orders.find(order => order.id === orderId) || null;
  };

  return (
    <OrderContext.Provider value={{
      orders,
      isLoading,
      createOrder,
      fetchOrders,
      getOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};