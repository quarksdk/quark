const path = require('path')
const Electron = require('electron').app
const Tray = require('electron').Tray
const Menu = require('electron').Menu
const ipcMain = require('electron').ipcMain

let Quark = null
let TrayIcon = null
// let iconTemplate = require('../resources/images/tray-iconTemplate.png')
// let iconAlt = require('../resources/images/tray-icon-alt.png')

Electron.on('ready', function () {
  if (process.platform === 'darwin') {
    TrayIcon = new Tray(path.resolve('resources/images/tray-iconTemplate.png'))
  } else {
    TrayIcon = new Tray(path.resolve('resources/images/tray-icon-alt.png'))
  }
  TrayIcon.setToolTip('Quark')
  TrayIcon.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Quark',
        enabled: false
      },
      {
        label: 'Settings',
        enabled: false
      },
      {
        label: 'Quit',
        click: function () {
          Electron.quit()
        }
      }
    ])
  )

  let Screen = require('electron').screen
  let BrowserWindow = require('electron').BrowserWindow
  let size = Screen.getPrimaryDisplay().workAreaSize
  Quark = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    titleBarStyle: 'hidden',
    width: Math.ceil(size.width / 2),
    height: Math.ceil(size.height / 2)
  })
  // Quark.loadURL(path.join('file://', path.resolve('build/index.html')))
  Quark.loadURL('http://localhost:8080')

  ipcMain.on('quit', function () {
    Electron.quit()
  })

  ipcMain.on('online-status-changed', function (event, status) {
    console.log(status)
  })
})
