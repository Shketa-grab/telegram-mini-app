import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState(null)

  const tg = window.Telegram?.WebApp

  useEffect(() => {
    if (tg) {
      tg.ready()
      tg.expand()
      
      const user = tg.initDataUnsafe?.user
      if (user) {
        setUserData({
          firstName: user.first_name,
          username: user.username
        })
      }
    }
  }, [])

  const increment = () => setCount(count + 1)

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-title">Кликер</div>
        {userData && (
          <div className="user-badge">
            {userData.firstName}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="counter-section">
          <div className="counter-value">{count}</div>
          <div className="counter-label">кликов</div>
        </div>

        <button 
          className="click-button" 
          onClick={increment}
        >
          Нажми меня!
        </button>

        {count > 0 && (
          <div className="stats">
            <div className="stat-item">
              <span>Всего кликов:</span>
              <strong>{count}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <button 
          className="close-button" 
          onClick={() => tg?.close()}
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default App