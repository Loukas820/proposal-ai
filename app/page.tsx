'use client'
import Link from 'next/link'
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-white flex flex-col">
      <header className="border-b border-blue-700">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="text-2xl font-bold">ProposalAI</div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Turn RFPs Into Proposals in Minutes</h1>
        <p className="text-xl text-blue-100 mb-8">AI-powered proposal generation</p>
        <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold text-lg">Go to App</Link>
      </main>
    </div>
  )
}
