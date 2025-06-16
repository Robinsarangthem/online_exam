// import { s } from "framer-motion/client"

// export default function Sidebar({flaggedQuestions, selectSubject,selectedSubject, handleSelectSubject }) {
//   return (
    
//     <aside className="w-80 bg-white border-r border-gray-200 h-screen">
//       <div className="p-6">
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Subject</h2>
//           <select 
//             className="w-full p-2 border border-gray-200 rounded"
//             onChange={(e) => handleSelectSubject(e.target.value)}
//             value={selectedSubject|| ""}
//             aria-label="Select Subject"
//           >
//             <option value="" disabled>-- Choose your subject --</option>
//             {selectSubject?.map((sub) => (
//               <option key={sub._id} value={sub._id}>
//                 {sub.subject}
//               </option>
//             ))}
//           </select>
//         </div>
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Flagged Questions</h2>
//         {flaggedQuestions.length === 0 ? (
//           <p className="text-gray-500 text-sm">No questions flagged yet</p>
//         ) : (
//           <div className="space-y-2">
//             {flaggedQuestions.map(qNum => (
//               <div key={qNum} className="px-3 py-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
//                 Question {qNum}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </aside>
//   )
// }
import React from 'react';
import { ChevronDown, Flag, BookOpen, Clock, AlertCircle } from 'lucide-react';

export default function Sidebar({
  flaggedQuestions, 
  selectSubject, 
  selectedSubject, 
  handleSelectSubject,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswer,
  totalQuestions
}) {
  const selectedSubjectData = selectSubject?.find(sub => sub._id === selectedSubject);

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      {/* Subject Selection Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Select Subject</h2>
        </div>
        
        <div className="relative">
          <select 
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            onChange={(e) => handleSelectSubject(e.target.value)}
            value={selectedSubject || ""}
            aria-label="Select Subject"
          >
            <option value="" disabled className="text-gray-400">
              -- Choose your subject --
            </option>
            {selectSubject?.map((sub) => (
              <option key={sub._id} value={sub._id} className="text-gray-700">
                {sub.subject}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Selected Subject Info */}
        {selectedSubjectData && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">{selectedSubjectData.subject}</h3>
                <p className="text-sm text-blue-700">
                  {totalQuestions} Questions • 3 hours
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-700">Progress</div>
                <div className="text-lg font-semibold text-blue-900">
                  {currentQuestion || 0}/{totalQuestions || 0}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${totalQuestions ? ((currentQuestion || 0) / totalQuestions) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flagged Questions Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-4">
          <Flag className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800">Flagged Questions</h2>
          {flaggedQuestions.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {flaggedQuestions.length}
            </span>
          )}
        </div>
        
        {flaggedQuestions.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No questions flagged yet</p>
            <p className="text-gray-400 text-xs mt-1">
              Flag questions you want to review later
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {flaggedQuestions.map(qNum => (
              <div 
                key={qNum} 
                className={`group px-4 py-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  currentQuestion === qNum 
                    ? 'bg-orange-100 border-orange-300 shadow-sm' 
                    : 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                }`}
                onClick={() => setCurrentQuestion && setCurrentQuestion(qNum)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flag className="h-4 w-4 text-orange-500 fill-current" />
                    <span className="font-medium text-gray-800">
                      Question {qNum}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedAnswer && selectedAnswer[qNum] !== undefined && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" title="Answered"></div>
                    )}
                    {currentQuestion === qNum && (
                      <div className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                        Current
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-1 text-xs text-gray-600">
                  Click to navigate to this question
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      {selectedSubject && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {Object.keys(selectedAnswer || {}).length}
              </div>
              <div className="text-xs text-gray-500">Answered</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">
                {flaggedQuestions.length}
              </div>
              <div className="text-xs text-gray-500">Flagged</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {(totalQuestions || 0) - Object.keys(selectedAnswer || {}).length}
              </div>
              <div className="text-xs text-gray-500">Remaining</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}