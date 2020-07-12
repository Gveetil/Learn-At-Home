import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from "../context/AppContext";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.background,
    },
}));

// The backdrop displayed in the application when items are loading, etc. 
export default function AppBackDrop() {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={state.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}