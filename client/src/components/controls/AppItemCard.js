import React, { useState } from 'react';
import { Collapse, IconButton, Typography, Card, Box, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

// Styles used by this component
const useStyles = props => makeStyles((theme) => ({
    cardHeader: {
        "&:last-child": {
            padding: 0,
        },
        padding: 0,
        backgroundColor: theme.palette[props.palette].main,
        color: theme.palette[props.palette].contrastText,
    },
    title: {
        padding: 0,
        color: theme.palette[props.palette].contrastText,
        fontSize: (props.fontSize || 'auto'),
    },
    iconButton: {
        padding: (props.buttonSize === "small" ? theme.spacing(1) : 'auto'),
        color: theme.palette[props.palette].contrastText,
    },
}));

// This component generates a custom card for application items
export default function AppItemCard(props) {
    const classes = useStyles(props)();
    const [expanded, setExpanded] = useState(!props.collapse);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardContent className={classes.cardHeader}>
                <Box display="flex" alignItems="center">
                    <Box display="flex" flexGrow={1}
                        alignItems="center">
                        <IconButton
                            size={props.buttonSize || "medium"}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            className={classes.iconButton}>
                            {props.toggleIcon}
                        </IconButton>
                        <Typography variant="subtitle1" component="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                    </Box>
                    {props.showDelete &&
                        (<Box display="flex" flexGrow={0}>
                            <IconButton aria-label="delete"
                                onClick={() => props.onDelete(props.id)}
                                className={classes.iconButton}>
                                <CancelIcon />
                            </IconButton>
                        </Box>)}
                </Box>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse>
        </Card >);
}