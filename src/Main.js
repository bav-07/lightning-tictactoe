import { Lightning } from '@lightningjs/sdk'
import Menu from './menu/Menu'

export default class Main extends Lightning.Component {

  static _font = localStorage.getItem('font') ? localStorage.getItem('font') : 'gameOfSquids';

  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'PLAY', action: 'continue', fontFace: Main._font },
          { label: 'ABOUT', action: 'about', fontFace: Main._font },
          { label: 'SETTINGS', action: 'settings', fontFace: Main._font },
          { label: 'RESET DATA', action: 'reset', fontFace: Main._font },
          { label: 'EXIT', action: 'exit', fontFace: Main._font },
        ],
      },
    }
  }

  _getFocused() {
    return this.tag('Menu')
  }

  _handleEnter() {
    this.signal('select', { item: this.tag('Menu').activeItem })
    let sound = new Audio('./static/audio/BW2MenuChoose.wav')
    sound.play()
  }

  fontChanged(fontFace) {
    this.tag('Menu').fontChanged(fontFace)
    // this.items.forEach((element) => {
    //   element.patch({ fontFace: fontFace })
    // })
  }
}
