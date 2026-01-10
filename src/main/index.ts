import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { createTableClients } from '../db/tables/clients'
import { createTableOrders } from '../db/tables/orders'
import { createTableProducts } from '../db/tables/products'

import { db } from '../db/connection'
import { getAllUsersIpc, registerUserIpc } from "../ipc/user.ipc"
import { getAllOrdersIpc, registerOrderIpc, editOrderIpc } from "../ipc/order.ipc"
import { getAllProductsIpc, registerProductIpc, editProductIpc } from "../ipc/product.ipc"

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  createTableClients(db);
  createTableOrders(db);
  createTableProducts(db);

  registerUserIpc();
  getAllUsersIpc();

  getAllOrdersIpc();
  registerOrderIpc();
  editOrderIpc();

  getAllProductsIpc()
  registerProductIpc();
  editProductIpc();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

