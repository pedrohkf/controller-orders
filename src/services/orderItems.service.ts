import { db } from "../db/connection";
import Order from "../renderer/src/shared/types/order";

export function createOrderItem(data: Order) {
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
    const orders = db.prepare(`
        SELECT * FROM orders_items
        `)

    const result = orders.all()
    return result;
}

export function editOrder(data: Order) {
    const product = db.prepare(`
        UPDATE orders SET productId = ?, reference = ?, amount = ?, finalPrice = ?, finalPriceBV = ?, cost = ?, customization = ?, log = ?, discount = ?, totalPrice = ?, totalPriceBV = ?, profitability = ?, status = ? WHERE orderId = ?
    `)

    console.log("productId:", data.productId);
    console.log("reference:", data.reference);
    console.log("amount:", data.amount);
    console.log("finalPrice:", data.finalPrice);
    console.log("cost:", data.cost);
    console.log("customization:", data.customization);
    console.log("log:", data.log);
    console.log("discount:", data.discount);
    console.log("orderId:", data.orderId);

    const result = product.run(data.productId, data.reference, data.amount, data.finalPrice, data.finalPriceBV, data.cost, data.customization, data.log, data.discount, data.totalPrice, data.totalPriceBV, data.profitability, data.status, data.orderId)
    return result;
}