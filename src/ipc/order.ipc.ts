import { ipcMain } from "electron";
import { saveCompleteOrder, editOrder, getOrdersPaged } from "../services/orders.service";

export function registerOrderIpc() {
    ipcMain.handle("order:save", async (_event, payload) => {
        try {
            return saveCompleteOrder(payload)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error("Erro ao salvar pedido:", errorMessage);

            return { success: false, error: errorMessage }
        }
    });
}

export function getOrderIpc() {
    ipcMain.handle("order:list", (_event, data) => {
        const page = data?.page || 1;
        const limit = data.limit || 50;
        const status = data?.status || ""

        const result = getOrdersPaged(page, limit, status);
        return result;
    })
}

export function editOrderIpc() {
    ipcMain.handle("order:edit", (_event, data) => {
        editOrder(data);
        return { seccess: true };
    })
}