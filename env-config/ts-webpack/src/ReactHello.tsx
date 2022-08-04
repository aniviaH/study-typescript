import React from 'react'
import ReactDom from 'react-dom'

const App: (() => JSX.Element) = () => {
  return <div>
    <h1>Hello React!</h1>
  </div>
}

console.log(1)
ReactDom.render(<App />, document.getElementById('root'))