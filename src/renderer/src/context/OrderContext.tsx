import React from 'react'
import Order from '@renderer/shared/types/order';
import OrderItem from '@renderer/shared/types/orderItem';

type PaginationInfo = {
    totalPages: number;
    currentPage: number;
};

type OrderContextType = {
    orders: Order[];
    orderItems: Record<number, OrderItem[]>;
    pagination: PaginationInfo;

    loadOrders: (page?: number, status?: string) => Promise<void>;

    saveOrder: (
        payload: { orderId: number, reference: string, status: string, items: any[] }
    ) => Promise<any>;


    editOrder: (
        orderId: number,
        reference: string,
        totalPrice: number,
        totalPriceBV: number,
        profitability: number,
        status: string
    ) => Promise<void>;
};



const OrderContext = React.createContext<OrderContextType | undefined>(undefined);

export default OrderContext;
