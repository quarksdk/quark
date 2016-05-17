import Command from './Command'

class ValetShare extends Command {

  constructor(path)
  {
    super(path)

    this.name = 'ValetShare'
    this.lines.push('valet share')
  }
}

export default ValetShare
