import React from 'react';
import path from 'path';
import { withStyles } from "@material-ui/core/styles";

// Path to images folder
const IMAGE_FOLDER_PATH = path.join(process.env.PUBLIC_URL, "/images/");

// Styling for the application page body
const styles = theme => ({
  "@global": {
    body: {
      margin: 0,
      minHeight: "100vh",
      fontFamily: "'Mada', 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundImage: `url(${IMAGE_FOLDER_PATH}background.jpg)`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#000",
    },
  }
});

function App() {
  return (
    <div > Learn@Home
    </div>
  );
}

export default withStyles(styles)(App);
