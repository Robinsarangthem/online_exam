import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ExamResult } from "../../api/apiService";
import { Home, RefreshCw, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AnimatedPercentage = ({ value }) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef();
  

    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const step = (timestamp) => {
            if (!ref.current) ref.current = timestamp;
            const progress = Math.min((timestamp - ref.current) / duration, 1);
            setDisplay(Math.round(progress * value));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
        return () => { ref.current = null; };
    }, [value]);

    return (
        <span className="text-5xl font-extrabold text-blue-600 drop-shadow-lg">{display}%</span>
    );
};

const Results = ({ score, totalQuestions, onRestart }) => {
    const resultId = useParams();
      const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['exam-result', resultId?.resultId],
        queryFn: () => ExamResult(resultId?.resultId)
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
            </div>
        );
    }

    const percentage = Math.round((data?.score / data?.totalQuestions) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full relative overflow-hidden animate-fade-in">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 rounded-full blur-3xl"></div>
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight drop-shadow">
                    🎉 Quiz Results 🎉
                </h1>
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 144 144">
                            <circle
                                cx="72"
                                cy="72"
                                r="64"
                                fill="none"
                                stroke="#e0e7ff"
                                strokeWidth="12"
                            />
                            <circle
                                cx="72"
                                cy="72"
                                r="64"
                                fill="none"
                                stroke="url(#grad)"
                                strokeWidth="12"
                                strokeDasharray={2 * Math.PI * 64}
                                strokeDashoffset={2 * Math.PI * 64 * (1 - percentage / 100)}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,2,.6,1)" }}
                            />
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="50%" stopColor="#a78bfa" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <AnimatedPercentage value={percentage} />
                    </div>
                    <div className="text-center">
                        <p className="text-2xl text-gray-700 mb-2 font-semibold">
                            You scored <span className="text-blue-600">{data?.score}</span> out of <span className="text-purple-600">{data?.totalQuestions}</span>
                        </p>
                        <p className={`text-lg font-medium ${percentage >= 70 ? "text-green-500" : "text-pink-500"} animate-bounce`}>
                            {percentage >= 70 ? 'Great job! 🌟' : 'Keep practicing! 💪'}
                        </p>
                    </div>
                    <div className="w-full border-t border-gray-200 my-6"></div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button
                            onClick={onRestart}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-lg"
                        >
                            <Home className="inline" />
                            Return Home
                        </button>
                        <button
                            onClick={() => navigate(`/review-exam-results/${resultId?.resultId}`)}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full shadow hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-lg"
                        >
                            <Eye className="inline" />
                            Review
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.8s cubic-bezier(.4,2,.6,1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
            `}</style>
        </div>
    );
};

export default Results;