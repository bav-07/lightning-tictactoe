import { Lightning } from '@lightningjs/sdk'
import Menu from './menu/Menu'

export default class Font extends Lightning.Component {
  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'RED', action: 'gameOfSquidsFont', fontFace: 'gameOfSquids' },
          { label: 'BLUE', action: 'pixelFont', fontFace: 'gameOfSquids' },
          { label: 'YELLOW', action: 'squareFont', fontFace: 'gameOfSquids' },
          { label: 'GREEN', action: 'frostbiteFont', fontFace: 'gameOfSquids' },
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
