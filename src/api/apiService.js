import { Axios } from "../lib/axios";

export const StudentLogin = async (loginData) => {
  try {
    const response = await Axios.post("/api/student/login", loginData);
    console.log(response.data, "Login response data");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const QuestionCreate = async (questionData) => {
  try {
    const response = await Axios.post("/api/exam/create", questionData);
    console.log("Question created successfully:", response.data);
  } catch (error) {
    console.error("Failed to create question:", error);
  }
};

export const AdminLogin = async (loginData) => {
  try {
    const response = await Axios.post("/api/admin/login", loginData);
    if (response?.data) {
      localStorage.setItem(
        "adminData",
        JSON.stringify(response?.data?.teacher)
      );
      return response.data;
    }
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error;
  }
};

export const Examlist = async () => {
  try {
    const response = await Axios.get("/api/exam/list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exam list:", error);
    throw error;
  }
};
export const ExamDetails = async (examId) => {
  try {
    const response = await Axios.get(`/api/exam/${examId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exam details:", error);
    throw error;
  }
};
export const ExamResult = async (resultId) => {
  try {
    const response = await Axios.get(`/api/exam/score/${resultId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exam result:", error);
    throw error;
  }
};

export const SubmitExam = async (examId, studentId, answers) => {
  try {
    // Convert answers to object if it's a string
    const parsedAnswers =
      typeof answers === "string" ? JSON.parse(answers) : answers;

    // Validate answers
    if (!parsedAnswers || typeof parsedAnswers !== "object") {
      throw new Error("Answers must be an object or array");
    }

    // Make API call
    const response = await Axios.post(`/api/exam/submit/${examId}`, {
      studentId,
      answers: parsedAnswers,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to submit exam:", error);
    throw error;
  }
};

export const getAllExamResults = async () => {
  const response = await Axios.get("/api/exam/resultList");
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch exam results");
  }
};

export const addStudentRegister = async (studentData) => {
  return Axios.post("/api/student/register", studentData)
    .then((response) => {
      console.log("Student added successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Failed to add student:", error);
      throw error;
    });
};
export const getStudentList = async () => {
  try {
    const response = await Axios.get("/api/student/list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student list:", error);
    throw error;
  }
};
export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await Axios.put(
      `/api/student/edit/${studentId}`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to edit student:", error);
    throw error;
  }
};
export const deleteStudent = async (studentId) => {
  try {
    const response = await Axios.delete(`/api/student/delete/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete student:", error);
    throw error;
  }
};
