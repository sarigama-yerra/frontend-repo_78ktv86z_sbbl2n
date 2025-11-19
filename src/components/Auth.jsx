import { useState } from 'react'

export default function Auth({ onAuthed }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', gender: 'female', seeking: 'male', bio: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create user')
      onAuthed(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-4">Create Profile</h2>
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-1">Name</label>
          <input className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">I am</label>
          <select className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
            <option value="female">Woman</option>
            <option value="male">Man</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Looking for</label>
          <select className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" value={form.seeking} onChange={e=>setForm({...form,seeking:e.target.value})}>
            <option value="male">Men</option>
            <option value="female">Women</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-1">Bio</label>
          <textarea className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" rows={3} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} />
        </div>
        <div className="sm:col-span-2 flex gap-3">
          <button disabled={loading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition disabled:opacity-60">{loading? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </div>
  )
}
