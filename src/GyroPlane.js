import Orientation from './Orientation'
import { Vector, Line, Plane } from 'vanilla-vectors-3d'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from './settings'

class GyroPlane {
  constructor ({ distance, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = {}) {
    this.width = width
    this.height = height

    this._distance = distance

    this.orientation = new Orientation()
    this.offset = new Orientation()

    this.init()
  }

  get xCenter () {
    return this.width / 2
  }

  get yCenter () {
    return this.height / 2
  }

  get phoneZPos () {
    return this._distance ? this._distance : this.width * 1
  }

  init () {
    const xCenter = this.xCenter
    const yCenter = this.yCenter
    const phoneZPos = this.phoneZPos

    this.screenPlane = new Plane(
      new Vector(0, 0, 0),
      new Vector(this.width, 0, 0),
      new Vector(0, this.height, 0)
    )

    this.xAxis = new Line(
      new Vector(xCenter - 100, yCenter, phoneZPos),
      new Vector(xCenter + 100, yCenter, phoneZPos)
    )

    this.yAxis = new Line(
      new Vector(xCenter, yCenter - 100, phoneZPos),
      new Vector(xCenter, yCenter + 100, phoneZPos)
    )

    this.phoneLine = new Line(
      new Vector(xCenter, yCenter, phoneZPos),
      new Vector(xCenter, yCenter, phoneZPos / 2)
    )
  }

  setScreenDimensions ({ width, height }) {
    this.width = width
    this.height = height

    this.init()
  }

  setDistance (distance) {
    this._distance = distance

    this.init()
  }

  updateOffset (orientation) {
    this.offset.update(orientation)
  }

  updateOrientation (orientation) {
    this.orientation.update(orientation)
  }

  getScreenCoordinates () {
    const orientation = this.orientation.getDifferenceTo(this.offset)

    const phoneLinePrime = this.phoneLine
      .rotateAroundLine(this.yAxis, orientation.alpha)
      .rotateAroundLine(this.xAxis, 180 - orientation.beta)

    const interSectionVector = this.screenPlane.getIntersectionWith(phoneLinePrime)

    return {
      x: Math.round(interSectionVector.x),
      y: Math.round(interSectionVector.y)
    }
  }
}

export default GyroPlane
