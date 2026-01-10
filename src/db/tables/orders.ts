export function createTableOrders(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS orders(
            orderId INTEGER PRIMARY KEY,
            productId TEXT NOT NULL,
            reference TEXT NOT NULL,
            amount INTEGER NOT NULL,
            finalPrice INTEGER NOT NULL,
            finalPriceBV INTEGER DEFAULT 0,
            cost INTEGER NOT NULL,
            customization INTEGER NOT NULL,
            log INTEGER NOT NULL,
            discount INTEGER NOT NULL,
            totalPrice INTEGER DEFAULT 0,
            totalPriceBV INTEGER DEFAULT 0,
            profitability INTEGER DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'pendente' CHECK(
                status IN ('pendente', 'finalizado', 'enviado')
            ),
            FOREIGN KEY(productId) REFERENCES products(productId)
        )`)
}