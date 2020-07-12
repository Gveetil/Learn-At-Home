import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from "../context/AppContext";
import Box from '@material-ui/core/Box';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '50px',
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            })
        },
    },
    wrapperShift: {
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '50px',
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.leftNavBarWidth,
            width: `calc(100% - ${theme.leftNavBarWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        },
    },
}));

// Wrapper used to enclose page contents when using the navigation panel
export default function NavigationWrapper(props) {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();
    const classes = useStyles();

    return (
        <Box
            className={clsx(classes.wrapper, {
                [classes.wrapperShift]: state.showLeftNav,
            })}
        >
            {props.children}
        </Box>
    );
}