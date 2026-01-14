import OrderContext from '@renderer/context/OrderContext';
import { useEffect, useState } from 'react'

import Order from '@renderer/shared/types/order';
import OrderItem from '@renderer/shared/types/orderItem';

const OrderProvider = ({ children }) => {
    const [orders, setOders] = useState<Order[]>([])
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])

    const loadOrders = async () => {
        const orders = await window.electron.ipcRenderer.invoke("orders:list");
        setOders(orders ?? [])
    }

    const loadSpecificOrder = async () => {
        const order = await window.electron.ipcRenderer.invoke("order:list");
        setOders(order ?? [])
    }

    const createOrder = async (reference: string, totalPrice: number, totalPriceBV: number, profitability: number, status: string) => {
        const orderId = await window.electron.ipcRenderer.invoke("order:create", {
            reference,
            totalPrice,
            totalPriceBV,
            profitability,
            status
        })

        loadOrders()
        return Number(orderId);
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

        loadOrders();
    }

    const loadOrderItems = async () => {
        const ordersItems = await window.electron.ipcRenderer.invoke("orderItems:list");
        setOrderItems(ordersItems ?? [])
    }

    const createOrderItem = async (orderId: number, productId: number, amount: number, finalPrice: number, finalPriceBV: number, cost: number, customization: string, log: string, discount: number) => {
        await window.electron.ipcRenderer.invoke("orderItem:create", {
            orderId,
            productId,
            amount,
            finalPrice,
            finalPriceBV,
            cost,
            customization,
            log,
            discount
        })
        
        loadOrderItems()
    }

    const editOrderItem = async (orderId: number, productId: number, amount: number, finalPrice: number, finalPriceBV: number, cost: number, customization: string, log: string, discount: number) => {
        await window.electron.ipcRenderer.invoke("orderItem:edit", {
            productId,
            orderId,
            amount,
            finalPrice,
            finalPriceBV,
            cost,
            customization,
            log,
            discount,
        })

        loadOrderItems();
    }

    useEffect(() => {
        loadOrders();
        loadOrderItems();
    }, [])

    const value = { orders, orderItems, createOrder, createOrderItem, editOrderItem, editOrder, loadSpecificOrder };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider
