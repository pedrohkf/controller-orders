import { ipcMain } from "electron";
import { createOrderItem, editOrderItem} from "../services/orderItems.service";

export function registerOrderItemIpc() {
    ipcMain.handle("orderItem:create", (_event, data) => {
        createOrderItem(data);
        return { success: true };
    })
}

export function editOrderItemIpc() {
    ipcMain.handle("orderItem:edit", (_event, data) => {
        editOrderItem(data);
        return { seccess: true };
    })
}