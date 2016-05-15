import { ipcRenderer } from 'electron'
import Vue from 'vue'
import App from './App'

new Vue({
  el: 'body',
  components: { App }
})

let updateOnlineStatus = function () {
  console.log(navigator.onLine ? 'online' : 'offline')
  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
