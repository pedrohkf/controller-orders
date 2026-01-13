import { db } from "../db/connection";
import Order from "../renderer/src/shared/types/order";

export function createOrder(data: Order) {
    const insert = db.prepare(`
        INSERT INTO orders (
            reference,
            totalPrice,
            totalPriceBV,
            profitability,
            status
        ) VALUES (?, ?, ?, ?, ?);
        `);
    const result = insert.run(data.reference, data.totalPrice, data.totalPriceBV, data.profitability, data.status);
    const orderId = result.lastInsertRowid
    return orderId;
}

export function getAllOrders() {
    const orders = db.prepare(`
        SELECT * FROM orders
        `)

    const result = orders.all()
    return result;
}

export function editOrder(data: Order) {
    const product = db.prepare(`
        UPDATE orders SET reference = ?, totalPrice = ?, totalPriceBV = ?, profitability = ?, status = ? WHERE orderId = ?
    `)

    const result = product.run(data.reference, data.totalPrice, data.totalPriceBV, data.profitability, data.status, data.orderId)
    return result;
}