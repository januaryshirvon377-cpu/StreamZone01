import dynamic from 'next/dynamic'
import { useState } from 'react'

// Load Monaco Editor dynamically (so it works in Next.js)
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function Home() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(`// Welcome to StreamZone
// Type your code here and click "Run Code"
console.log("Hello StreamZone!")`)
  const [output, setOutput] = useState('')

  // Function to execute code
  const runCode = () => {
    if (language !== 'javascript') {
      setOutput('⚠️ Only JavaScript can run in the browser right now.')
      return
    }

    try {
      const logs = []
      const originalLog = console.log
      console.log = (...args) => logs.push(args.join(' '))

      // Execute code safely
      // eslint-disable-next-line no-eval
      eval(code)

      console.log = originalLog
      setOutput(logs.join('\n') || '✅ Code executed successfully (no console output).')
    } catch (err) {
      setOutput('❌ Error: ' + err.message)
    }
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 text-purple-500">StreamZone</h1>
      <p className="text-sm opacity-70 mb-6 text-center">
        Write and run code directly in your browser.
      </p>

      {/* Language Selector and Run Button */}
      <div className="flex gap-3 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-gray-100 p-2 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
        </select>

        <button
          onClick={runCode}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-semibold transition"
        >
          ▶️ Run Code
        </button>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-5xl border border-gray-800 rounded-lg overflow-hidden shadow-lg">
        <Editor
          height="60vh"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output Box */}
      <div className="w-full max-w-5xl mt-4 bg-gray-900 border border-gray-800 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap min-h-[100px]">
        {output || '💡 Output will appear here after you run your code.'}
      </div>

      <footer className="mt-6 text-sm opacity-60">
        StreamZone © {new Date().getFullYear()}
      </footer>
    </main>
  )
}
