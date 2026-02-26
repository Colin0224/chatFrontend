import './App.css'
import { Routes, Route } from 'react-router-dom'
import ChatUI from './chatUI'
import ChatCreation from './ChatCreation'
function App() {
        return(
          <Routes>
            <Route path = "/" element = {<ChatCreation/>} />
            <Route path = "/chat/:roomId" element = {<ChatUI/>} />
          </Routes>
        )
}

export default App
