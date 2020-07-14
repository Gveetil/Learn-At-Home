import { withStyles } from "@material-ui/core/styles";
import theme from '../utils/theme';
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

// Styled components for re-use within the applicaiton

// Navigation Bar Link Button
export const NavButton = withStyles({
    root: {
        color: theme.palette.header.text,
        marginRight: theme.spacing(1),
        '&:hover': {
            color: theme.palette.header.hoverText,
        },
        '&:focus': {
            color: theme.palette.header.hoverText,
        }
    },
    label: {
        textTransform: 'none',
    },
})(Button);

export const RoundedButton = withStyles({
    root: {
        color: theme.palette.getContrastText(theme.secondary[500]),
        backgroundColor: theme.secondary[500],
        '&:hover': {
            backgroundColor: theme.secondary[700],
        },
        margin: theme.spacing(0.5),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        borderRadius: "16px",
    },
    label: {
        fontWeight: "300",
    }
})(Button);


export const PageHeading = withStyles({
    root: {
        color: theme.palette.primary[700],
        margin: theme.spacing(1),
        fontSize: '1.3rem',
        width: '100%',
        textAlign: 'left',
        fontFamily: "Roboto,Arial,Helvetica,sans-serif",
    },
})(Typography);

