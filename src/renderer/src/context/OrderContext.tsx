import React from 'react'
import Order from '@renderer/shared/types/order';

type OrderContextType = {
    orders: Order[];
    createUser: (productId: string, reference: string, amount: number, finalPrice: number, finalPriceBV: number, cost: number, customization: string, log: string, discount: number, totalPrice: number, totalPriceBV: number, profitability: number, status: string) => Promise<void>;
    editOrder : (productId: string, reference: string, amount: number, finalPrice: number, finalPriceBV: number, cost: number, customization: string, log: string, discount: number, totalPrice: number, totalPriceBV: number, profitability: number, status: string, orderId: string, ) => Promise<void>;
}

const OrderContext = React.createContext<OrderContextType>(undefined);

export default OrderContext;
