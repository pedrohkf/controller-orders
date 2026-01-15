import { db } from "../db/connection";
import OrderItem from "../renderer/src/shared/types/orderItem";

export function createOrderItem(data: OrderItem) {
    const insert = db.prepare(`
        INSERT INTO order_items (
            orderId,
            productId,
            amount,
            finalPrice,
            finalPriceBV,
            cost,
            customization,
            log,
            discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
    insert.run(data.orderId, data.productId, data.amount, data.finalPrice, data.finalPriceBV, data.cost, data.customization, data.log, data.discount);
}

export function getOrderItemsByOrderId(orderId: number): OrderItem[] {
    const stmt = db.prepare(`
        SELECT 
        order_item.orderItemId
            order_items.amount, 
            order_items.finalPrice, 
            order_items.finalPriceBV, 
            order_items.cost, 
            order_items.customization, 
            order_items.log, 
            order_items.discount,
            products.name AS productName
            FROM order_items 
            LEFT JOIN products 
            ON order_items.productId = products.productId
            WHERE order_items.orderId = ?
        `)

    const result = stmt.all(orderId) as OrderItem[]
    return result || [];
}

export function editOrderItem(data: OrderItem) {
    const orderItem = db.prepare(`
        UPDATE order_items SET productId = ?, amount = ?, finalPrice = ?, finalPriceBV = ?, cost = ?, customization = ?, log = ?, discount = ? WHERE orderItemId = ?
    `)

    const result = orderItem.run(data.productId, data.amount, data.finalPrice, data.finalPriceBV, data.cost, data.customization, data.log, data.discount, data.orderItemId)
    return result;
}