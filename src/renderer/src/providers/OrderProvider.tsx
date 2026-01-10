import OrderContext from '@renderer/context/OrderContext';
import { useEffect, useState } from 'react'

import Order from '@renderer/shared/types/order';

const OrderProvider = ({ children }) => {
    const [orders, setOders] = useState<Order[]>([])

    const loadOrders = async () => {
        const orders = await window.electron.ipcRenderer.invoke("orders:list");
        setOders(orders)
    }

    const createOrder = async (productId: string, reference: string, amount: number, finalPrice: number, cost: number, customization: string, log: string, discount: number) => {
        await window.electron.ipcRenderer.invoke("order:create", {
            productId,
            reference,
            amount,
            finalPrice,
            cost,
            customization,
            log,
            discount
        })

        setOders(orders)
        loadOrders()
    }

    const editOrder = async (productId: string, reference: string, amount: number, finalPrice: number, cost: number, customization: string, log: string, discount: number, orderId: string, ) => {
        await window.electron.ipcRenderer.invoke("order:edit", {
            productId,
            reference,
            amount,
            finalPrice,
            cost,
            customization,
            log,
            discount,
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
