// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const ref = React.useRef()

  React.useEffect(() => {
    const tiltNode = ref.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      flare: true,
      'max-glare': 0.5,
    })

    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div ref={ref} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
