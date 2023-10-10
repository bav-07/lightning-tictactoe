import { Lightning } from '@lightningjs/sdk'
import { ProgressBar } from '@lightningjs/ui'

export default class Splash extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 960,
        y: 540,
        mount: 0.5,
        text: { text: 'LOADING..', fontFace: 'pixel', textColor: '0xffff0000' },
      },
      ProgressBar: {
        type: ProgressBar,
        x: 950,
        y: 590,
        mount: 0.5,
        alpha: 0.6,
        progressColor: 0xffff0000,
        backgroundColor: 0xff550000,
        progressRadius: 0,
        backgroundRadius: 0,
        h: 20,
        w: 1000,
      },
    }
  }
  _init() {
    // create animation and store a reference, so we can start/stop/pause in the future
    this._pulse = this.tag('Logo').animation({
      duration: 4,
      repeat: 0,
      actions: [
        { p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 0 } },
        { p: 'scale', v: { 0: 1, 0.5: 1.2, 1: 1 } },
      ],
      w: 500,
      h: 500,
    })

    this._progress = this.tag('ProgressBar').animation({
      duration: 4,
      actions: [
        { p: 'value', v: { 0: 0, 0.25: Math.random() / 2, 0.75: 0.5 + Math.random() / 2, 1: 1 } },
      ],
    })

    // add a finish eventlistener, so we can send a signal to the parent when the animation is completed
    this._pulse.on('finish', () => {
      this.signal('loaded')
    })

    // start the animation
    this._pulse.start()
    this._progress.start()
  }
  _active() {
    this._pulse.start()
  }
}
