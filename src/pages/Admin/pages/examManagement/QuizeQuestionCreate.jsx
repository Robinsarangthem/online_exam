import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { QuestionCreate } from '../../../../api/apiService';
import { useAdmin } from '../../../../context/AdminContext';

const QuizeQuestionCreate = ({setShowCreateForm}) => {
    const {adminData} = useAdmin()
    const teacherId = adminData?.adminData?._id || "TEACHER_ID";
    
    const [step, setStep] = useState(1); // Add missing step state
    const [quizMetadata, setQuizMetadata] = useState(null);
    const [questions, setQuestions] = useState([]); // Store all questions
    
    const [question, setQuestion] = useState({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        mark: '',
        title: '',
        subject: '',
        duration: '',
        scheduledAt: ''
    });

    const [errors, setErrors] = useState({});

    const { mutate: createQuizQuestion, isLoading } = useMutation({
        mutationFn: QuestionCreate,
        onSuccess: (response) => {
            if (response && response.data) {
                console.log('Quiz created successfully:', response.data);
            }
            
            // Reset everything
            setQuestion({
                questionText: '',
                options: ['', '', '', ''],
                correctAnswer: '',
                mark: '',
                title: '',
                subject: '',
                duration: '',
                scheduledAt: ''
            });
            setQuestions([]);
            setQuizMetadata(null);
            setStep(1);
            setErrors({});
            setShowCreateForm(false);
            alert('Quiz created successfully with all questions!');
        },
        onError: (error) => {
            console.error('Error creating quiz:', error);
            alert('Error creating quiz. Please try again.');
        }
    });

    const handleInputChange = (field, value) => {
        setQuestion(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...question.options];
        newOptions[index] = value;
        setQuestion(prev => ({ ...prev, options: newOptions }));
        
        if (errors[`option${index}`]) {
            setErrors(prev => ({ ...prev, [`option${index}`]: '' }));
        }
    };

    const validateMetadata = () => {
        const newErrors = {};
        if (!question.title.trim()) newErrors.title = 'Title is required';
        if (!question.subject.trim()) newErrors.subject = 'Subject is required';
        if (!question.duration) newErrors.duration = 'Duration is required';
        if (!question.scheduledAt) newErrors.scheduledAt = 'Schedule date is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateQuestionForm = () => {
        const newErrors = {};
        if (!question.questionText.trim()) newErrors.questionText = 'Question text is required';
        question.options.forEach((option, index) => {
            if (!option.trim()) newErrors[`option${index}`] = `Option ${index + 1} is required`;
        });
        if (!question.correctAnswer) newErrors.correctAnswer = 'Correct answer is required';
        if (!question.mark) newErrors.mark = 'Mark is required';
        
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
                createdBy: teacherId
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
            mark: parseInt(question.mark)
        };

        setQuestions(prev => [...prev, newQuestion]);
        
        // Reset question form
        setQuestion(prev => ({
            ...prev,
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            mark: ''
        }));
        setErrors({});
        
        alert('Question added successfully!');
    };

    const removeQuestion = (index) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const handleFinalSubmit = () => {
        if (questions.length === 0) {
            alert('Please add at least one question before submitting.');
            return;
        }

        const quizData = {
            ...quizMetadata,
            createdBy: teacherId,
            questions: questions
        };

        createQuizQuestion(quizData);
    };

    const resetCurrentQuestion = () => {
        setQuestion(prev => ({
            ...prev,
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            mark: ''
        }));
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
                {step === 1 ? (
                    // Step 1: Quiz Metadata
                    <form onSubmit={handleMetadataSubmit} className="p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Quiz - Step 1: Basic Information</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={question.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    value={question.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={question.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Schedule Date</label>
                                <input
                                    type="datetime-local"
                                    value={question.scheduledAt}
                                    onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.scheduledAt && <p className="text-red-500 text-sm">{errors.scheduledAt}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Next: Add Questions
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    // Step 2: Add Questions
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Create Quiz - Step 2: Add Questions ({questions.length} added)
                            </h2>
                            <button
                                onClick={() => setStep(1)}
                                className="text-indigo-600 hover:text-indigo-500 text-sm"
                            >
                                ← Back to Quiz Info
                            </button>
                        </div>

                        {/* Quiz Info Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 className="font-medium text-gray-900">Quiz: {quizMetadata?.title}</h3>
                            <p className="text-sm text-gray-600">
                                Subject: {quizMetadata?.subject} | Duration: {quizMetadata?.duration} minutes
                            </p>
                        </div>

                        {/* Added Questions List */}
                        {questions.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Added Questions:</h3>
                                <div className="space-y-3">
                                    {questions.map((q, index) => (
                                        <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        {index + 1}. {q.questionText}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Correct Answer: {q.correctAnswer} | Marks: {q.mark}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeQuestion(index)}
                                                    className="text-red-500 hover:text-red-700 text-sm ml-4"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add New Question Form */}
                        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Question</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Question Text</label>
                                    <input
                                        type="text"
                                        value={question.questionText}
                                        onChange={(e) => handleInputChange('questionText', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.questionText && <p className="text-red-500 text-sm">{errors.questionText}</p>}
                                </div>
                                
                                {question.options.map((option, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700">Option {index + 1}</label>
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors[`option${index}`] && <p className="text-red-500 text-sm">{errors[`option${index}`]}</p>}
                                    </div>
                                ))}
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                                    <select
                                        value={question.correctAnswer}
                                        onChange={(e) => handleInputChange('correctAnswer', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Select correct answer</option>
                                        {question.options.map((option, index) => 
                                            option.trim() && (
                                                <option key={index} value={option}>{option}</option>
                                            )
                                        )}
                                    </select>
                                    {errors.correctAnswer && <p className="text-red-500 text-sm">{errors.correctAnswer}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Marks</label>
                                    <input
                                        type="number"
                                        value={question.mark}
                                        onChange={(e) => handleInputChange('mark', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.mark && <p className="text-red-500 text-sm">{errors.mark}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={addQuestion}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                                >
                                    Add Question
                                </button>
                                <button
                                    type="button"
                                    onClick={resetCurrentQuestion}
                                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    Clear Form
                                </button>
                            </div>
                        </div>

                        {/* Final Submit */}
                        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                            <button
                                type="button"
                                onClick={handleFinalSubmit}
                                disabled={questions.length === 0 || isLoading}
                                className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${
                                    questions.length === 0 || isLoading
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {isLoading ? 'Creating Quiz...' : `Create Quiz (${questions.length} questions)`}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizeQuestionCreate;