import React from 'react'
import Order from '@renderer/shared/types/order';

type OrderContextType = {
    orders: Order[];
    createUser: (productId: string, reference: string, amout: number, finalPrice: number, cost: number, customization: string, log: string, discount: number) => Promise<void>;
    editOrder : (productId: string, reference: string, amout: number, finalPrice: number, cost: number, customization: string, log: string, discount: number, orderId: string, ) => Promise<void>;
}

const OrderContext = React.createContext<OrderContextType>(undefined);

export default OrderContext;
