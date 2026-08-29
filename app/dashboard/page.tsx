'use client'
import { useState } from 'react'

export default function Dashboard() {
  const [rfp, setRfp] = useState('')
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfp }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setProposal(data.proposal)
      }
    } catch (e) {
      alert('Error: ' + e)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">ProposalAI</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <textarea
            value={rfp}
            onChange={(e) => setRfp(e.target.value)}
            placeholder="Paste RFP..."
            className="w-full h-64 p-4 border rounded"
          />
          <button
            onClick={generate}
            disabled={loading || !rfp}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div>
          <div className="h-64 p-4 border rounded bg-white overflow-y-auto whitespace-pre-wrap">
            {proposal || 'Output will appear here...'}
          </div>
        </div>
      </div>
    </div>
  )
}
