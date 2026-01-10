import { db } from "../db/connection";

type Product = {
    productId: string;
    name: string;
}

export function createProduct(data: Product) {
    const insert = db.prepare(`
        INSERT INTO products (name) VALUES (?)
        `);

    insert.run(data.name);
}

export function getAllProducts() {
    const products = db.prepare(`
        SELECT name, productId FROM products
    `)

    const result = products.all()
    return result;
}

export function editProduct(data: Product) {
    const product = db.prepare(`
        UPDATE products SET name = ? WHERE productId = ?
    `)

    const result = product.run(data.name, data.productId)
    return result;
}