import { Axios } from "../lib/axios"

 export const StudentLogin = async (loginData) => {
	try {
		const response = await Axios.post('/api/student/login', loginData)
		return response.data
	} catch (error) {
		console.error('Login failed:', error)
	}
}

export const QuestionCreate = async (questionData) => {
	try {
		const response = await Axios.post('/api/exam/create', questionData)
		console.log('Question created successfully:', response.data)
	} catch (error) {
		console.error('Failed to create question:', error)
	}
}

export const AdminLogin = async (loginData) => {
	try {
		const response = await Axios.post('/api/admin/login', loginData)
		if (response?.data) {
			localStorage.setItem('adminData', JSON.stringify(response?.data?.teacher))
			return response.data
		}
	} catch (error) {
		console.error('Admin login failed:', error)
		throw error
	}
}

export const Examlist = async () => {
	try {
		const response = await Axios.get('/api/exam/list')
		return response.data
	} catch (error) {
		console.error('Failed to fetch exam list:', error)
		throw error	
	}
}
export const ExamDetails = async (examId) => {
	try {
		const response = await Axios.get(`/api/exam/${examId}`)
		return response.data
	} catch (error) {
		console.error('Failed to fetch exam details:', error)
		throw error
	}
}
export const ExamResult = async (resultId) => {
	try {
		const response = await Axios.get(`/api/exam/score/${resultId}`)
		return response.data
	} catch (error) {
		console.error('Failed to fetch exam result:', error)	
		throw error
	}
}

export const SubmitExam = async (examId, studentId, answers) => {
	try {
		// Convert answers to object if it's a string
		const parsedAnswers = typeof answers === 'string' 
			? JSON.parse(answers) 
			: answers;

		// Validate answers
		if (!parsedAnswers || typeof parsedAnswers !== 'object') {
			throw new Error('Answers must be an object or array');
		}

		// Make API call
		const response = await Axios.post(`/api/exam/submit/${examId}`, {
			studentId,
			answers: parsedAnswers
		});

		return response.data;
	} catch (error) {
		console.error('Failed to submit exam:', error);
		throw error;
	}
}
