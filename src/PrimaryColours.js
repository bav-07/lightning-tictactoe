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
          { label: 'RED', action: 'redColour', fontFace: 'gameOfSquids' },
          { label: 'BLUE', action: 'blueColour', fontFace: 'gameOfSquids' },
          { label: 'YELLOW', action: 'yellowColour', fontFace: 'gameOfSquids' },
          { label: 'GREEN', action: 'greenColour', fontFace: 'gameOfSquids' },
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
