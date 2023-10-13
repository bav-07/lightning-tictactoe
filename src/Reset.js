import { Lightning } from '@lightningjs/sdk'

export default class Reset extends Lightning.Component {
  static _template() {
    return {
      y: 350,
      text: {
        text: 'WARNING!\n\nThis action will reset the tracked score between Player and Computer. This data can never be retrieved. Would you like to proceed?\n\n\n\n\n[ENTER] Delete all data\n\n[BACK]  Return to menu',
        w: 1400,
        fontFace: 'gameOfSquids',
        textColor: '0xffff0000',
      },
      Enter: {
        y: 1000,
        text: {
          text: '[ENTER] Reset game data',
          fontFace: 'gameOfSquids',
          textColor: '0xffff0000',
        },
      },
      Backspace: {
        y: 1000,
        text: {
          x: 600,
          text: '[BACK] Return to menu',
          fontFace: 'gameOfSquids',
          textColor: '0xffff0000',
        },
      },
    }
  }

  _handleEnter() {
    sessionStorage.setItem('aiScore', 0)
    sessionStorage.setItem('playerScore', 0)
    window.location.reload()
  }

  _handleBack() {
    this.signal('back')
  }

  _getFocused() {
    return this.tag('About')
  }

  fontChanged(fontFace) {
    this.patch({ text: { fontFace: fontFace } })
    this.tag('Enter').patch({ text2: { fontFace: fontFace } })
    this.tag('Backspace').patch({ text3: { fontFace: fontFace } })
  }
}
