import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { ChatsContextProvider } from './context/ChatsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatsContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatsContextProvider>
  </AuthContextProvider>
)
