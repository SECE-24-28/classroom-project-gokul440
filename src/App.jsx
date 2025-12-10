import { useState } from 'react'
import './App.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    // Simulate loading time
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin()
      } else {
        setError('Invalid credentials')
        setIsLoading(false)
      }
    }, 1000)
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
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="hint">Use admin/admin to login</p>
      </div>
    </div>
  )
}

function ExpenseSplitter() {
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

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <div>
      {isLoggedIn ? <ExpenseSplitter /> : <Login onLogin={handleLogin} />}
    </div>
  )
}

export default App
