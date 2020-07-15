import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import teal from '@material-ui/core/colors/teal';
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
            main: teal[400],
            contrastText: white,
        },
        footer: {
            main: blueGrey[50],
            contrastText: teal[900],
        },
        header: {
            text: blueGrey[700],
            hoverText: 'blue',
        },
        assignment: {
            main: "#d7ccc8",
            contrastText: blueGrey[700],
        },
        learningTask: {
            main: "#c8e6c9",
            contrastText: blueGrey[700],
        },
        button: {
            main: teal[600],
            hover: teal[400],
        },
        navigation: {
            text: blueGrey[700],
            selected: teal[500],
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
            contrastText: "blue",
            hover: blueGrey[50],
        }
    },
    logo: {
        main: teal[600],
        secondary: "#a1887f",
    },
    primary: blueGrey,
    secondary: teal,
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
                backgroundColor: teal[500],
                color: white,
            },
            current: {
                backgroundColor: "light-gray",
                color: "blue",
            },
        },
    },
    typography: {
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