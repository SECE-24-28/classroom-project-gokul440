import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE_URL = 'http://localhost:3001/api'

function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
      })
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      onLogin(response.data.user)
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Expense Splitter</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="register-link">
          Don't have an account? 
          <button type="button" onClick={onSwitchToRegister} className="link-button">
            Register here
          </button>
        </p>
      </div>
    </div>
  )
}

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password
      })
      
      setSuccess('Registration successful! You can now login.')
      setTimeout(() => {
        onSwitchToLogin()
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Register for Expense Splitter</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="register-link">
          Already have an account? 
          <button type="button" onClick={onSwitchToLogin} className="link-button">
            Login here
          </button>
        </p>
      </div>
    </div>
  )
}

function ExpenseSplitter({ user, onLogout }) {
  const [participants, setParticipants] = useState([])
  const [expenses, setExpenses] = useState([])
  const [newParticipant, setNewParticipant] = useState('')
  const [expenseDesc, setExpenseDesc] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expensePaidBy, setExpensePaidBy] = useState('')
  const [isAddingParticipant, setIsAddingParticipant] = useState(false)
  const [isAddingExpense, setIsAddingExpense] = useState(false)

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setIsAddingParticipant(true)
      // Simulate loading time
      setTimeout(() => {
        setParticipants([...participants, newParticipant.trim()])
        setNewParticipant('')
        setIsAddingParticipant(false)
      }, 500)
    }
  }
  const addExpense = () => {
    if (expenseDesc.trim() && expenseAmount && expensePaidBy) {
      const amount = parseFloat(expenseAmount)
      if (amount > 0) {
        setIsAddingExpense(true)
        // Simulate loading time
        setTimeout(() => {
          setExpenses([...expenses, {
            id: Date.now(),
            description: expenseDesc.trim(),
            amount,
            paidBy: expensePaidBy
          }])
          setExpenseDesc('')
          setExpenseAmount('')
          setExpensePaidBy('')
          setIsAddingExpense(false)
        }, 500)
      }
    }
  }
  const removeExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }
  const calculateBalances = () => {
    const balances = {}
    participants.forEach(p => balances[p] = 0)

    expenses.forEach(exp => {
      const share = exp.amount / participants.length
      balances[exp.paidBy] += exp.amount - share
      participants.forEach(p => {
        if (p !== exp.paidBy) {
          balances[p] -= share
        }
      })
    })

    return balances
  }

  const balances = calculateBalances()

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Splitter</h1>
        <div className="user-info">
          <span>Welcome, {user.username}!</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="container">
        <section className="section">
          <h2>Add Participants</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Participant name"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              disabled={isAddingParticipant}
            />
            <button onClick={addParticipant} disabled={isAddingParticipant}>
              {isAddingParticipant ? 'Adding...' : 'Add'}
            </button>
          </div>
          <ul className="list">
            {participants.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>

        <section className="section">
          <h2>Add Expense</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Description"
              value={expenseDesc}
              onChange={(e) => setExpenseDesc(e.target.value)}
              disabled={isAddingExpense}
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              disabled={isAddingExpense}
            />
            <select
              value={expensePaidBy}
              onChange={(e) => setExpensePaidBy(e.target.value)}
              disabled={isAddingExpense}
            >
              <option value="">Paid by</option>
              {participants.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
            <button onClick={addExpense} disabled={isAddingExpense}>
              {isAddingExpense ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </section>

        <section className="section">
          <h2>Expenses</h2>
          <ul className="list">
            {expenses.map(exp => (
              <li key={exp.id} className="expense-item">
                <span>{exp.description} - ${exp.amount.toFixed(2)} (paid by {exp.paidBy})</span>
                <button onClick={() => removeExpense(exp.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>Balances</h2>
          <ul className="list">
            {participants.map(p => (
              <li key={p} className={balances[p] >= 0 ? 'positive' : 'negative'}>
                {p}: ${balances[p].toFixed(2)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
  }

  const switchToRegister = () => setShowRegister(true)
  const switchToLogin = () => setShowRegister(false)

  if (isLoggedIn && user) {
    return <ExpenseSplitter user={user} onLogout={handleLogout} />
  }

  return (
    <div>
      {showRegister ? (
        <Register onSwitchToLogin={switchToLogin} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
      )}
    </div>
  )
}

export default App
