import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import useAuthentication from "./utils/useAuthentication";
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import { TeacherProvider } from "./context/TeacherContext";
import { StudentProvider } from "./context/StudentContext";
import Login from "./pages/Login";

// Styling for the application page body
const styles = theme => ({
  "@global": {
    body: {
      fontFamily: "'Mada', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
  }
});

// Renders the main application root component
function App() {
  const auth = useAuthentication();

  // Returns the user homepage based on the user access type
  function getUserPage(accessTypeId) {
    if (accessTypeId === auth.UserAccessType.Teacher) {
      return (
        <TeacherProvider>
          <TeacherDashboard handleLogout={auth.handleLogout} />
        </TeacherProvider>);
    } else if (accessTypeId === auth.UserAccessType.Student) {
      return (
        <StudentProvider>
          <StudentDashboard handleLogout={auth.handleLogout} />
        </StudentProvider>);
    }
    return "";
  }

  if (!auth.initialized) {
    return (<div>Loading ...</div>);
  }

  if (auth.user.authenticated)
    return getUserPage(auth.user.AccessTypeId);
  else
    return (<Login handleLogin={auth.handleLogin} />);
}

export default withStyles(styles)(App);