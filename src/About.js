import { Lightning } from '@lightningjs/sdk'

export default class About extends Lightning.Component {

  static _font = localStorage.getItem('font') ? localStorage.getItem('font') : 'gameOfSquids';

  static _template() {
    return {
      y: 350,
      text: {
        text: 'Tic-tac-toe, also known as noughts and crosses, is a 2-player game, played in a 3x3 grid in which players take turns marking the squares with X (player 1) or O (player 2). Whichever player gets 3 of their marks in a row (horizontal, vertical or diagonal) wins.',
        w: 1400,
        fontFace: About._font,
        textColor: '0xffff0000',
        fontSize: 29,
      },
    }
  }

  _handleBack() {
    this.signal('back')
  }

  _getFocused() {
    return this.tag('About')
  }

  fontChanged(fontFace) {
    this.patch({ text: { fontFace: fontFace } })
  }
}
