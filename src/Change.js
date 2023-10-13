import { Lightning } from '@lightningjs/sdk'
import Menu from './menu/Menu'

export default class Change extends Lightning.Component {
  static _template() {
    return {
      y: 400,
      text: {
        text: 'Font has been changed to gameOfSquids. Please wait for the window to reload.',
        fontFace: 'gameOfSquids',
        textColor: '0xffff0000',
      },
    }
  }

  _handleBack() {
    this.signal('back')
  }

  _getFocused() {
    return this.tag('Change')
  }

  fontChanged(fontFace) {
    this.patch({ text: { fontFace: fontFace } })
    this.patch({
      text: { text: `Font has been changed to ${fontFace}. Please wait for the window to reload.` },
    })
  }
}
