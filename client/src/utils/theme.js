import { createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';

const white = "#FFF";
const black = "#000";

// Create a theme instance to be used to style the application.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: brown[50],
            contrastText: brown[800],
        },
        secondary: {
            main: teal[400],
            contrastText: white,
        },
        footer: {
            main: brown[50],
            contrastText: brown[800],
        },
        header: {
            text: teal[500],
            activeText: "#5e35b1",
            hoverText: "#5e35b1",
        },
    },
    logo: {
        main: teal[700],
        secondary: "#bf360c",
    },
    primary: brown,
    secondary: teal,
});

export default theme;