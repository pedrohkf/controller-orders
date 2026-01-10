import { ipcMain } from "electron";
import { createUser, getAllUsers} from "../services/client.service";

export function registerUserIpc() {
    ipcMain.handle("user:create", (_event, data) => {
        createUser(data);
        return { success: true };
    })
}

export function getAllUsersIpc(){
    ipcMain.handle("user:list", () => {
        const users = getAllUsers();
        return users;
    })
}