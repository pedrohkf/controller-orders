import { ipcMain } from "electron";
import { createOrderItem, editOrder, getAllOrderItems} from "../services/orderItems.service";

export function registerOrderItemIpc() {
    ipcMain.handle("orderItem:create", (_event, data) => {
        createOrderItem(data);
        return { success: true };
    })
}

export function getAllOrderItemsIpc(){
    ipcMain.handle("orderItems:list", () => {
        const orders = getAllOrderItems();
        return orders;
    })
}

export function editOrderItemIpc() {
    ipcMain.handle("orderItem:edit", (_event, data) => {
        editOrder(data);
        return { seccess: true };
    })
}