import { NavLink } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full flex items-center justify-between">
      {  /* Left Content */}
        <div className="flex-1 max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
              Welcome to the
              <span className="block text-green-600">Online Exam</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Get ready to demonstrate your knowledge! You'll have 10 minutes to answer 
              20 carefully selected questions. Take a deep breath and do your best.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>10 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>20 Questions</span>
              </div>
            </div>

            <NavLink 
              to={'/online-exam'} 
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Start Exam</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NavLink>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="relative">
            {/* Online Test Screen */}
            <div className="bg-green-200 rounded-lg p-6 w-80 shadow-lg transform rotate-3">
              <div className="bg-green-400 text-white text-xs font-semibold px-3 py-1 rounded mb-4 inline-block">
                ONLINE TEST
              </div>
              
              {/* Question 1 */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-2">1.</div>
                <div className="space-y-2">
                  <div className="bg-green-300 h-2 rounded w-full"></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-20"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-16"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-18"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Question 2 */}
              <div>
                <div className="text-sm font-medium mb-2">2.</div>
                <div className="space-y-2">
                  <div className="bg-green-300 h-2 rounded w-full"></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-24"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-14"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-green-600"></div>
                      <div className="bg-green-300 h-1.5 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Person Illustration */}
            <div className="absolute -bottom-8 -left-12">
              {/* Person */}
              <div className="relative">
                {/* Head */}
                <div className="w-16 h-16 bg-teal-600 rounded-full mb-2"></div>
                
                {/* Body */}
                <div className="w-20 h-24 bg-green-300 rounded-t-3xl relative">
                  {/* Arms */}
                  <div className="absolute -left-3 top-4 w-6 h-16 bg-green-300 rounded-full transform -rotate-12"></div>
                  <div className="absolute -right-3 top-4 w-6 h-16 bg-green-300 rounded-full transform rotate-12"></div>
                </div>
                
                {/* Tablet/Device */}
                <div className="absolute right-2 top-20 w-8 h-10 bg-gray-800 rounded transform rotate-12"></div>
              </div>
            </div>
            
            {/* Plant */}
            <div className="absolute bottom-0 right-4">
              <div className="w-6 h-8 bg-orange-200 rounded-b-lg"></div>
              <div className="w-8 h-6 bg-green-500 rounded-full -mt-2 ml-1"></div>
              <div className="w-6 h-4 bg-green-500 rounded-full -mt-1 ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}