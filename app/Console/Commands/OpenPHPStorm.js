import Command from './Command'

class OpenPHPStorm extends Command {

  constructor(path)
  {
    super(path)

    this.cwd  = undefined
    this.name = 'OpenPHPStorm'
    this.lines.push('/Applications/PhpStorm.app/Contents/MacOS/phpstorm ' + path)
  }
}

export default OpenPHPStorm
