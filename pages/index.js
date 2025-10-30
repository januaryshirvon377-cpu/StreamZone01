import dynamic from 'next/dynamic'
import { useState } from 'react'

// dynamically import Monaco Editor (client-side only)
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function Home() {
  const [language, setLanguage] = useState('javascript')

  const defaultCode = {
    javascript: `// Welcome to StreamZone
// Type your JavaScript code here!
console.log("Hello StreamZone!")`,
    python: `# Welcome to StreamZone
# Type your Python code here!
print("Hello StreamZone!")`,
    html: `<!-- Welcome to StreamZone -->
<h1 style="color: purple;">Hello StreamZone!</h1>`
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-4 text-purple-500">StreamZone</h1>
      <p className="text-sm opacity-70 mb-6 text-center">
        Build, test, and stream — directly from inside the app.
      </p>

      {/* Language Selector */}
      <div className="mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-gray-100 p-2 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
        </select>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-5xl border border-gray-800 rounded-lg overflow-hidden shadow-xl">
        <Editor
          height="70vh"
          defaultLanguage={language}
          value={defaultCode[language]}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>
    </main>
  )
}
