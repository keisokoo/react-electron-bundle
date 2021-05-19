const electron = require('electron')
const { ipcMain, dialog } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)
  dialog
    .showOpenDialog({
      properties: ['openDirectory', 'multiSelections'],
    })
    .then((res) => {
      event.reply('asynchronous-reply', res.filePaths)
    })
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log('init', arg) // prints "ping"
  event.returnValue = 'pong'
})
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')

const isEnvSet = 'ELECTRON_IS_DEV' in process.env
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1

const isDev = isEnvSet ? getFromEnv : !app.isPackaged

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => (mainWindow = null))
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
// Stop error
app.allowRendererProcessReuse = true
