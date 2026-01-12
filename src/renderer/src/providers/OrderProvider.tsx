import OrderContext from '@renderer/context/OrderContext';
import { useEffect, useState } from 'react'

import Order from '@renderer/shared/types/order';

const OrderProvider = ({ children }) => {
    const [orders, setOders] = useState<Order[]>([])

    const loadOrders = async () => {
        const orders = await window.electron.ipcRenderer.invoke("orders:list");
        setOders(orders)
    }

    const createOrder = async (productId: string, reference: string, amount: number, finalPrice: number, finalPriceBV: number, cost: number, customization: string, log: string, discount: number, totalPrice: number, totalPriceBV: number, profitability: number, status: string) => {
        await window.electron.ipcRenderer.invoke("order:create", {
            productId,
            reference,
            amount,
            finalPrice,
            finalPriceBV,
            cost,
            customization,
            log,
            discount,
            totalPrice,
            totalPriceBV,
            profitability,
            status
        })

        setOders(orders)
        loadOrders()
    }

    const editOrder = async (productId: string, reference: string, amount: number, finalPrice: number, finalPriceBV: number, cost: number, customization: string, log: string, discount: number, totalPrice: number, totalPriceBV: number, profitability: number, status: string, orderId: string, ) => {
        await window.electron.ipcRenderer.invoke("order:edit", {
            productId,
            reference,
            amount,
            finalPrice,
            finalPriceBV,
            cost,
            customization,
            log,
            discount,
            totalPrice,
            totalPriceBV,
            profitability,
            status,
            orderId,
        })

        loadOrders();
    }

    useEffect(() => {
        loadOrders();
    }, [])

    const value = { orders, createOrder, editOrder };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider
