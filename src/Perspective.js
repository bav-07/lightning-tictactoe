import { Lightning } from '@lightningjs/sdk'
import Menu from './menu/Menu'

export default class Perspective extends Lightning.Component {
  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'GAME OF SQUIDS', action: 'gameOfSquidsFont', fontFace: 'gameOfSquids' },
          { label: 'PIXEL', action: 'pixelFont', fontFace: 'gameOfSquids' },
          { label: 'SQUARE', action: 'squareFont', fontFace: 'gameOfSquids' },
          { label: 'FROSTBITE', action: 'frostbiteFont', fontFace: 'gameOfSquids' },
        ],
      },
    }
  }

  _getFocused() {
    return this.tag('Menu')
  }

  _handleEnter() {
    this.signal('select', { item: this.tag('Menu').activeItem })
  }

  _handleBack() {
    this.signal('back')
  }

  fontChanged(fontFace) {
    this.tag('Menu').fontChanged(fontFace)
    // this.items.forEach((element) => {
    //   element.patch({ fontFace: fontFace })
    // })
  }
}
