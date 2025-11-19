import { useEffect, useState } from 'react'
import Header from './components/Header'
import Auth from './components/Auth'
import Discover from './components/Discover'
import Matches from './components/Matches'
import Chat from './components/Chat'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [lastLike, setLastLike] = useState(null)
  const [activeMatch, setActiveMatch] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('spark_user')
    if (saved) setCurrentUser(JSON.parse(saved))
  }, [])

  const onAuthed = (user) => {
    setCurrentUser(user)
    localStorage.setItem('spark_user', JSON.stringify(user))
  }

  const onLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('spark_user')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.06),transparent_50%)]"></div>
      <Header currentUser={currentUser} onLogout={onLogout} />
      <main className="relative z-0 max-w-6xl mx-auto px-4 py-10 space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">Spark</h1>
          <p className="text-blue-200/80 mt-2">A modern dating experience where either person can make the first move after a match.</p>
        </section>

        {!currentUser ? (
          <Auth onAuthed={onAuthed} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Discover currentUser={currentUser} onLike={setLastLike} />
              {lastLike?.match && (
                <div className="bg-green-600/20 text-green-200 border border-green-600/30 rounded-xl p-4">
                  It's a match! Open your matches to start a conversation — either of you can message first.
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Your Matches</h3>
                <Matches currentUser={currentUser} openChat={setActiveMatch} />
              </div>
            </div>
          </div>
        )}
      </main>
      {activeMatch && (
        <Chat match={activeMatch} currentUser={currentUser} onClose={()=>setActiveMatch(null)} />
      )}
    </div>
  )
}

export default App
