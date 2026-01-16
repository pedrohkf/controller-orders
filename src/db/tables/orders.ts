export function createTableOrders(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS orders(
            orderId INTEGER PRIMARY KEY,
            reference TEXT NOT NULL,
            totalPrice INTEGER DEFAULT 0,
            totalPriceBV INTEGER DEFAULT 0,
            profitability INTEGER DEFAULT 0,
            costOrder INETER DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'pendente' CHECK(
                status IN ('pendente', 'finalizado', 'enviado')
            )
        )`)
}