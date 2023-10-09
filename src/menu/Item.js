import { Lightning } from '@lightningjs/sdk'

export default class Item extends Lightning.Component {
  static _template() {
    return {
      text: { text: '', fontFace: 'pixel', fontSize: 50, textColor: '0xffff0000' },
    }
  }

  //will be automatically called
  set label(v) {
    this.text.text = v
  }

  set action(v) {
    this._action = v
  }

  get action() {
    return this._action
  }
}
