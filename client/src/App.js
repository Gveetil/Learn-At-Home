import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import useAuthentication from "./utils/useAuthentication";
import AppDashboard from './pages/AppDashboard';
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
        <AppDashboard handleLogout={auth.handleLogout} /> :
        <Login handleLogin={auth.handleLogin} />}
    </>
  );
}

export default withStyles(styles)(App);