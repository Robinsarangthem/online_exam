import { useEffect, useRef, useState } from "react";
import OnlineExamInterface from "../pages/OnlineExamInterface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Examlist, SubmitExam } from "../api/apiService";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Loading from "../components/ui/Loading";

export default function MainLayout() {
const [selectedAnswer, setSelectedAnswer] = useState({});
const [currentQuestion, setCurrentQuestion] = useState(1);
const [flaggedQuestions, setFlaggedQuestions] = useState([]);
const [selectedSubject, setSelectedSubject] = useState(""); 
const [examStarted, setExamStarted] = useState(false);
const [remainingTime, setRemainingTime] = useState(0);
const timerRef = useRef(null);




const {data, isLoading, isError} = useQuery({
  queryKey: ['exam-Questions'],
  queryFn: Examlist
});


const selectSubject = data?.map((subject) => subject) || [];

if (isLoading) return (
  <div className="flex items-center justify-center min-h-screen">
    <Loading/>
  </div>
);


if (isError) return <div className="flex items-center justify-center min-h-screen text-rose-400">Error loading questions</div>;
if (!data || data.length === 0) return <div>No questions available</div>;

const currentSubjectQuestions = selectedSubject 
  ? data.find(subject => subject._id === selectedSubject)?.questions || []
  : [];

const question = currentSubjectQuestions[currentQuestion - 1] || {
  id: 0,
  text: "Please select a subject",
  options: []
};

const handleSelectSubject = (subjectId) => {
  setSelectedSubject(subjectId);
  // Get the selected exam details from the data
  const selectedExam = data.find(exam => exam._id === subjectId);
  // console.log('Selected Exam ID:', selectedExam?._id); // This will log the exam ID
  // console.log('Selected Exam:', selectedExam); // This will log the entire exam object
  
  setCurrentQuestion(1);
  setSelectedAnswer('');
  setFlaggedQuestions([]);
};

const handleNext = () => {
  if (currentQuestion < currentSubjectQuestions.length) {
    setCurrentQuestion(currentQuestion + 1);
  }
};
const handlePrevious = () => {
  if (currentQuestion > 1) {
    setCurrentQuestion(currentQuestion - 1);
  }
};
const handleFlag = () => {
  const isAlreadyFlagged = flaggedQuestions.includes(currentQuestion);
  if (isAlreadyFlagged) {
    setFlaggedQuestions(flaggedQuestions.filter(q => q !== currentQuestion));
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


// useEffect(() => {
//   if (examStarted && remainingTime > 0) {
//     timerRef.current = setTimeout(() => {
//       setRemainingTime(remainingTime - 1);
//     }, 1000);
//   } else if (remainingTime === 0 && examStarted) {
//     setExamStarted(false);
//     // Optionally handle exam end here
//   }
//   return () => clearTimeout(timerRef.current);
// }, [examStarted, remainingTime]);

const startExam = (subjectId) => {
  const selectedExam = data.find(exam => exam._id === subjectId);
  if (selectedExam && selectedExam.duration) {
    setRemainingTime(selectedExam.duration * 60); // assuming duration is in minutes
    setExamStarted(true);
  }
};

const handleSelectSubjectWithStart = (subjectId) => {
  handleSelectSubject(subjectId);
  startExam(subjectId);
};


return (
  <div className="min-h-screen bg-gray-100">
    <Header 
    totalQuestions={currentSubjectQuestions.length}
    examStarted={handleSelectSubjectWithStart}
    answeredQuestions={Object.keys(selectedAnswer).length}
    remainingTime={remainingTime}
    />

    <div className="flex">
      <Sidebar
        selectSubject={selectSubject}
        selectedSubject={selectedSubject} 
        handleSelectSubject={handleSelectSubject}
        flaggedQuestions={flaggedQuestions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        setFlaggedQuestions={setFlaggedQuestions}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
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
        selectedExam = {data.find(exam => exam._id === selectedSubject) || {}}
      />
    </div>
  </div>    
)
}