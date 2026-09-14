import { useEffect, useState } from 'react'
import PostsPanel from './components/PostsPanel.jsx'
import AuthPanel from './components/AuthPanel.jsx'
import './App.css'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const handleAuthSuccess = (value) => {
    setToken(value)
  }

  const handleLogout = () => {
    setToken('')
  }

  return (
    <main className="app-shell">
      {token ? (
        <PostsPanel token={token} />
      ) : (
        <AuthPanel onSuccess={handleAuthSuccess} />
      )}
    </main>
  )
}

export default App
