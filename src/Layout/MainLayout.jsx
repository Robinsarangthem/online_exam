// import { useEffect, useState } from "react";
// import OnlineExamInterface from "../pages/OnlineExamInterface";
// import { useQuery } from "@tanstack/react-query";
// import { Examlist } from "../api/apiService";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Header from "../components/Header/Header";
// import Loading from "../components/ui/Loading";

// export default function MainLayout() {
//   const [selectedAnswer, setSelectedAnswer] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [flaggedQuestions, setFlaggedQuestions] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [remainingTime, setRemainingTime] = useState(0);

//   const {
//     data: examData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["exam-Questions"],
//     queryFn: Examlist,
//   });

//   const exams = examData?.data || [];

//   // Prepare subject list
//   const selectSubject = exams;

//   // Loading and error states
//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loading />
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="flex items-center justify-center min-h-screen text-rose-400">
//         Error loading questions
//       </div>
//     );

//   if (!Array.isArray(exams) || exams.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
//           <svg
//             className="w-16 h-16 text-gray-400 mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 48 48"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle
//               cx="24"
//               cy="24"
//               r="22"
//               strokeWidth="4"
//               stroke="currentColor"
//               fill="none"
//             />
//             <path
//               d="M16 20h16M16 28h8"
//               strokeWidth="3"
//               strokeLinecap="round"
//               stroke="currentColor"
//             />
//           </svg>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//             No Exam Schedule
//           </h2>
//           <p className="text-gray-500 mb-4 text-center">
//             There are currently no questions available for this exam.
//             <br />
//             Please check back later or contact your administrator.
//           </p>
//           <button
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             onClick={() => window.location.reload()}
//           >
//             Reload
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Get current subject's questions
//   const currentSubjectQuestions = selectedSubject
//     ? exams.find((subject) => subject._id === selectedSubject)?.questions || []
//     : [];

//   // Handlers
//   const handleSelectSubject = (subjectId) => {
//     setSelectedSubject(subjectId);
//     setCurrentQuestion(1);
//     setSelectedAnswer({});
//     setFlaggedQuestions([]);
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 1) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleFlag = () => {
//     const isAlreadyFlagged = flaggedQuestions.includes(currentQuestion);
//     if (isAlreadyFlagged) {
//       setFlaggedQuestions(
//         flaggedQuestions.filter((q) => q !== currentQuestion)
//       );
//     } else {
//       setFlaggedQuestions([...flaggedQuestions, currentQuestion]);
//     }
//   };

//   const handleAnswerSelect = (questionId, answer) => {
//     setSelectedAnswer((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answer,
//     }));
//   };

//   // Exam start logic
//   const startExam = (subjectId) => {
//     const selectedExam = exams.find((exam) => exam._id === subjectId);
//     if (selectedExam && selectedExam.duration) {
//       setRemainingTime(selectedExam.duration * 60); // assuming duration is in minutes
//     }
//   };

//   const handleSelectSubjectWithStart = (subjectId) => {
//     handleSelectSubject(subjectId);
//     startExam(subjectId);
//   };

//   // Get current question object
//   const question = currentSubjectQuestions[currentQuestion - 1];

//   // Next handler
//   const handleNext = () => {
//     if (currentQuestion < currentSubjectQuestions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   // Timer countdown logic

//   return (
//     <div className="h-screen flex flex-col bg-gray-100">
//       <Header
//         totalQuestions={currentSubjectQuestions.length}
//         answeredQuestions={Object.keys(selectedAnswer).length}
//         examStarted={remainingTime > 0}
//         remainingTime={remainingTime}
//         setRemainingTime={setRemainingTime}
//       />
//       <div className="flex flex-1 min-h-0">
//         <Sidebar
//           selectSubject={selectSubject}
//           selectedSubject={selectedSubject}
//           handleSelectSubject={handleSelectSubjectWithStart}
//           flaggedQuestions={flaggedQuestions}
//           currentQuestion={currentQuestion}
//           setCurrentQuestion={setCurrentQuestion}
//           setFlaggedQuestions={setFlaggedQuestions}
//           selectedAnswer={selectedAnswer}
//           setSelectedAnswer={setSelectedAnswer}
//           currentQuestions={currentSubjectQuestions}
//           totalQuestions={currentSubjectQuestions.length}
//           setRemainingTime={setRemainingTime}
//         />

//         <OnlineExamInterface
//           handleNext={handleNext}
//           question={question}
//           handlePrevious={handlePrevious}
//           handleFlag={handleFlag}
//           flaggedQuestions={flaggedQuestions}
//           currentQuestion={currentQuestion}
//           handleAnswerSelect={handleAnswerSelect}
//           selectedAnswer={selectedAnswer}
//           totalQuestions={currentSubjectQuestions.length}
//           selectedSubject={selectedSubject}
//           selectedExam={
//             exams.find((exam) => exam._id === selectedSubject) || {}
//           }
//           answeredQuestions={Object.keys(selectedAnswer).length}
//           remainingTime={remainingTime > 0 ? remainingTime : 0}
//         />
//       </div>
//     </div>
//   );
// }
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Examlist } from "../api/apiService";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Loading from "../components/ui/Loading";
import OnlineExamInterface from "../pages/OnlineExamInterface";

