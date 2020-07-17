import axios from "axios";

export default {
  // User APIs
  user: {
    login: function (data) {
      return axios.post("/api/user/login", data);
    },
    getCurrentUser: function () {
      return axios.get("/api/user/getUser");
    },
    logout: function () {
      return axios.get("/api/user/logout");
    },
  },
  // Student APIs
  student: {
    getClassSubjects: function () {
      return axios.get("/api/student/classsubjects");
    },
    fetchTasks: function (taskType) {
      return axios.get(`/api/student/tasks/${taskType}`);
    },
    createSubmission: function (data) {
      return axios.post("/api/student/submission", data);
    },
  },
  // Teacher APIs
  teacher: {
    getClassSubjects: function () {
      return axios.get("/api/teacher/classsubjects");
    },
    createAssignment: function (data) {
      return axios.post("/api/teacher/assignment", data);
    },
    fetchAssignments: function (assignmentType) {
      return axios.get(`/api/teacher/assignments/${assignmentType}`);
    },
    deleteAssignment: function (id) {
      return axios.delete(`/api/teacher/assignment/${id}`);
    },
    postAssignment: function (data) {
      return axios.put(`/api/teacher/assignment`, data);
    },
    fetchSubmissions: function (submissionType) {
      return axios.get(`/api/teacher/submission/${submissionType}`);
    },
    fetchRatings: function () {
      return axios.get(`/api/teacher/ratings`);
    },
    createSubmission: function (data) {
      return axios.post("/api/teacher/submission", data);
    },
    updateSubmission: function (data) {
      return axios.put("/api/teacher/submission", data);
    },
  },
};