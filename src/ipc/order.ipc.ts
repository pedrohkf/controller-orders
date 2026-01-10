import { ipcMain } from "electron";
import { createOrder, editOrder, getAllOrders} from "../services/orders.service";

export function registerOrderIpc() {
    ipcMain.handle("order:create", (_event, data) => {
        createOrder(data);
        return { success: true };
    })
}

export function getAllOrdersIpc(){
    ipcMain.handle("orders:list", () => {
        const orders = getAllOrders();
        return orders;
    })
}

export function editOrderIpc() {
    ipcMain.handle("order:edit", (_event, data) => {
        editOrder(data);
        return { seccess: true };
    })
}