import { useEffect, useState } from 'react'

export default function Header({ currentUser, onLogout }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="text-white font-semibold tracking-tight">Spark</span>
          <span className="text-xs text-blue-300/70 ml-2">Both can make the first move</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-blue-200/70 font-mono hidden sm:inline">{time.toLocaleTimeString()}</span>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <img src={currentUser.avatar_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(currentUser.name)}`} className="w-8 h-8 rounded-full" />
              <span className="text-white">Hi, {currentUser.name}</span>
              <button onClick={onLogout} className="px-3 py-1.5 rounded bg-slate-800 text-blue-200 hover:bg-slate-700 transition">Switch</button>
            </div>
          ) : (
            <span className="text-blue-200/70">Create your profile to get started</span>
          )}
        </div>
      </div>
    </header>
  )
}
