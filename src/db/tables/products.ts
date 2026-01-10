export function createTableProducts(db) {
    db.exec(`CREATE TABLE IF NOT EXISTS products(
            productId INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )`)
}