# GyroPlane - Project angles from a gyroscope onto a 2D plane.

This library provides a way to project 3D angles from a gyroscope (e.g. from a
smartphone) onto a 2D plane. Basically it "converts" the alpha and beta values
to x and y coordinates.

The library needs to be aware of the plane size (in pixels) and the distance
between the center of the plane and the center of the gyroscope. The distance
is also defined in pixels.

## How to use

```javascript
import { GyroPlane } from 'gyro-plane'

const width = window.innerWidth
const height = window.innerHeight

// Assume the distance between gyroscope and screen to be two times the width
const distance = width * 2

let gyro = new GyroPlane({
  width: window.innerWidth,
  height: window.innerHeight,
  distance: distance
})

// Update the orientation values from a gyroscope.
gyro.updateOrientation({ alpha: 30, beta: -25.6 })

// To get the calculated coordinates, you have to call this function.
const coordinates = gyro.getScreenCoordinates()
// => { x: 80, y: 130 }
```

## Todo
- docs
- tests
