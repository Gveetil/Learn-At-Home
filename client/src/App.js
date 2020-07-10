import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import useAuthentication from "./utils/useAuthentication";
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
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

  return (
    <>
      {auth.user.authenticated ?
        getUserPage(auth.user.AccessTypeId)
        :
        <Login handleLogin={auth.handleLogin} />}
    </>
  );


  // Returns the user homepage based on the user access type
  function getUserPage(accessTypeId) {
    if (accessTypeId === auth.UserAccessType.Teacher) {
      return <TeacherDashboard handleLogout={auth.handleLogout} />
    } else if (accessTypeId === auth.UserAccessType.Student) {
      return <StudentDashboard handleLogout={auth.handleLogout} />
    }
    return "";
  }
}

export default withStyles(styles)(App);