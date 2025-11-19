import { useEffect, useState } from 'react'

export default function Matches({ currentUser, openChat }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/matches/${currentUser.id}`)
      const data = await res.json()
      setMatches(data)
    }
    if (currentUser) load()
  }, [currentUser])

  if (!matches.length) return <div className="text-blue-200">No matches yet. Keep liking!</div>

  const other = (m) => m.user1_id === currentUser.id ? m.user2_id : m.user1_id

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {matches.map(m => (
        <button key={m.id} onClick={()=>openChat(m)} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex items-center gap-4 text-left hover:border-slate-600 transition">
          <img src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${other(m)}`} className="w-12 h-12 rounded-full" />
          <div>
            <div className="text-white font-semibold">Match</div>
            <div className="text-blue-200/70 text-sm">Tap to chat</div>
          </div>
        </button>
      ))}
    </div>
  )
}
