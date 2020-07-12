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
            contrastText: teal[500],
        },
        header: {
            text: blueGrey[700],
            hoverText: 'blue',
        },
        navigation: {
            text: blueGrey[700],
            selected: 'blue',
            background: blueGrey[50],
            hover: grey[100],
        },
    },
    logo: {
        main: teal[500],
        secondary: "#bf360c",
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
    IMAGE_FOLDER_PATH
});

export default theme;