import { Lightning } from '@lightningjs/sdk'
export default class Game extends Lightning.Component {
  static _template() {
    return {
      Game: {
        PlayerPosition: {
          rect: true,
          w: 250,
          h: 250,
          color: 0x40ffffff,
          x: 425,
          y: 125,
        },
        Field: {
          x: 400,
          y: 100,
          children: [
            { rect: true, w: 1, h: 5, y: 300 },
            { rect: true, w: 1, h: 5, y: 600 },
            { rect: true, h: 1, w: 5, x: 300, y: 0 },
            { rect: true, h: 1, w: 5, x: 600, y: 0 },
          ],
        },
        Markers: {
          x: 400,
          y: 100,
        },
        ScoreBoard: {
          x: 100,
          y: 170,
          Player: {
            text: { text: 'Player 0', fontSize: 29, fontFace: 'Pixel' },
          },
          Ai: { y: 40, text: { text: 'Computer 0', fontSize: 29, fontFace: 'Pixel' } },
        },
      },
      Notification: {
        x: 100,
        y: 170,
        text: { fontSize: 70, fontFace: 'Pixel' },
        alpha: 0,
      },
    }
  }

  _construct() {
    // current player tile index
    this._index = 0

    // computer score
    this._aiScore = 0

    // player score
    this._playerScore = 0
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
  }
}
