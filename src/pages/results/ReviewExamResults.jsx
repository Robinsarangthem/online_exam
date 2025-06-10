import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ExamResult } from "../../api/apiService";

const ReviewExamResults = () => {
    const  resultId = useParams()

    const {data} = useQuery({
        queryKey: ['exam-result', resultId?.resultId],
        queryFn: () => ExamResult(resultId?.resultId)   
    })
    if (!data) {
        return <div className="text-center text-red-500">No results found</div>;
    }
return (
    <div className="max-w-xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center drop-shadow-lg">Review Your Answers</h2>
        <div className="mb-4 text-center">
            <div className="text-lg font-semibold text-indigo-700">
                Exam: {data?.exam?.title}
            </div>
            <div className="text-pink-600 font-medium">
                Score: {data?.score} / {data?.totalMarks}
            </div>
        </div>
        {data?.answers?.map((result, idx) => (
            <div
                key={idx}
                className="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
                <div className="mb-2 font-semibold text-blue-700">
                    Q{idx + 1}: {result?.questionText}
                </div>
                <ul className="list-none p-0">
                    {result.options.map((option, i) => {
                        const isUser = option === result.correctAnswer;
                        const isCorrect = option === result.selectedAnswer;
                        let bg = "";
                        if (isCorrect) bg = "bg-green-100";
                        if (isUser && !isCorrect) bg = "bg-red-100";
                        return (
                            <li
                                key={i}
                                className={`flex items-center mb-1 px-3 py-2 rounded ${bg} ${isUser ? "border-2 border-blue-500" : "border border-gray-200"} ${isCorrect ? "font-bold" : ""} ${isUser ? "text-blue-700" : ""} ${isCorrect ? "text-green-700" : ""}`}
                            >
                                <span>{option}</span>
                                {isUser && (
                                    <span className="ml-2 text-blue-600 text-sm">(Your answer)</span>
                                )}
                                {isCorrect && (
                                    <span className="ml-2 text-green-600 text-sm">(Correct answer)</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div className="mt-2">
                    {result.isCorrect ? (
                        <span className="text-green-600 font-semibold flex items-center">
                            <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            Correct
                        </span>
                    ) : (
                        <span className="text-red-600 font-semibold flex items-center">
                            <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            Incorrect
                        </span>
                    )}
                </div>
            </div>
        ))}
    </div>
);
}
export default ReviewExamResults;