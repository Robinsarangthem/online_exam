import { useState, useEffect } from "react";

export default function Header({
  examStarted,
  totalQuestions,
  answeredQuestions,
  remainingTime,
  setRemainingTime,
}) {
  const studentIdentity = JSON.parse(localStorage.getItem("studentData")) || {};

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const completedPercent = totalQuestions
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0;
  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);
  // useEffect(() => {
  //     if (!examStarted) return;

  //     setTimeLeft(20 * 60); // Reset timer when exam starts
  //     const timer = setInterval(() => {
  //         setTimeLeft(prev => {
  //             if (prev <= 0) {
  //                 clearInterval(timer);
  //                 return 0;
  //             }
  //             return prev - 1;
  //         });
  //     }, 1000);

  //     return () => clearInterval(timer);
  // }, [examStarted]);

  // const minutes = Math.floor(timeLeft / 60);
  // const seconds = timeLeft % 60;

  // const completedPercent = totalQuestions ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

  return (
    <header className="bg-green-600 text-white px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 w-full sm:w-auto">
          <h1 className="text-xl font-semibold">Online Examination</h1>

          <div className="bg-white text-gray-800 px-4 py-2 rounded-lg w-full sm:w-auto">
            <span className="font-medium">
              Name: {studentIdentity?.studentName}
            </span>
            <span className="text-gray-600 ml-4">
              ID: {studentIdentity?.studentID}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 w-full sm:w-auto">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">
              {/* Replace 5 with your calculated percent */}
              {completedPercent}% Completed
            </span>
          </div>

          <div className="bg-white text-orange-500 px-4 py-2 rounded-lg font-bold text-lg">
            {`${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`}
          </div>
        </div>
      </div>
    </header>
  );
}
