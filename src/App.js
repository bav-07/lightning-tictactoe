import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from './Splash.js'
import Main from './Main.js'
import Game from './Game.js'
import Change from './Change.js'
import About from './About.js'
import Reset from './Reset.js'
import SettingsMenu from './SettingsMenu.js'
import Font from './Font.js'
import Perspective from './Perspective.js'

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: 'gameOfSquids', url: Utils.asset('fonts/gameOfSquids.ttf'), descriptor: {} },
      { family: 'pixel', url: Utils.asset('fonts/pixel.ttf'), descriptor: {} },
      { family: 'squarefont', url: Utils.asset('fonts/squarefont.ttf'), descriptor: {} },
      { family: 'frostbite', url: Utils.asset('fonts/robotech.ttf'), descriptor: {} },
    ]
  }

  static _font = localStorage.getItem('font') ? localStorage.getItem('font') : 'gameOfSquids';
  static _degrees = localStorage.getItem('angle') ? localStorage.getItem('angle') : 0.2;

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
        text: { text: 'TicTacToe', fontFace: App._font, textColor: 0xffff0000 },
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * App._degrees,
          ambient: 0.6,
        },
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { select: 'menuSelect', back: false },
        scale: 1.3,
        x: 200,
        y: -100,
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * App._degrees,
          ambient: 0.3,
        },
      },
      Game: {
        type: Game,
        alpha: 0,
        x: 200,
        signals: { back: true },

      },
      About: {
        type: About,
        alpha: 0,
        x: 200,
        signals: { back: true },
      },
      Change: {
        type: Change,
        alpha: 0,
        x: 200,
        signals: { back: true },
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * App._degrees,
          ambient: 0.3,
        },
      },
      Settings: {
        type: SettingsMenu,
        alpha: 0,
        x: 200,
        signals: { select: 'menuSelect', back: true },
        scale: 1.3,
        x: 200,
        y: -100,
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * App._degrees,
          ambient: 0.3,
        }
      },
      Fonts: {
        type: Font,
        alpha: 0,
        x: 200,
        signals: { select: 'menuSelect', back: true },
        scale: 1.3,
        x: 200,
        y: -100,
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * App._degrees,
          ambient: 0.3,
        }
      },
      Perspective: {
        type: Perspective,
        alpha: 0,
        x: 200,
        signals: { select: 'menuSelect', back: true },
        scale: 1.3,
        x: 200,
        y: -100,
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * App._degrees,
          ambient: 0.3,
        }
      },
      Reset: {
        type: Reset,
        alpha: 0,
        x: 200,
        signals: { back: true }
      }
    }
  }
  _setup() {
    this._setState('Splash')
  }


  _construct() {

    App._template()
  }

  _handleBack() {}

  _init() {
    // create a blinking animation
    this._gamespin = this.tag('Game').animation({
      duration: 1,
      repeat: -1,
      actions: [{ p: 'shader.rx', v: { 0: 0, 0.5: Math.PI, 1: Math.PI * 2 } }],
    })

    // this._gamespin.start()
  }

  fontChanged(fontFace) {
    this.tag('Logo').patch({text: {fontFace}})

    this.tag('Splash').fontChanged(fontFace)
    this.tag('Change').fontChanged(fontFace)
    this.tag('Settings').fontChanged(fontFace)
    this.tag('Fonts').fontChanged(fontFace)
    this.tag('Main').fontChanged(fontFace)
    this.tag('Game').fontChanged(fontFace)
    this.tag('About').fontChanged(fontFace)
    this.tag('Reset').fontChanged(fontFace)

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
          sessionStorage.setItem('aiScore', 0)
          sessionStorage.setItem('playerScore', 0)
          this._setState('Game')
        }
        continue() {
          this._setState('Game')
        }
        about() {
          this._setState('About')
        }
        settings() {
          this._setState('Settings')
        }
        reset() {
          this._setState('Reset')
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
        back() {
          this._setState('Main')
        }
        _getFocused() {
          return this.tag('Game')
        }
      },
      class About extends this {
        $enter() {
          this.tag('About').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('About').setSmooth('alpha', 0)
        }
        back() {
          this._setState('Main')
        }
        _getFocused() {
          return this.tag('About')
        }
      },
      class Settings extends this {
        $enter() {
          this.tag('Settings').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Settings').setSmooth('alpha', 0)
        }
        back() {
          this._setState('Main')
        }
        menuSelect({ item }) {
          if (this._hasMethod(item.action)) {
            return this[item.action]()
          }
        }
        font() {
          this._setState('Fonts')
        }
        _getFocused() {
          return this.tag('Settings')
        }
      },
      class Fonts extends this {
        $enter() {
          this.tag('Fonts').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Fonts').setSmooth('alpha', 0)
        }
        back() {
          this._setState('Settings')
        }
        menuSelect({ item }) {
          if (this._hasMethod(item.action)) {
            return this[item.action]()
          }
        }
        font() {
          this._setState('Change')
        }
        gameOfSquidsFont() {
          this.fontChanged('gameOfSquids')
          localStorage.setItem('font', 'gameOfSquids')
          this._setState('Settings')
        }
        pixelFont() {
          this.fontChanged('pixel')
          localStorage.setItem('font', 'pixel')
          this._setState('Settings')
        }
        squareFont() {
          this.fontChanged('squarefont')
          localStorage.setItem('font', 'squarefont')
          this._setState('Settings')
        }
        frostbiteFont() {
          this.fontChanged('frostbite')
          localStorage.setItem('font', 'frostbite')
          this._setState('Settings')
        }
        _getFocused() {
          return this.tag('Fonts')
        }
      },
      class Change extends this {
        $enter() {
          this.tag('Change').setSmooth('alpha', 1)
          setTimeout(() => {
            if (this.tag('Logo').text.fontFace === 'gameOfSquids') {
              // localStorage.setItem('font', 'pixel')
              // window.location.reload()
              this.fontChanged('pixel')
            } else {
              // localStorage.setItem('font', 'gameOfSquids')
              // window.location.reload()
              this.fontChanged('gameOfSquids')
            }
          }, 0)
        }
        $exit() {
          this.tag('Change').setSmooth('alpha', 0)
        }
        back() {
          this._setState('Main')
        }
        _getFocused() {
          return this.tag('Change')
        }
      },
      class Reset extends this {
        $enter() {
          this.tag('Reset').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Reset').setSmooth('alpha', 0)
        }
        back() {
          this._setState('Main')
        }
        _getFocused() {
          return this.tag('Reset')
        }
      },
    ]
  }
}
