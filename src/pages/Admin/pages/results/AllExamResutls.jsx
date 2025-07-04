import { useQuery } from "@tanstack/react-query";
import { getAllExamResults } from "../../../../api/apiService";
import Loading from "../../../../components/ui/Loading";

const AllExamResults = () => {
  const {
    data: allExamResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["results"],
    queryFn: getAllExamResults,
  });
  console.log(allExamResults);
  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Exam Results</h1>

      {!allExamResults ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : allExamResults?.data?.length === 0 ? (
        <p className="text-center text-gray-500">No exam results available.</p>
      ) : (
        <div className="space-y-6">
          {allExamResults?.data?.map((examResult, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold text-blue-600">
                {examResult.exam.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Subject: {examResult.exam.subject} | Scheduled:{" "}
                {new Date(examResult.exam.scheduledAt).toLocaleString()}
              </p>

              <table className="w-full table-auto border text-sm mt-3">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2 border">Student Name</th>
                    <th className="p-2 border">Roll No</th>
                    <th className="p-2 border">Score</th>
                    <th className="p-2 border">Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {examResult?.submissions?.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-gray-500">
                        No student submissions for this exam
                      </td>
                    </tr>
                  ) : (
                    examResult?.submissions?.map((submission, subIndex) => (
                      <tr key={subIndex} className="hover:bg-gray-50">
                        <td className="p-2 border">
                          {submission?.student?.studentName}
                        </td>
                        <td className="p-2 border">
                          {submission.student?.studentID}
                        </td>
                        <td className="p-2 border">{submission.score}</td>
                        <td className="p-2 border">{submission.totalMarks}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllExamResults;
