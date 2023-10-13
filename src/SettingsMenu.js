import { Lightning } from '@lightningjs/sdk'
import Menu from './menu/Menu'

export default class SettingsMenu extends Lightning.Component {
  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'FONT', action: 'font', fontFace: 'gameOfSquids' },
          { label: 'BACKGROUND COLOUR', action: 'backcolour', fontFace: 'gameOfSquids' },
          { label: 'PRIMARY COLOUR', action: 'primcolour', fontFace: 'gameOfSquids' },
          { label: 'PERSPECTIVE ANGLE', action: 'perspective', fontFace: 'gameOfSquids' },
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
