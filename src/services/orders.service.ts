import { db } from "../db/connection";
import Order from "../renderer/src/shared/types/order";

export function createOrder(data: Order) {
    const insert = db.prepare(`
        INSERT INTO orders (
            productId,
            reference,
            amount,
            finalPrice,
            cost,
            customization,
            log,
            discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `);

    console.log(data.productId)

    insert.run(data.productId, data.reference, data.amount, data.finalPrice, data.cost, data.customization, data.log, data.discount);
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
        UPDATE orders SET productId = ?, reference = ?, amount = ?, finalPrice = ?, cost = ?, customization = ?, log = ?, discount = ? WHERE orderId = ?
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


    const result = product.run(data.productId, data.reference, data.amount, data.finalPrice, data.cost, data.customization, data.log, data.discount, data.orderId)
    return result;
}