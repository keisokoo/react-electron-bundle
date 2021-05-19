import React from 'react'
import { ipcRenderer } from 'electron'

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

const App = () => {
  const [dirPath, set_dirPath] = React.useState([] as any[])
  React.useEffect(() => {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg) // prints "pong"
      set_dirPath(arg)
    })
  }, [])
  return (
    <div id="main">
      <div>
        <div>
          {dirPath?.length > 0 &&
            dirPath.map((item) => <div key={item}>{item}</div>)}
        </div>
        <div>
          <button
            onClick={() => {
              ipcRenderer.send('asynchronous-message', 'ping')
            }}
          >
            TEST
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
