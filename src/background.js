'use strict'

import {app, protocol, BrowserWindow, Menu, dialog} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

const log = require('electron-log')
const isDevelopment = process.env.NODE_ENV !== 'production'
const {autoUpdater} = require('electron-updater')
log.info('启用日志')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])
var win
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1294,
    height: 800,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  Menu.setApplicationMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    autoUpdater.checkForUpdates()
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
//
// autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['Restart', 'Later'],
//     title: 'Application Update',
//     message: process.platform === 'win32' ? releaseNotes : releaseName,
//     detail: 'A new version has been downloaded. Restart the application to apply the updates.'
//   }
//
//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) autoUpdater.quitAndInstall()
//   })
// })
//
// autoUpdater.on('error', message => {
//   console.error('There was a problem updating the application')
//   console.error(message)
// })

// ======================================================================
// 更新模块
// ======================================================================
if (!process.env.WEBPACK_DEV_SERVER_URL) {
  autoUpdater.autoDownload = false

  // autoUpdater.signals.updateDownloaded(() => {})
  autoUpdater.on('error', (error) => {
    log.warn('检查更新失败: ' + error == null ? 'unknown' : (error.stack || error).toString())
    dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString())
  })

  autoUpdater.on('update-available', (info) => {
    // var appInfo = {
    //   info: info.version,
    //   files: info.files,
    //   path: info.path,
    //   sha512: info.sha512,
    //   releaseDate: info.releaseDate
    // }
    console.log(info)
    dialog.showMessageBox({
      type: 'info',
      title: '更新提示',
      message: '软件需要更新，您是否立即更新？',
      buttons: ['推迟', '立即更新']
    }).then((res) => {
      log.warn('index:' + res.response)
      if (res.response === 1) {
        log.warn('选择升级')
        autoUpdater.downloadUpdate()
      } else {
        log.warn('选择不升级:')
      }
    })
  })

  // 检查更新时触发
  autoUpdater.on('update-available', (res) => {
    log.warn('检查更新时触发')
    log.warn(res)
    // dialog.showMessageBox({
    //   title: '检查更新',
    //   message: '正在检查更新'
    // })
  })

  // 没有可用更新
  autoUpdater.on('update-not-available', () => {
    log.warn('没有可用更新')
    // dialog.showMessageBox({
    //   title: '已是最新版',
    //   message: '当前版本是最新版本。'
    // })
  })

  // 安装更新
  autoUpdater.on('update-downloaded', (res) => {
    log.warn(res)
    // console.log(res)
    log.warn('下载完毕！提示安装更新')
    dialog.showMessageBox({
      title: '升级提示！',
      message: '已自动升级为最新版，请重启应用！'
    }, () => {
      log.warn('确认安装')
      setImmediate(() => autoUpdater.quitAndInstall(true, true))
    })
  })

  //下载进度
  // autoUpdater.on('download-progress', (event) => {
  //   log.warn(event.percent)
  // })
  autoUpdater.on('download-progress', (event) => {
    log.warn(event.percent)
    dialog.showMessageBox({
      title: 'downloadProgress',
      message: event.percent.toString().slice(0, 5)
    })
  })
}

