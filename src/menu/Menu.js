import { Lightning } from '@lightningjs/sdk'
import Item from './Item'

export default class Menu extends Lightning.Component {

  static _font = localStorage.getItem('font') ? localStorage.getItem('font') : 'gameOfSquids';

  static _template() {
    return {
      // we define a empty holder for our items of
      // position it 40px relative to the component position
      // so we have some space for our focus indicator
      Items: {
        x: 40,
        y: 0,
      },
      // Create a text component that indicates
      // which item has focus
      FocusIndicator: {
        y: 5,
        text: { text: '>', fontFace: Menu._font, textColor: 0xffff0000 },
      },
      // shader: { type: Lightning.shaders.Perspective, ry: (45 * Math.PI) / 180 },
    }
  }

  _init() {
    // create a blinking animation
    this._blink = this.tag('FocusIndicator').animation({
      duration: 0.5,
      repeat: -1,
      actions: [{ p: 'x', v: { 0: 0, 0.5: -40, 1: 0 } }],
    })

    this._blink.start()

    //current focused menu index
    this._index = 0
  }

  _active() {
    this._blink.start()
  }

  _inactive() {
    this._blink.stop()
  }

  get items() {
    return this.tag('Items').children
  }

  get activeItem() {
    return this.items[this._index]
  }

  _setIndex(idx) {
    // this.tag('FocusIndicator').setSmooth('y', idx * 90 + 5)
    this._index = idx
  }

  set items(v) {
    this.tag('Items').children = v.map((el, idx) => {
      return { type: Item, action: el.action, label: el.label, y: idx * 90 }
    })
  }

  _handleUp() {
    if (this._index > 0) {
      this.tag('Items').setSmooth('y', this.tag('Items').y + 90)
    }
    this._setIndex(Math.max(0, --this._index))
  }

  _handleDown() {
    if (this._index < this.items.length - 1) {
      this.tag('Items').setSmooth('y', this.tag('Items').y - 90)
    }
    this._setIndex(Math.min(++this._index, this.items.length - 1))
  }

  fontChanged(fontFace) {
    this.tag('FocusIndicator').patch({text: {fontFace}})
    this.tag('Items').children.forEach(element => {
      element.fontChanged(fontFace)
    });
  }
}
