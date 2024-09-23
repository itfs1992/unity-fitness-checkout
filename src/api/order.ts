import { OrderDataProds, OrderDataResProds, ResponseCheckoutProds } from '@/types/index';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const postOrder = async (
  orderData: OrderDataProds
): Promise<ResponseCheckoutProds | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Failed to create order');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Error during order creation:', error);

    return null;
  }
};

export const fetchOrderDetails = async (orderId: string): Promise<OrderDataResProds | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Error fetching order details:', error);

    return null;
  }
};
