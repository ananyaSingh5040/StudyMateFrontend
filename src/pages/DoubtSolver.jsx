// pages/DoubtSolver.jsx
import { useState } from 'react'
import './DoubtSolver.css'

function DoubtSolver() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi, I’m StudyMate — ask me anything!' }
  ])
  const [input, setInput] = useState('')

 const [isTyping, setIsTyping] = useState(false);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: 'user', text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);

  try {
    const res = await fetch("http://localhost:5000/api/doubt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input })
    });

    const data = await res.json();
    const aiMessage = {
      sender: 'ai',
      text: data.answer || "Hmm... I couldn't understand that!"
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { sender: 'ai', text: "Something went wrong! Please try again later." }
    ]);
  } finally {
    setIsTyping(false);
  }
};



  return (
    <div className="doubt-solver">
      <div className="chat-container">
        {isTyping && (
  <div className="typing-indicator">StudyMate is typing...</div>
)}

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
  onKeyDown={(e) => e.key === 'Enter' && !isTyping && sendMessage()}
  disabled={isTyping}
/>

<button onClick={sendMessage} disabled={isTyping}>
  {isTyping ? "Thinking..." : "Send"}
</button>

      </div>
    </div>
  )
}

export default DoubtSolver
