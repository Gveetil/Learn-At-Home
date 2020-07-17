import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import secondaryColor from '@material-ui/core/colors/cyan';
import path from 'path';

// Path to images folder
const IMAGE_FOLDER_PATH = path.join(process.env.PUBLIC_URL, "/images/");
const white = "#FFF";

// Create a theme instance to be used to style the application.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[50],
            contrastText: blueGrey[800],

        },
        secondary: {
            main: secondaryColor[800],
            contrastText: white,
        },
        footer: {
            main: blueGrey[50],
            contrastText: secondaryColor[900],
        },
        header: {
            text: secondaryColor[800],
            hoverText: secondaryColor[600],
        },
        assignment: {
            main: "#c5cae9",
            contrastText: blueGrey[700],
        },
        learningTask: {
            main: "#c8e6c9",
            contrastText: blueGrey[700],
        },
        taskSubmissionList: {
            main: grey[200],
            body: grey[100],
            contrastText: blueGrey[600],
        },
        submitted: {
            main: "#a5d6a7",
            contrastText: blueGrey[700],
        },
        notSubmitted: {
            main: "#d7ccc8",
            contrastText: blueGrey[700],
        },
        button: {
            main: secondaryColor[700],
            hover: secondaryColor[600],
        },
        navigation: {
            text: blueGrey[700],
            selected: secondaryColor[700],
            background: blueGrey[50],
            hover: grey[100],
            sidePanel: grey[100],
            title: blueGrey[50],
        },
        delete: {
            main: "#ef5350",
        },
        linkButton: {
            main: "white",
            contrastText: secondaryColor[700],
            secondaryText: "blue",
            hover: blueGrey[50],
        }
    },
    logo: {
        main: "#00897b",
        secondary: "#ba000d",
    },
    primary: blueGrey,
    secondary: secondaryColor,
    leftNavBarWidth: 250,
    overrides: {
        MuiSelect: {
            root: {
                width: "100%"
            }
        },
        MuiFilledInput: {
            root: {
                backgroundColor: "#f8f9fa",
                "&$focused": {
                    backgroundColor: "#f1f3f4",
                },
                "&:hover": {
                    backgroundColor: "#f1f3f4",
                },
            },
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: secondaryColor[500],
                color: white,
            },
            current: {
                backgroundColor: "light-gray",
                color: "blue",
            },
        },
    },
    typography: {
        "fontFamily": `"Mada", "Cantarell", "Open Sans", sans-serif`,
        subtitle1: {
            color: blueGrey[700],
            fontWeight: 'bold',
        },
        subtitle2: {
            color: blueGrey[700],
            fontWeight: '600',
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
            paddingRight: '0.2rem',
        },
    },
    IMAGE_FOLDER_PATH
});

export default theme;