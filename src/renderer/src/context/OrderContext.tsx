import React from 'react'
import Order from '@renderer/shared/types/order';
import OrderItem from '@renderer/shared/types/orderItem';

type OrderContextType = {
    orders: Order[];
    orderItems: OrderItem[];

    createOrder: (
        reference: string,
        totalPrice: number,
        totalPriceBV: number,
        profitability: number,
        status: string
    ) => Promise<number>;

    createOrderItem: (
        orderId: number,
        productId: string,
        amount: number,
        finalPrice: number,
        finalPriceBV: number,
        cost: number,
        customization: string,
        log: string,
        discount: number
    ) => Promise<void>;

    editOrder: (
        orderId: number,
        reference: string,
        totalPrice: number,
        totalPriceBV: number,
        profitability: number,
        status: string
    ) => Promise<void>;

    editOrderItem: (
        orderItemId: number,
        productId: number,
        amount: number,
        finalPrice: number,
        finalPriceBV: number,
        cost: number,
        customization: string,
        log: string,
        discount: number
    ) => Promise<void>;
};



const OrderContext = React.createContext<OrderContextType | undefined>(undefined);

export default OrderContext;
