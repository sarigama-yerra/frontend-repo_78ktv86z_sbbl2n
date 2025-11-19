import { useEffect, useRef, useState } from 'react'

export default function Chat({ match, currentUser, onClose }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const scRef = useRef(null)

  const load = async () => {
    const res = await fetch(`${baseUrl}/api/messages/${match.id}`)
    const data = await res.json()
    setMessages(data)
    setTimeout(()=> scRef.current?.scrollTo({top:999999, behavior:'smooth'}), 50)
  }

  useEffect(() => { load() }, [match?.id])

  const send = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const res = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ match_id: match.id, sender_id: currentUser.id, text })
    })
    const data = await res.json()
    if (!res.ok) return alert(data.detail || 'Failed to send')
    setText('')
    await load()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-3 border-b border-slate-700">
          <div className="text-white font-semibold">Chat</div>
          <button onClick={onClose} className="text-blue-200 hover:text-white">Close</button>
        </div>
        <div ref={scRef} className="flex-1 overflow-auto p-3 space-y-2">
          {messages.map(m => (
            <div key={m.id} className={`max-w-[75%] rounded px-3 py-2 ${m.sender_id===currentUser.id ? 'ml-auto bg-blue-600 text-white' : 'bg-slate-700 text-blue-100'}`}>
              {m.text}
            </div>
          ))}
        </div>
        <form onSubmit={send} className="p-3 border-t border-slate-700 flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" placeholder="Type a message..." />
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Send</button>
        </form>
      </div>
    </div>
  )
}
