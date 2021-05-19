import React from 'react'
import { ipcRenderer } from 'electron'

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
const App = () => {
  React.useEffect(() => {}, [])
  return (
    <div id="main">
      <header>Hello World!</header>
      <button
        onClick={() => {
          ipcRenderer.send('asynchronous-message', 'ping')
        }}
      >
        TEST
      </button>
    </div>
  )
}

export default App
