import { useState } from "react";
import {
  Calendar,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { QuestionCreate } from "../../../../api/apiService";
import { useAuth } from "../../../../context/AuthContext";
const QuizeQuestionCreate = ({ setShowCreateForm }) => {
  // Your original state and functions - unchanged
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const teacherId = adminData?._id || "defaultTeacherId";
  console.log(teacherId); // Fallback if no admin data
  const [step, setStep] = useState(1);
  const [quizMetadata, setQuizMetadata] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    mark: "",
    title: "",
    subject: "",
    duration: "",
    scheduledAt: "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: createQuizQuestion, isLoading } = useMutation({
    mutationFn: QuestionCreate,
    onSuccess: (response) => {
      if (response && response.data) {
        console.log("Quiz created successfully:", response.data);
      }

      // Reset everything
      setQuestion({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        mark: "",
        title: "",
        subject: "",
        duration: "",
        scheduledAt: "",
      });
      setQuestions([]);
      setQuizMetadata(null);
      setStep(1);
      setErrors({});
      setShowCreateForm(false);
      toast.success("Quiz created successfully with all questions!");
    },
    onError: (error) => {
      console.error("Error creating quiz:", error);
      toast.error("Error creating quiz. Please try again.");
    },
  });

  const handleInputChange = (field, value) => {
    setQuestion((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion((prev) => ({ ...prev, options: newOptions }));

    if (errors[`option${index}`]) {
      setErrors((prev) => ({ ...prev, [`option${index}`]: "" }));
    }
  };

  const validateMetadata = () => {
    const newErrors = {};
    if (!question.title.trim()) newErrors.title = "Title is required";
    if (!question.subject.trim()) newErrors.subject = "Subject is required";
    if (!question.duration) newErrors.duration = "Duration is required";
    if (!question.scheduledAt)
      newErrors.scheduledAt = "Schedule date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestionForm = () => {
    const newErrors = {};
    if (!question.questionText.trim())
      newErrors.questionText = "Question text is required";
    question.options.forEach((option, index) => {
      if (!option.trim())
        newErrors[`option${index}`] = `Option ${index + 1} is required`;
    });
    if (!question.correctAnswer)
      newErrors.correctAnswer = "Correct answer is required";
    if (!question.mark) newErrors.mark = "Mark is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMetadataSubmit = (e) => {
    e.preventDefault();
    if (validateMetadata()) {
      const metadata = {
        title: question.title,
        subject: question.subject,
        duration: parseInt(question.duration),
        scheduledAt: question.scheduledAt,
        createdBy: teacherId,
      };
      setQuizMetadata(metadata);
      setStep(2);
    }
  };

  const addQuestion = () => {
    if (!validateQuestionForm()) return;

    const newQuestion = {
      questionText: question.questionText,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      mark: parseInt(question.mark),
    };

    setQuestions((prev) => [...prev, newQuestion]);

    // Reset question form
    setQuestion((prev) => ({
      ...prev,
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      mark: "",
    }));
    setErrors({});

    toast.success("Question added successfully!");
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };
  const handleFinalSubmit = () => {
    if (questions.length === 0) {
      alert("Please add at least one question before submitting.");
      return;
    }

    const quizData = {
      ...quizMetadata,
      createdBy: teacherId,
      questions: questions,
    };

    console.log(quizMetadata, "quizMetadata");
    console.log(questions, "questions");
    createQuizQuestion(quizData);
  };

  const resetCurrentQuestion = () => {
    setQuestion((prev) => ({
      ...prev,
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      mark: "",
    }));
    setErrors({});
  };

  return (
    <div className="min-h-screen  py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                step === 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              }`}
            >
              <BookOpen size={16} />
              <span className="text-sm font-medium">Quiz Info</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                step === 2
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-400"
              }`}
            >
              <Edit3 size={16} />
              <span className="text-sm font-medium">Add Questions</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {step === 1 ? (
            // Step 1: Quiz Metadata - Your original structure with enhanced UI
            <form onSubmit={handleMetadataSubmit} className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create New Quiz
                </h2>
                <p className="text-gray-600 mt-2">
                  Set up your quiz details and requirements
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <BookOpen size={16} className="inline mr-2" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="e.g., Mid-term Mathematics Exam"
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <X size={14} className="mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={question.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="Enter subject name"
                    required
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <X size={14} className="mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock size={16} className="inline mr-2" />
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={question.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="60"
                    required
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <X size={14} className="mr-1" />
                      {errors.duration}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Schedule Date
                  </label>
                  <input
                    type="datetime-local"
                    value={question.scheduledAt}
                    onChange={(e) =>
                      handleInputChange("scheduledAt", e.target.value)
                    }
                    className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    required
                  />
                  {errors.scheduledAt && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <X size={14} className="mr-1" />
                      {errors.scheduledAt}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 py-3 px-6 text-sm font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <span>Next: Add Questions</span>
                  <Plus size={16} className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="inline-flex justify-center rounded-lg border-2 border-gray-300 bg-white py-3 px-6 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Step 2: Add Questions - Your original structure with enhanced UI
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Edit3 size={24} className="mr-3 text-indigo-600" />
                    Create Quiz - Step 2: Add Questions ({questions.length}{" "}
                    added)
                  </h2>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center"
                >
                  ← Back to Quiz Info
                </button>
              </div>

              {/* Quiz Info Summary - Enhanced styling */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl mb-6 border border-indigo-100">
                <h3 className="font-semibold text-gray-900 text-lg flex items-center">
                  <BookOpen size={20} className="mr-2 text-indigo-600" />
                  Quiz: {quizMetadata?.title}
                </h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center bg-white px-3 py-1 rounded-full">
                    <BookOpen size={14} className="mr-1" />
                    Subject: {quizMetadata?.subject}
                  </span>
                  <span className="flex items-center bg-white px-3 py-1 rounded-full">
                    <Clock size={14} className="mr-1" />
                    Duration: {quizMetadata?.duration} minutes
                  </span>
                </div>
              </div>

              {/* Added Questions List - Enhanced styling */}
              {questions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Check size={20} className="mr-2 text-green-600" />
                    Added Questions:
                  </h3>
                  <div className="space-y-3">
                    {questions.map((q, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 hover:border-green-300 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-lg mb-2">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm mr-3">
                                {index + 1}
                              </span>
                              {q.questionText}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {q.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`text-sm px-3 py-2 rounded-lg ${
                                    option === q.correctAnswer
                                      ? "bg-green-200 text-green-800 font-semibold"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                  {option === q.correctAnswer && (
                                    <Check size={14} className="inline ml-1" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                Correct Answer: {q.correctAnswer}
                              </span>
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium ml-2">
                                Marks: {q.mark}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeQuestion(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors ml-4"
                            title="Remove question"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Question Form - Enhanced styling */}
              <div className="border-2 border-dashed border-indigo-300 p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Plus size={20} className="mr-2 text-indigo-600" />
                  Add New Question
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question Text
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) =>
                        handleInputChange("questionText", e.target.value)
                      }
                      className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      rows="3"
                      placeholder="Enter your question here..."
                    />
                    {errors.questionText && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <X size={14} className="mr-1" />
                        {errors.questionText}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                      <div key={index}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Option {index + 1}
                        </label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                          placeholder={`Option ${String.fromCharCode(
                            65 + index
                          )}`}
                        />
                        {errors[`option${index}`] && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <X size={12} className="mr-1" />
                            {errors[`option${index}`]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Correct Answer
                      </label>
                      <select
                        value={question.correctAnswer}
                        onChange={(e) =>
                          handleInputChange("correctAnswer", e.target.value)
                        }
                        className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      >
                        <option value="">Select correct answer</option>
                        {question.options.map(
                          (option, index) =>
                            option.trim() && (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            )
                        )}
                      </select>
                      {errors.correctAnswer && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <X size={12} className="mr-1" />
                          {errors.correctAnswer}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Marks
                      </label>
                      <input
                        type="number"
                        value={question.mark}
                        onChange={(e) =>
                          handleInputChange("mark", e.target.value)
                        }
                        className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        placeholder="Enter marks"
                      />
                      {errors.mark && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <X size={12} className="mr-1" />
                          {errors.mark}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center justify-center rounded-lg border border-transparent bg-green-600 py-3 px-6 text-sm font-semibold text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Question
                  </button>
                  <button
                    type="button"
                    onClick={resetCurrentQuestion}
                    className="inline-flex justify-center rounded-lg border-2 border-gray-300 bg-white py-3 px-6 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Clear Form
                  </button>
                </div>
              </div>

              {/* Final Submit - Enhanced styling */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={questions.length === 0 || isLoading}
                  className={`inline-flex items-center justify-center rounded-lg border border-transparent py-3 px-8 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                    questions.length === 0 || isLoading
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Quiz...
                    </>
                  ) : (
                    <>
                      <Check size={16} className="mr-2" />
                      {`Create Quiz (${questions.length} questions)`}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="inline-flex justify-center rounded-lg border-2 border-gray-300 bg-white py-3 px-6 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizeQuestionCreate;
