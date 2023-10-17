import { Lightning } from '@lightningjs/sdk'
import Utils from './lib/GameUtils.js'

export default class Game extends Lightning.Component {

  static _font = localStorage.getItem('font') ? localStorage.getItem('font') : 'gameOfSquids';

  static _template() {
    return {
      Game: {
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * 0.2,
          ry: Math.PI * 0.1,
          ambient: 0.6,
          pivotX: 600,
        },
        shader2: {
          type: Lightning.shaders.FadeOut,
          fade: 0,
        },
        PlayerPosition: {
          rect: true,
          w: 250,
          h: 250,
          color: 0x40aaaaff,
          x: 550,
          y: 250,
          mount: 0.5,
          pivot: 0.5,
          rotation: 0,
        },
        Field: {
          x: 400,
          y: 100,

          children: [
            { rect: true, w: 1, h: 5, y: 300, color: 0xffff0000 },
            { rect: true, w: 1, h: 5, y: 600, color: 0xffff0000 },
            { rect: true, h: 1, w: 5, x: 300, y: 0, color: 0xffff0000 },
            { rect: true, h: 1, w: 5, x: 600, y: 0, color: 0xffff0000 },
          ],
        },
        Markers: {
          x: 400,
          y: 100,
          text: { text: '', color: 0xffff0000 },
        },
        ScoreBoard: {
          x: 130,
          y: 170,
          Player: {
            text: {
              text: 'Player ' + sessionStorage.getItem('playerScore'),
              fontSize: 29,
              fontFace: Game._font,
            },
          },
          Ai: {
            x: -5,
            y: 50,
            text: {
              text: 'Computer ' + sessionStorage.getItem('aiScore'),
              fontSize: 29,
              fontFace: Game._font,
            },
          },
        },
      },
      Notification: {
        shader: {
          type: Lightning.shaders.Light3d,
          rx: Math.PI * 0.25,
          ambient: 0.6,
          pivotX: 600,
        },
        x: 100,
        y: 170,
        text: { fontSize: 70, fontFace: Game._font },
        alpha: 0,
      },
    }
  }

  _construct() {
    if (!sessionStorage.getItem('aiScore') || !sessionStorage.getItem('playerScore')) {
      sessionStorage.setItem('aiScore', 0)
      sessionStorage.setItem('playerScore', 0)
    }

    // current player tile index
    this._index = 0

    // computer score
    this._aiScore = Number(sessionStorage.getItem('aiScore'))

    // player score
    this._playerScore = Number(sessionStorage.getItem('playerScore'))
  }

  _active() {
    this._reset()

    // we iterate over the outlines of the field and do a nice
    // transition of the width / height, so it looks like the
    // lines are being drawn realtime.

    this.tag('Field').children.forEach((el, idx) => {
      el.setSmooth(idx < 2 ? 'w' : 'h', 900, { duration: 0.7, delay: idx * 0.15 })
    })
  }

  _reset() {
    // reset tiles
    this._tiles = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']

    // force render
    this.render(this._tiles)

    // change back to rootstate
    this._setState('')

    this.tag('Field').children.forEach((el, idx) => {
      el.setSmooth(idx < 2 ? 'w' : 'h', 900, { duration: 0.7, delay: idx * 0.15 })
    })

    //// swaps who is starting every round, but doesn't yet function as expected - breaks when the computer starts the round and the game ends in a tie
    // if ((this._playerScore + this._aiScore) % 2 === 1) {
    //   this._setState('Computer')
    // }
  }

  render(tiles) {
    this.tag('Markers').children = tiles.map((el, idx) => {
      return {
        x: (idx % 3) * 300 + 85,
        y: ~~(idx / 3) * 300 + 40,
        text: {
          text: el === 'e' ? '' : `${el}`,
          fontSize: 180,
          fontFace: 'gameOfSquids',
          textColor: el === 'X' ? 0xffff0000 : 0xff00ffff,
        },
      }
    })
  }

  _handleUp() {
    let sound = new Audio('./static/audio/BW2MenuSelect.wav')
    sound.play()
    let idx = this._index
    if (idx - 3 >= 0) {
      this._setIndex(idx - 3)
      this.tag('Game').setSmooth('shader.ry', this.tag('Game').shader.ry + Math.PI * 0.1 )
    }
  }

  _handleDown() {
    let sound = new Audio('./static/audio/BW2MenuSelect.wav')
    sound.play()
    let idx = this._index
    if (idx + 3 <= this._tiles.length - 1) {
      this._setIndex(idx + 3)
      this.tag('Game').setSmooth('shader.ry', this.tag('Game').shader.ry - Math.PI * 0.1 )
    }
  }

  _handleLeft() {
    let sound = new Audio('./static/audio/BW2MenuSelect.wav')
    sound.play()
    let idx = this._index
    if (idx % 3) {
      this._setIndex(idx - 1)
      this.tag('Game').setSmooth('shader.rx', this.tag('Game').shader.rx + Math.PI * 0.2 )
    }
  }

  _handleRight() {
    let sound = new Audio('./static/audio/BW2MenuSelect.wav')
    sound.play()
    const newIndex = this._index + 1
    if (newIndex % 3) {
      this._setIndex(newIndex)
      this.tag('Game').setSmooth('shader.rx', this.tag('Game').shader.rx - Math.PI * 0.2 )
      console.log(this.tag('Game').shader.rx)
    }
  }

  _setIndex(idx) {
    this.tag('PlayerPosition').patch({
      smooth: {
        x: (idx % 3) * 300 + 550,
        y: ~~(idx / 3) * 300 + 250,
      },
    })
    this._index = idx
    if (this._index === 4) {
      this.tag('Game').setSmooth('shader2.fade',  20)
      console.log('Hi')
    }
    else {
      this.tag('Game').setSmooth('shader2.fade',  0)

    }
  }

  _handleEnter() {
    if (this._tiles[this._index] === 'e') {
      let sound = new Audio('./static/audio/SFX_PRESS_AB.wav')
      sound.play()
      if (this.place(this._index, 'X')) {
        this._setState('Computer')
      }
    } else {
      let sound = new Audio('./static/audio/SFX_COLLISION.wav')
      sound.play()
      this._enterError.start()
    }
  }

  _handleBack() {
    let sound = new Audio('./static/audio/BW2CloseMenu.wav')
    sound.play()
    this.signal('back')
  }

  place(index, marker) {
    this._tiles[index] = marker
    this.render(this._tiles)
    const winner = Utils.getWinner(this._tiles)
    if (winner) {
      this._setState('End.Winner', [{ winner }])
      return false
    }
    return true
  }

  fontChanged(fontFace) {
    this.tag('ScoreBoard').tag('Player').patch({ text: { fontFace } })
    this.tag('ScoreBoard').tag('Ai').patch({ text: { fontFace } })

    this.tag('Notification').patch({ text: { fontFace } })
  }

  _init() {
    // create a blinking animation
    this._pulsePlayer = this.tag('PlayerPosition').animation({
      duration: 1,
      repeat: -1,
      actions: [
        { p: 'w', v: { 0: 220, 0.25: 240, 0.5: 250, 0.75: 240, 1: 220 } },
        { p: 'h', v: { 0: 220, 0.25: 240, 0.5: 250, 0.75: 240, 1: 220 } },
      ],
    })

    this._enterError = this.tag('PlayerPosition').animation({
      duration: 0.5,
      actions: [
        { p: 'color', v: { 0: 0x40aaaaff, 0.25: 0x40ff7777, 0.75: 0x40ff7777, 1: 0x40aaaaff } },
        {
          p: 'rotation',
          v: { 0: 0, 0.125: 0.1, 0.375: -0.1, 0.5: 0, 0.625: 0.1, 0.875: -0.1, 1: 0 },
        },
      ],
    })

    this._pulsePlayer.start()
  }

  static _states() {
    return [
      class Computer extends this {
        $enter() {
          const position = Utils.AI(this._tiles)
          if (position === -1) {
            this._setState('End.Tie')
            return false
          }
          // this.tag('Game').setSmooth('shader.rx', Math.PI * -0.2)
          setTimeout(() => {
            if (this.place(position, '0')) {
              this._setState('')
            }
          }, ~~(Math.random() * 1200) + 200)
          this.tag('PlayerPosition').setSmooth('alpha', 0)
        }

        //make sure we don't handle any keypresses when the computer is playing
        _captureKey() {}

        $exit() {
          this.tag('PlayerPosition').setSmooth('alpha', 1)
          // this.tag('Game').setSmooth('shader.rx', Math.PI * 0.2)
        }
      },
      class End extends this {
        _handleEnter() {
          this._reset()
        }
        $exit() {
          this.tag('Field').children.forEach((el, idx) => {
            el.setSmooth(idx < 2 ? 'w' : 'h', 900, { duration: 0.7, delay: idx * 0.15 })
          })
          this.patch({
            Game: {
              smooth: { alpha: 1 },
            },
            Notification: {
              text: { text: '' },
              smooth: { alpha: 0 },
            },
          })
        }
        static _states() {
          return [
            class Winner extends this {
              $enter(args, { winner }) {
                if (winner === 'X') {
                  this._playerScore += 1
                } else {
                  this._aiScore += 1
                }
                this.tag('Field').children.forEach((el, idx) => {
                  el.setSmooth(idx < 2 ? 'w' : 'h', 1, { duration: 0.7, delay: idx * 0.15 })
                })

                sessionStorage.setItem('aiScore', Number(this._aiScore))
                sessionStorage.setItem('playerScore', Number(this._playerScore))

                this.patch({
                  Game: {
                    smooth: { alpha: 0 },
                    ScoreBoard: {
                      Player: { text: { text: `Player ${this._playerScore}` } },
                      Ai: { text: { text: `Computer ${this._aiScore}` } },
                    },
                  },
                  Notification: {
                    text: {
                      text: `${
                        winner === 'X' ? 'Player' : 'Computer'
                      } wins (press enter to continue)`,
                    },
                    smooth: { alpha: 1 },
                  },
                })
              }
            },
            class Tie extends this {
              $enter() {
                this.tag('Field').children.forEach((el, idx) => {
                  el.setSmooth(idx < 2 ? 'w' : 'h', 1, { duration: 0.7, delay: idx * 0.15 })
                })
                this.patch({
                  Game: {
                    smooth: { alpha: 0 },
                  },
                  Notification: {
                    text: { text: 'Tie :( (press enter to try again))' },
                    smooth: { alpha: 1 },
                  },
                })
              }
            },
          ]
        }
      },
    ]
  }
}
