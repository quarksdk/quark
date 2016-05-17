let Process = require('electron').remote.BrowserWindow
let spawn = require('child_process').spawn
let exec = require('child_process').exec

class CommandManager {

  constructor(command)
  {
    this.command      = command
    this.inSync       = false
    this.inBackground = false
  }

  static make(command)
  {
    return new this(command)
  }

  static executeInForeground(command, callback)
  {
    return new this(command).foreground().execute(callback)
  }

  static executeInBackground(command, callback)
  {
    return new this(command).background().execute(callback)
  }

  background()
  {
    this.inBackground = true

    return this
  }

  foreground()
  {
    this.inBackground = false

    return this
  }

  sync()
  {
    this.inSync = true

    return this
  }

  async()
  {
    this.inSync = false

    return this
  }

  execute(callback)
  {
    if (this.inBackground) {
      this.backgroundProcessCommand(callback)
    } else {
      this.foregroundProcessCommand(callback)
    }
  }

  isRunning()
  {
    return this.command.isRunning()
  }

  hasError()
  {
    return this.command.hasError()
  }

  backgroundProcessCommand(callback)
  {
    let backgroundProcess = new Process()

    backgroundProcess.loadURL('http://google.com')

    backgroundProcess.webContents.on('dom-ready', function () {
      backgroundProcess.webContents.executeJavaScript(function ()
      {
        this.make(this.command).foregroundProcessCommand(callback)
      }, false, function (error) {
        if (error) {
          backgroundProcess.close()
        }
      })
    })

    return backgroundProcess
  }

  foregroundProcessCommand(callback)
  {
    if (this.inSync) {
      this.runSynchronous(callback)
    } else {
      this.runAsynchronous(callback)
    }
  }

  runSynchronous(callback)
  {
    var results = exec(this.command.run(), {cwd: this.command.cwd}, (error, stdout, stderr) => {
      this.command.output(stdout)
      this.command.error(stderr)
      this.command.failed(error)
    })

    if (callback) {
      return callback(results, this.command)
    }

    return results
  }

  runAsynchronous(callback)
  {
    let foregroundProcess = spawn(this.command.run(), [], {cwd: this.command.cwd})

    foregroundProcess.stdout.on('data', data => { this.command.output(data) })
    foregroundProcess.stderr.on('data', data => { this.command.error(data) })
    foregroundProcess.on('close', code => { this.command.finished(code) })
    foregroundProcess.on('error', reason => { this.command.failed(reason) })

    if (callback) {
      foregroundProcess.on('close', code => { callback(code) })
    }

    return foregroundProcess
  }
}

export default CommandManager
