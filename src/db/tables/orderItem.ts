export function createTableOrderItem(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS order_items(
            orderItemId INTEGER PRIMARY KEY,
            orderId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            amount INTEGER NOT NULL,
            finalPrice INTEGER NOT NULL,
            finalPriceBV INTEGER DEFAULT 0,
            cost INTEGER NOT NULL,
            customization INTEGER NOT NULL,
            log INTEGER NOT NULL,
            discount INTEGER NOT NULL,
            FOREIGN KEY(orderId) REFERENCES orders(orderId)
            FOREIGN KEY(productId) REFERENCES products(productId)
        )`)
}