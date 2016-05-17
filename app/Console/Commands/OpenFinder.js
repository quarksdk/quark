import Command from './Command'

class OpenFinder extends Command {

  constructor(path)
  {
    super(path)

    this.cwd  = undefined
    this.name = 'OpenFinder'
    this.lines.push('open ' + path)
  }
}

export default OpenFinder
