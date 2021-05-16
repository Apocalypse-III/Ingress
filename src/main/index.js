import { app, BrowserWindow, ipcMain } from 'electron'
import fs from "fs"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 创建数据目录
const dir = app.getPath('documents') + '/ingress'
if (! fs.existsSync(dir)) fs.mkdirSync(dir)

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   *
   * transparent 为 true 时，electron 检测不到最大化、全屏状态，isMaximized、isSimpleFullScreen、isFullScreen 恒为 false
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 900,
    minHeight: 600,
    minWidth: 900,
    useContentSize: true,
    frame: false,
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.webContents.closeDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('close-app', () => {
  app.quit()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
