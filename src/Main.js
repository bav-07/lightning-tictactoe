import { Lightning } from '@lightningjs/sdk'
import Menu from './menu/Menu'

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'PLAY', action: 'continue', fontFace: 'gameOfSquids' },
          { label: 'ABOUT', action: 'about', fontFace: 'gameOfSquids' },
          { label: 'SETTINGS', action: 'change', fontFace: 'gameOfSquids' },
          { label: 'RESET DATA', action: 'reset', fontFace: 'gameOfSquids' },
          { label: 'EXIT', action: 'exit', fontFace: 'gameOfSquids' },
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

  fontChanged(fontFace) {
    this.tag('Menu').fontChanged(fontFace)
    // this.items.forEach((element) => {
    //   element.patch({ fontFace: fontFace })
    // })
  }
}
