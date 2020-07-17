import React, { Suspense, lazy } from "react";
import 'typeface-mada';
import Login from "./pages/Login";
import useAuthentication from "./utils/useAuthentication";
import { TeacherProvider } from "./context/TeacherContext";
import { StudentProvider } from "./context/StudentContext";
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));

// Renders the main application root component
function App() {
  const auth = useAuthentication();

  // Returns the user homepage based on the user access type
  function getUserPage(accessTypeId) {
    if (accessTypeId === auth.UserAccessType.Teacher) {
      return (
        <Suspense fallback={<div>Loading ...</div>}>
          <TeacherProvider>
            <TeacherDashboard handleLogout={auth.handleLogout} />
          </TeacherProvider>
        </Suspense>);
    } else if (accessTypeId === auth.UserAccessType.Student) {
      return (
        <Suspense fallback={<div>Loading ...</div>}>
          <StudentProvider>
            <StudentDashboard handleLogout={auth.handleLogout} />
          </StudentProvider>
        </Suspense>);
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

export default App;