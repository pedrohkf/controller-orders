import OrderContext from '@renderer/context/OrderContext';
import { useState } from 'react'

import Order from '@renderer/shared/types/order';
import OrderItem from '@renderer/shared/types/orderItem';

const OrderProvider = ({ children }) => {
    const [orders, setOders] = useState<Order[]>([])
    const [orderItems, setOrderItems] = useState<Record<number, OrderItem[]>>({});
    const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });

    const loadOrders = async (page: number = 1, status?: string) => {
        try {
            const response = await window.electron.ipcRenderer.invoke("order:list", {
                page,
                status
            })

            if (response) {
                setOders(response.orders || []);
                setOrderItems(prev => ({...prev, ...response.itemsMap}));
                setPagination({
                    totalPages: response.totalPages,
                    currentPage: response.currentPage
                });
            }
        } catch (error) {
            console.error("Erro ao carregar orderns: " + error)
        }
    }

    const saveOrder = async (payload: { orderId: number, reference: string, status: string, items: any[] }) => {
        const response = await window.electron.ipcRenderer.invoke("order:save", payload)
        loadOrders()
        return response;
    }

    const editOrder = async (orderId: number, reference: string, totalPrice: number, totalPriceBV: number, profitability: number, status: string) => {
        await window.electron.ipcRenderer.invoke("order:edit", {
            orderId,
            reference,
            totalPrice,
            totalPriceBV,
            profitability,
            status,
        })
    }


    const value = { orders, orderItems, pagination, loadOrders, saveOrder, editOrder };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider
