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
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.button.main,
        '&:hover, &.active:hover': { backgroundColor: theme.palette.button.hover, },
        margin: theme.spacing(0.5),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginTop: "auto",
        borderRadius: "16px",
    },
})(Button);

export const SecondaryLinkButton = withStyles({
    root: {
        color: theme.palette.linkButton.secondaryText,
        backgroundColor: theme.palette.linkButton.main,
        '&:hover, &.active:hover': { backgroundColor: theme.palette.linkButton.hover, },
        padding: theme.spacing(0.6),
        paddingRight: theme.spacing(1.7),
        paddingLeft: 0,
        '& > span > svg': {
            marginRight: theme.spacing(1),
        },
        borderRadius: "4px",
        margin: "0",
        [theme.breakpoints.down('xs')]: {
            '& > span > svg': {
                marginRight: theme.spacing(0.5),
                width: 0,
            }
        }
    },
    label: {
        textTransform: 'none',
    }
})(Button);

export const PageHeading = withStyles({
    root: {
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
        fontSize: '1.3rem',
        width: '100%',
        textAlign: 'left',
    },
})(Typography);

// Regular Button used in the application 
export const AppButton = withStyles({
    root: {
        margin: theme.spacing(0.5),
        borderRadius: "16px",
        padding: theme.spacing(0.6),
        paddingRight: theme.spacing(1.7),
        paddingLeft: theme.spacing(1.2),
        '& > span > svg': {
            marginRight: theme.spacing(1),
        },
        marginTop: "auto",
        [theme.breakpoints.down('xs')]: {
            '& > span > svg': {
                marginRight: theme.spacing(0.5),
                width: 0,
            }
        }
    },
})(Button);

export const LinkButton = withStyles({
    root: {
        color: theme.palette.linkButton.contrastText,
        backgroundColor: theme.palette.linkButton.main,
        '&:hover, &.active:hover': { backgroundColor: theme.palette.linkButton.hover, },
        padding: theme.spacing(0.6),
        margin: 0,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        '& > span > svg': {
            marginRight: theme.spacing(0.6),
        },
        borderRadius: "4px",
        marginTop: "auto",
        [theme.breakpoints.down('xs')]: {
            '& > span > svg': {
                marginRight: theme.spacing(0.5),
                width: 0,
            }
        }
    },
    label: {
        textTransform: 'none',
    }
})(Button);

export const NavigationTitle = withStyles({
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.navigation.title,
        color: theme.palette.navigation.text,
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
    }
})(Typography);