export default function MainLayout() {
  const navigate = useNavigate();

  // Existing state
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);

  // NEW: Add time tracking state
  const [examStartTime, setExamStartTime] = useState(null); // When exam actually started
  const [examDuration, setExamDuration] = useState(0); // Duration in minutes
  const [isExamActive, setIsExamActive] = useState(false);

  // Timer ref for cleanup
  const timerRef = useRef();

  const {
    data: examData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exam-Questions"],
    queryFn: Examlist,
  });

  const exams = examData?.data || [];
  const selectSubject = exams;

  // NEW: Timer countdown with proper cleanup
  useEffect(() => {
    if (remainingTime > 0 && isExamActive) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            // Time's up - auto submit
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [remainingTime, isExamActive]);

  // Loading and error states
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-rose-400">
        Error loading questions
      </div>
    );

  if (!Array.isArray(exams) || exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
            />
            <path
              d="M16 20h16M16 28h8"
              strokeWidth="3"
              strokeLinecap="round"
              stroke="currentColor"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Exam Schedule
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            There are currently no questions available for this exam.
            <br />
            Please check back later or contact your administrator.
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  // Get current subject's questions
  const currentSubjectQuestions = selectedSubject
    ? exams.find((subject) => subject._id === selectedSubject)?.questions || []
    : [];

  // Existing handlers
  const handleSelectSubject = (subjectId) => {
    setSelectedSubject(subjectId);
    setCurrentQuestion(1);
    setSelectedAnswer({});
    setFlaggedQuestions([]);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFlag = () => {
    const isAlreadyFlagged = flaggedQuestions.includes(currentQuestion);
    if (isAlreadyFlagged) {
      setFlaggedQuestions(
        flaggedQuestions.filter((q) => q !== currentQuestion)
      );
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion]);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // UPDATED: Enhanced exam start logic with proper time tracking
  const startExam = (subjectId) => {
    const selectedExam = exams.find((exam) => exam._id === subjectId);
    if (selectedExam && selectedExam.duration) {
      const currentTime = new Date().toISOString();
      const durationInMinutes = selectedExam.duration;

      // Set all time tracking values
      setExamStartTime(currentTime);
      setExamDuration(durationInMinutes);
      setRemainingTime(durationInMinutes * 60); // Convert to seconds
      setIsExamActive(true);

      console.log("Exam started:", {
        startTime: currentTime,
        duration: durationInMinutes,
        remainingSeconds: durationInMinutes * 60,
      });
    }
  };

  const handleSelectSubjectWithStart = (subjectId) => {
    handleSelectSubject(subjectId);
    startExam(subjectId);
  };

  // NEW: Handle manual exam submission
  const handleSubmitExam = async () => {
    if (!isExamActive) return;

    setIsExamActive(false);

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const examSubmittedAt = new Date().toISOString();

    console.log("Manual submission data:", {
      examSubmittedAt,
      examStartTime,
      examDuration,
      remainingTime,
    });

    try {
      // Call your submit exam API
      const response = await submitExamToAPI({
        subjectId: selectedSubject,
        answers: selectedAnswer,
        submittedAt: examSubmittedAt,
        startTime: examStartTime,
        duration: examDuration,
        timeSpent: examDuration * 60 - remainingTime,
      });

      // Navigate to results with proper time tracking
      navigate(`/results/${response.resultId}`, {
        state: {
          remainingTime: remainingTime, // Current remaining time in seconds
          examSubmittedAt: examSubmittedAt,
          examStartTime: examStartTime,
          examDuration: examDuration, // Duration in minutes
          submissionType: "manual",
        },
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
      // Handle error appropriately
      setIsExamActive(true); // Re-enable if submission failed
    }
  };

  // NEW: Handle automatic submission when time runs out
  const handleTimeUp = async () => {
    if (!isExamActive) return;

    setIsExamActive(false);

    const examSubmittedAt = new Date().toISOString();

    console.log("Auto submission data:", {
      examSubmittedAt,
      examStartTime,
      examDuration,
      remainingTime: 0,
    });

    try {
      // Auto-submit exam
      const response = await submitExamToAPI({
        subjectId: selectedSubject,
        answers: selectedAnswer,
        submittedAt: examSubmittedAt,
        startTime: examStartTime,
        duration: examDuration,
        timeSpent: examDuration * 60, // Full duration
        autoSubmitted: true,
      });

      // Navigate to results - no remaining time
      navigate(`/results/${response.resultId}`, {
        state: {
          remainingTime: 0, // No time left
          examSubmittedAt: examSubmittedAt,
          examStartTime: examStartTime,
          examDuration: examDuration,
          submissionType: "auto",
        },
      });
    } catch (error) {
      console.error("Error auto-submitting exam:", error);
    }
  };

  // Get current question object
  const question = currentSubjectQuestions[currentQuestion - 1];

  // Next handler
  const handleNext = () => {
    if (currentQuestion < currentSubjectQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header
        totalQuestions={currentSubjectQuestions.length}
        answeredQuestions={Object.keys(selectedAnswer).length}
        examStarted={remainingTime > 0 && isExamActive}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        onSubmitExam={handleSubmitExam} // Pass submit handler to Header
        isExamActive={isExamActive}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          selectSubject={selectSubject}
          selectedSubject={selectedSubject}
          handleSelectSubject={handleSelectSubjectWithStart}
          flaggedQuestions={flaggedQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          setFlaggedQuestions={setFlaggedQuestions}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          currentQuestions={currentSubjectQuestions}
          totalQuestions={currentSubjectQuestions.length}
          setRemainingTime={setRemainingTime}
          onSubmitExam={handleSubmitExam} // Pass submit handler to Sidebar
          isExamActive={isExamActive}
        />
        <OnlineExamInterface
          handleNext={handleNext}
          question={question}
          handlePrevious={handlePrevious}
          handleFlag={handleFlag}
          flaggedQuestions={flaggedQuestions}
          currentQuestion={currentQuestion}
          handleAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
          totalQuestions={currentSubjectQuestions.length}
          selectedSubject={selectedSubject}
          selectedExam={
            exams.find((exam) => exam._id === selectedSubject) || {}
          }
          answeredQuestions={Object.keys(selectedAnswer).length}
          remainingTime={remainingTime > 0 ? remainingTime : 0}
          onSubmitExam={handleSubmitExam} // Pass submit handler
          isExamActive={isExamActive}
          examStartTime={examStartTime}
          examDuration={examDuration}
          setRemainingTime={setRemainingTime}
          // Pass remaining time for display
          remainingTimeDisplay={remainingTime}
        />
      </div>
    </div>
  );
}
