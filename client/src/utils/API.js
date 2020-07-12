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

  },
  // Teacher APIs
  teacher: {
    getClassSubjects: function () {
      return axios.get("/api/teacher/classsubjects");
    },
    createAssignment: function (data) {
      return axios.post("/api/teacher/assignment", data);
    },
  },
};