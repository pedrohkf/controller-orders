export function createTableClients(db) {
    db.exec(`CREATE TABLE IF NOT EXISTS clients(
            clientId INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )`)
}