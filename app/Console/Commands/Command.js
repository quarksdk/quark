const ipc = require('electron').ipcRenderer

class Command {

  constructor(path)
  {
    this.name    = 'Command'
    this.lines   = []
    this.data    = []
    this.running = false
    this.errored = false
    this.cwd     = path
  }

  isRunning()
  {
    return this.running
  }

  hasError()
  {
    return this.errored
  }

  data()
  {
    return this.data
  }

  run()
  {
    this.running = true
    return this.lines.join('; ')
  }

  output(data)
  {
    this.errored   = true
    this.running = true

    if (data instanceof Array) {
      console.log('Array: ' + data)
      this.data = this.data.concat(data)
    } else if (typeof data === 'string') {
      console.log('String: ' + data)
      this.data.push(data.split('\n'))
    } else {
      console.log(typeof data)
      console.log('Other: ' + data)
      this.data.push(data)
    }
  }

  error(data)
  {
    this.errored   = true
    this.running = false

    if (data instanceof Array) {
      this.data = this.data.concat(data)
    } else if (typeof data === 'string') {
      this.data.push(data.split('\n'))
    } else {
      this.data.push(data)
    }
  }

  finished(code)
  {
    this.errored   = false
    this.running = false
    this.data.push('Exited with code ' + code)

    if (code !== 0) {
      ipc.send('did-run-with-error', {
        command: this.name,
        error:   this.data
      })
    } else {
      ipc.send('did-run', {
        command: this.name,
        output:  this.data
      })
    }
  }

  failed(reason)
  {
    this.errored   = true
    this.running = false
    this.data.push('Failed: ' + reason)

    console.dir(this.data)
  }
}

export default Command
