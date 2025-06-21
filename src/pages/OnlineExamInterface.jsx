import { useMutation } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitExam } from "../api/apiService";

export default function OnlineExamInterface({
  question,
  handleNext,
  handlePrevious,
  handleFlag,
  flaggedQuestions,
  currentQuestion,
  handleAnswerSelect,
  selectedAnswer,
  totalQuestions,
  selectedExam,
  selectedSubject,
  remainingTime,
  examDuration, // Default to 0 if not provided
  setRemainingTime,
  isExamActive,
}) {
  console.log(examDuration, "Exam Duration");
  console.log(remainingTime, "Remaining Time");
  // console.log(selectedExam, "Selected Exam Data");
  // console.log(question, "Current Question Data");
  // console.log("Selected Exam:", selectedExam);
  // console.log("Selected Subject:", selectedSubject);
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [violations, setViolations] = useState(0);

  const studentRaw = localStorage.getItem("studentData");
  let StudentId = null;
  try {
    StudentId = studentRaw ? JSON.parse(studentRaw) : null;
  } catch (e) {
    StudentId = null;
  }

  // Submit exam mutation
  const { mutate: submitExam, isPending: isSubmit } = useMutation({
    mutationFn: (examData) =>
      SubmitExam(examData.examId, examData.studentId, examData.answers),
    onSuccess: (data) => {
      console.log("✅ Exam submitted successfully:", data);
      navigate(`/results/${data.resultId}`, {
        replace: true,
        state: {
          remainingTime,
          examDuration,
          // examId: selectedExam._id,
        },
      });
    },
    onError: (error) => {
      console.error("❌ Error submitting exam:", error);
      // Add user-friendly error handling
      alert("Failed to submit exam. Please try again.");
    },
  });

  // Protection Effects
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      setViolations((prev) => prev + 1);
      return false;
    };

    // Disable common keyboard shortcuts
    const handleKeyDown = (e) => {
      const violationsList = [
        { key: "F12", ctrl: false, shift: false },
        { key: "I", ctrl: true, shift: true },
        { key: "C", ctrl: true, shift: true },
        { key: "u", ctrl: true, shift: false },
        { key: "a", ctrl: true, shift: false },
        { key: "c", ctrl: true, shift: false },
        { key: "v", ctrl: true, shift: false },
        { key: "x", ctrl: true, shift: false },
        { key: "s", ctrl: true, shift: false },
        { key: "PrintScreen", ctrl: false, shift: false },
      ];

      const isViolation = violationsList.some(
        (v) =>
          e.key === v.key &&
          // e.ctrlKey === v.ctrl &&
          e.shiftKey === v.shift
      );

      if (isViolation) {
        e.preventDefault();
        setViolations((prev) => prev + 1);
        return false;
      }
    };

    // Add all event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.userSelect = "none";
    document.body.style.mozUserSelect = "none";
    document.body.style.msUserSelect = "none";

    // Cleanup function
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.userSelect = "";
      document.body.style.mozUserSelect = "";
      document.body.style.msUserSelect = "";
    };
  }, []);

  // Detect tab switching/window blur
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setViolations((prev) => prev + 1);
        setShowWarning(true);
        console.warn("⚠️ Tab switching detected during exam!");
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Screen recording detection
  useEffect(() => {
    let detectionInterval;

    const detectScreenRecording = () => {
      // Monitor for screen recording indicators
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        detectionInterval = setInterval(async () => {
          try {
            // Check if any recording permissions are active
            const permissions = await navigator.permissions.query({
              name: "camera",
            });
            if (permissions.state === "granted") {
              setIsRecording(true);
              setShowWarning(true);
              setViolations((prev) => prev + 1);
            }
          } catch (error) {
            // Screen recording detection not fully supported in all browsers
          }
        }, 2000);
      }
    };

    detectScreenRecording();

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, []);

  // Auto submit when time's up
  useEffect(() => {
    if (isExamActive && remainingTime === 0 && !isSubmit) {
      handleSubmit();
    }
    // eslint-disable-next-line
  }, [remainingTime, isExamActive, isSubmit]);

  const handleSubmit = () => {
    if (!selectedExam?._id) {
      console.error("No exam ID found");
      alert("Error: No exam selected");
      return;
    }

    if (!StudentId?.id) {
      console.error("No student ID found");
      toast.error("Error: Student not authenticated");
      return;
    }

    const examId = selectedExam._id;
    const answers = selectedExam.questions.map((q) => ({
      questionId: q._id,
      selectedAnswer: selectedAnswer[q._id] || null,
    }));

    // Include violation count in submission
    const examData = {
      examId,
      studentId: StudentId.id,
      answers,
    };

    console.log("📤 Submitting exam data:", examData);
    submitExam(examData);
  };

  const contentStyle = {
    filter: isRecording ? "blur(10px)" : "none",
    transition: "filter 0.3s ease",
  };

  // Exam Not Found UI
  if (!selectedExam) {
    return (
      <main className="flex-1 p-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center">
          <svg
            className="w-24 h-24 text-red-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="4"
              fill="white"
            />
            <path
              d="M24 16v10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="24" cy="34" r="2.5" fill="currentColor" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Exam Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The exam you are trying to access could not be found. Please check
            your link or contact your instructor.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8" style={contentStyle}>
      {/* Security Warning Banner */}
      {showWarning && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="font-semibold">Security Alert!</div>
              <div className="text-sm">
                {isRecording
                  ? "Screen recording detected"
                  : "Suspicious activity detected"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Violation Counter (for admin monitoring) */}
      {violations > 0 && (
        <div className="fixed top-4 left-4 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm z-50">
          Violations: {violations}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {!selectedSubject ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center">
            <BookOpen className="w-24 h-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Please Select a Subject
            </h2>
            <p className="text-gray-600 mb-4">
              You need to select a subject before starting the exam.
            </p>
          </div>
        ) : (
          <>
            {/* Security Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Security Notice:</strong> This exam is protected.
                    Screen recording, copying, and suspicious activities are
                    monitored and will be reported.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <div className="bg-gray-100 -mx-8 -mt-8 px-8 py-4 mb-8 rounded-t-lg">
                <h3 className="text-lg font-medium text-gray-800">
                  {question.questionText}{" "}
                  <span className="text">
                    {" "}
                    ({currentQuestion}/{totalQuestions}){" "}
                  </span>
                </h3>
              </div>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAnswer[question._id] === option
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`answer-${question._id}`}
                      value={option}
                      checked={selectedAnswer[question._id] === option}
                      onChange={() => handleAnswerSelect(question._id, option)}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-gray-700 leading-relaxed">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 1}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleFlag}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    flaggedQuestions.includes(currentQuestion)
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestion === totalQuestions}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={
                    Object.keys(selectedAnswer)?.length < totalQuestions ||
                    isSubmit
                  }
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{isSubmit ? "Submitting..." : "Submit"}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
