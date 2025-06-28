// pages/DoubtSolver.jsx
import { useState } from 'react'
import './DoubtSolver.css'

function DoubtSolver() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi, I’m StudyMate — ask me anything!' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    setMessages([...messages, { sender: 'user', text: input }])
    setInput('')
   
  }

  return (
    <div className="doubt-solver">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask your doubt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default DoubtSolver
