import { db } from "../db/connection";

type User = {
    name: string;
}

export function createUser(data: User) {
    const insert = db.prepare(`
        INSERT INTO users (name) VALUES (?)
        `);

    insert.run(data.name);
}

export function getAllUsers() {
    const users = db.prepare(`
        SELECT name FROM users
        `)

    const result = users.all()
    return result;
}