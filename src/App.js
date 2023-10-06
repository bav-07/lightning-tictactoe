import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from './Splash.js'
import Main from './Main.js'

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
        text: { text: 'TicTacToe', fontFace: 'pixel' },
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { select: 'menuSelect' },
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
        _getFocused() {
          return this.tag('Main')
        }
      },
    ]
  }
}
