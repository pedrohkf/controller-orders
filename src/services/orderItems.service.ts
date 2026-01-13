import { db } from "../db/connection";
import Order from "../renderer/src/shared/types/order";
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

export function getAllOrderItems() {
    const orderItems = db.prepare(`
        SELECT * FROM order_items
        `)

    const result = orderItems.all()
    return result;
}

export function editOrderItem(data: OrderItem) {
    const orderItem = db.prepare(`
        UPDATE order_items SET productId = ?, amount = ?, finalPrice = ?, finalPriceBV = ?, cost = ?, customization = ?, log = ?, discount = ?, WHERE orderItemId = ?
    `)

    const result = orderItem.run(data.productId, data.amount, data.finalPrice, data.finalPriceBV, data.cost, data.customization, data.log, data.discount, data.orderItemId)
    return result;
}