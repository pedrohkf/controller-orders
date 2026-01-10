import { ipcMain } from "electron";
import { createProduct, getAllProducts, editProduct } from "../services/product.service";

export function registerProductIpc() {
    ipcMain.handle("product:create", (_event, data) => {
        createProduct(data);
        return { success: true };
    })
}

export function getAllProductsIpc() {
    ipcMain.handle("product:list", () => {
        const products = getAllProducts();
        return products;
    })
}

export function editProductIpc() {
    ipcMain.handle("product:edit", (_event, data) => {
        editProduct(data);
        return { seccess: true };
    })
}