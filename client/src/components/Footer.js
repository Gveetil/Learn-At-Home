import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Toolbar, Typography } from '@material-ui/core';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.footer.main,
        color: theme.palette.footer.contrastText,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
    },
}));

// The page footer component 
export default function Footer() {
    const classes = useStyles();
    return (
        <Toolbar component="footer" className={classes.footer}>
            <Box display="flex" margin="auto">
                <Typography variant="caption" color="inherit">
                    Learn@Home © 2020.
                </Typography>
            </Box >
        </Toolbar>
    )
}