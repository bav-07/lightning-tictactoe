import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from './Splash.js'
import Main from './Main.js'
import Game from './Game.js'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'pixel', url: Utils.asset('fonts/pixel.ttf'), descriptor: {} }]
  }
  static _template() {
    return {
      rect: true,
      color: 0xff000000,
      w: 1920,
      h: 1080,
      Splash: {
        type: Splash,
        signals: { loaded: true },
        alpha: 0,
      },
      Logo: {
        x: 100,
        y: 100,
        text: { text: 'TicTacToe', fontFace: 'pixel', textColor: 0xffff0000 },
        shader: { type: Lightning.shaders.Light3d, rx: Math.PI * 0.25, ambient: 0.6 },
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { select: 'menuSelect' },
        scale: 1.3,
        x: 200,
        y: -100,
        shader: { type: Lightning.shaders.Light3d, rx: Math.PI * 0.25, ambient: 0.3 },
      },
      Game: {
        type: Game,
        alpha: 0,
        x: 200,
        shader: { type: Lightning.shaders.Light3d, rx: Math.PI * 0.25, ambient: 0.6 },
      },
    }
  }
  _setup() {
    this._setState('Splash')
  }
  static _states() {
    return [
      class Splash extends this {
        $enter() {
          this.tag('Splash').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Splash').setSmooth('alpha', 0)
        }
        loaded() {
          this._setState('Main')
        }
      },
      class Main extends this {
        $enter() {
          this.tag('Main').patch({ smooth: { alpha: 1, y: 0 } })
        }
        $exit() {
          this.tag('Main').patch({ smooth: { alpha: 0, y: 100 } })
        }
        menuSelect({ item }) {
          if (this._hasMethod(item.action)) {
            return this[item.action]()
          }
        }
        start() {
          this._setState('Game')
        }
        _getFocused() {
          return this.tag('Main')
        }
      },
      class Game extends this {
        $enter() {
          this.tag('Game').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Game').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Game')
        }
      },
    ]
  }
}
