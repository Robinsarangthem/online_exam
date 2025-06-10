import { s } from "framer-motion/client"

export default function Sidebar({flaggedQuestions, selectSubject,selectedSubject, handleSelectSubject }) {
  return (
    
    <aside className="w-80 bg-white border-r border-gray-200 h-screen">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Subject</h2>
          <select 
            className="w-full p-2 border border-gray-200 rounded"
            onChange={(e) => handleSelectSubject(e.target.value)}
            value={selectedSubject|| ""}
            aria-label="Select Subject"
          >
            <option value="" disabled>-- Choose your subject --</option>
            {selectSubject?.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subject}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Flagged Questions</h2>
        {flaggedQuestions.length === 0 ? (
          <p className="text-gray-500 text-sm">No questions flagged yet</p>
        ) : (
          <div className="space-y-2">
            {flaggedQuestions.map(qNum => (
              <div key={qNum} className="px-3 py-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                Question {qNum}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}