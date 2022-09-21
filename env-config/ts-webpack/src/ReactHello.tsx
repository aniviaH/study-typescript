import React from 'react'
import ReactDom from 'react-dom/client'

const id = document.getElementById('root')

const App: (() => JSX.Element) = () => {
  return (<div>
    <h1>Hello React!</h1>
  </div>)
} 

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
  <App />
)