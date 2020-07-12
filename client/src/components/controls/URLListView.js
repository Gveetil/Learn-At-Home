import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { TextField, Box, Grid, Link, InputAdornment, IconButton } from '@material-ui/core';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    iconButton: {
        padding: theme.spacing(0.5),
        color: "#ef5350",
    }
}));

// The URL List View Control 
export default function URLListView(props) {
    const classes = useStyles();
    const [url, setUrl] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    // Update local state on change of form fields
    const handleChange = (event) => {
        setUrl(event.target.value);
    };

    // Add link to list
    const handleClickAddLink = (event) => {
        const newURL = url.trim().toLowerCase();
        setValidationMessage("");
        if (newURL === "") {
            setValidationMessage("Url cannot be empty!");
            return;
        }
        if (props.value.find(item => (item.link === newURL))) {
            setValidationMessage("Url already exists in the list!");
            return;
        }
        // Basic url validaion regex
        if (!newURL.match(/.+\.\w\w.*/)) {
            setValidationMessage("Invalid Url!");
            return;
        }
        props.onChange(props.name, [...props.value, { link: newURL, title: newURL }]);
        setUrl("");
    };

    // Remove link from list
    const handleClickRemoveLink = (removedIndex) => {
        props.onChange(props.name, props.value.filter((_, index) => index !== removedIndex));
    };

    return (
        <Grid container>
            {props.value.map((urlItem, index) =>
                <Grid item xs={12} key={index}>
                    <Box display="flex" p={0} pb={1} alignItems="center">
                        <Box display="flex" flexGrow={0}>
                            <IconButton className={classes.iconButton}
                                aria-label="remove link"
                                onClick={() => handleClickRemoveLink(index)}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Box>
                        <Box display="flex" flexGrow={1}>
                            <Link target="_blank" color="secondary" variant="body2" key={index}
                                href={urlItem.link}>{urlItem.title}</Link>
                        </Box>
                    </Box>
                </Grid>
            )
            }
            <Grid item xs={12} pt={1}>
                <TextField fullWidth color="secondary"
                    label="Add Url Links"
                    id="filled-start-adornment"
                    value={url}
                    onChange={handleChange}
                    helperText={validationMessage}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton
                                color="secondary"
                                aria-label="add link"
                                onClick={handleClickAddLink}
                                edge="end"
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </InputAdornment>),
                    }}
                    variant="filled"
                />
            </Grid>
        </Grid >
    );
}