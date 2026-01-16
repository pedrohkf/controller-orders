import { db } from "../db/connection";
import Order from "../renderer/src/shared/types/order";

interface OrderItemInput {
    productId: number;
    finalPrice: number;
    amount: number;
    cost: number;
    customization: number;
    log: number;
    discount: number;
}

interface OrderPayload {
    orderId?: number;
    reference: string;
    profitability: number;
    status: string;
    items: OrderItemInput[];
}

const calculateBV = (item: OrderItemInput) => {
    const rentabilidade = 0.30;
    const imposto = 0.13;
    const over = 0.20;

    return ((item.cost + item.customization + item.log) *
        (1 + rentabilidade) *
        (1 + imposto) *
        (1 + over)) *
        (1 - item.discount / 100);
};

const calculateProfitability = (item: OrderItemInput) => {
    const imposto = 0.13;
    const over = 0.20;

    return ((item.finalPrice / ((item.cost + item.customization + item.log) * (1 + imposto) * (1 + over))) - 1);
}

const calculateCostOrder = (item: OrderItemInput) => {
    return (item.cost + item.customization + item.log) * item.amount;
}

const executeSaveTransaction = db.transaction((payload: OrderPayload) => {
    const { orderId, reference, status, items } = payload;

    let totalPrice = 0;
    let totalPriceBV = 0;
    let sumProfitability = 0;
    let totalCostOrder = 0;

    const processedItems = items.map(item => {
        const finalPriceBV = calculateBV(item);
        const itemProfitability = calculateProfitability(item);
        const costOrder = calculateCostOrder(item);

        totalPrice += (item.amount * item.finalPrice);
        totalPriceBV += (finalPriceBV * item.amount);
        sumProfitability += itemProfitability;
        totalCostOrder += costOrder;

        return { ...item, finalPriceBV, sumProfitability }
    })

    const orderProfitability = items.length > 0 ? (sumProfitability / items.length) : 0;

    let currentId = orderId;

    if (currentId) {
        db.prepare(`UPDATE orders SET reference = ?, totalPrice = ?, totalPriceBV = ?, profitability = ?, costOrder = ?, status = ? WHERE orderId = ?`)
            .run(reference, totalPrice, totalPriceBV, orderProfitability, totalCostOrder, status, currentId);

        db.prepare(`DELETE FROM order_items WHERE orderId = ?`).run(currentId);
    } else {
        const info = db.prepare(`INSERT INTO orders (reference, totalPrice, totalPriceBV, profitability, costOrder, status) VALUES (?, ?, ?, ?, ?, ?)`)
            .run(reference, totalPrice, totalPriceBV, orderProfitability, totalCostOrder, status)
        currentId = info.lastInsertRowid as number;
    }

    const insertItemStmt = db.prepare(`
        INSERT INTO order_items (orderId, productId, amount, finalPrice, finalPriceBV, cost, customization, log, discount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of processedItems) {
        insertItemStmt.run(
            currentId,
            item.productId,
            item.amount,
            item.finalPrice,
            item.finalPriceBV,
            item.cost,
            item.customization,
            item.log,
            item.discount)
    }

    return { success: true, orderId: currentId };
})

export function saveCompleteOrder(payload: OrderPayload) {
    return executeSaveTransaction(payload);
}

export const getOrdersPaged = (page: number = 1, limit: number = 50, status: string) => {
    const offset = (page - 1) * limit;

    let query = `SELECT * FROM orders`;
    let countQuery = `SELECT COUNT(*) as count FROM orders`;
    const params: any[] = [];

    if (status) {
        query += ` WHERE status = ?`;
        countQuery += ` WHERE status = ?`;
        params.push(status);
    }

    query += ` ORDER BY orderId DESC LIMIT ? OFFSET ?`;

    const orders = db.prepare(query).all(...params, limit, offset) as any[];
    const total = db.prepare(countQuery).get(...params) as { count: number };

    const orderIds = orders.map(o => o.orderId);
    let itemsMap = {};

    if (orderIds.length > 0) {
        const placeholders = orderIds.map(() => "?").join(",");
        const allItems = db.prepare(`SELECT * FROM order_items WHERE orderId IN (${placeholders})`)
            .all(...orderIds) as any[]

        itemsMap = allItems.reduce((acc, item) => {
            if (!acc[item.orderId]) acc[item.orderId] = [];
            acc[item.orderId].push(item)
            return acc;
        }, {})
    }

    return {
        orders,
        itemsMap,
        totalPages: Math.ceil(total.count / limit),
        currentPage: page
    }
}

export function editOrder(data: Order) {
    const product = db.prepare(`
        UPDATE orders SET reference = ?, totalPrice = ?, totalPriceBV = ?, profitability = ?, status = ? WHERE orderId = ?
    `)

    const result = product.run(data.reference, data.totalPrice, data.totalPriceBV, data.profitability, data.status, data.orderId)
    return result;
}