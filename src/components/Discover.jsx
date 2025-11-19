import { useEffect, useState } from 'react'

export default function Discover({ currentUser, onLike }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [users, setUsers] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/users`)
      const data = await res.json()
      // filter self and preference
      const filtered = data.filter(u => u.id !== currentUser.id && (
        currentUser.seeking === 'both' || u.gender === currentUser.seeking
      ))
      setUsers(filtered)
    }
    if (currentUser) load()
  }, [currentUser])

  const person = users[index]

  const like = async () => {
    const res = await fetch(`${baseUrl}/api/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liker_id: currentUser.id, liked_id: person.id })
    })
    const data = await res.json()
    if (!res.ok) return alert(data.detail || 'Failed to like')
    onLike(data)
    setIndex(i => (i + 1) % users.length)
  }

  if (!person) return (
    <div className="text-blue-200">No more profiles match your preferences right now.</div>
  )

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
      <img src={person.avatar_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(person.name)}`} className="w-40 h-40 rounded-xl" />
      <div className="flex-1">
        <h3 className="text-white text-xl font-semibold">{person.name}</h3>
        <p className="text-blue-200/80 text-sm mt-1">{person.bio || 'No bio yet'}</p>
        <button onClick={like} className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded">Like</button>
      </div>
    </div>
  )
}
