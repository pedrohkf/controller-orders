import { db } from "../db/connection";

type User = {
    name: string;
}

export function createUser(data: User) {
    const insert = db.prepare(`
        INSERT INTO clients (name) VALUES (?)
        `);

    insert.run(data.name);
}

export function getAllUsers() {
    const users = db.prepare(`
        SELECT name FROM clients
        `)

    const result = users.all()
    return result;
}