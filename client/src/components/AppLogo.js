import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {

    },
    textColor: {
        color: theme.logo.main,
    },
    symbolColor: {
        color: theme.logo.secondary,
    },
}));

// The Application Logo
export default function AppLogo(props) {
    const classes = useStyles();
    return (<div>
        <Typography display="inline" className={classes.textColor} {...props} >Learn</Typography>
        <Typography display="inline" className={classes.symbolColor} {...props} >@</Typography>
        <Typography display="inline" className={classes.textColor} {...props} >Home</Typography>
    </div>)
};