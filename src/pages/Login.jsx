import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/students.json`
      )

      const students = await response.json()

      const student = students.find(
        (s) => s.uid === uid && s.password === password
      )

      if (student) {
        sessionStorage.setItem('user', JSON.stringify(student))
        navigate('/dashboard')
      } else {
        setError('Invalid UID or password')
      }
    } catch {
      setError('Unable to load student data')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">AP</div>

        <h1>Activity Points</h1>
        <p className="login-subtitle">Management System</p>

        <form onSubmit={handleLogin}>
          <label>Student UID</label>

          <input
            type="text"
            placeholder="Enter your UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="login-hint">
          Demo UID: U2408001 | Password: 123456
        </p>
      </div>
    </div>
  )
}

export default Login