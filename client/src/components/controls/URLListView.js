import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { FormHelperText, FormControl, Grid, Link, InputAdornment, InputLabel, Input, IconButton } from '@material-ui/core';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    iconButton: {
        padding: 0,
        color: "red",
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
        setValidationMessage("");
        if (url.trim() === "") {
            setValidationMessage("Url cannot be empty!");
            return;
        }
        if (props.value.includes(url.trim().toLowerCase()) > 0) {
            setValidationMessage("Url already exists in the list!");
            return;
        }
        console.log(event.target.parentElement.parentElement);
        // Basic url validaion regex
        if (!url.match(/.+\.\w\w.*/)) {
            setValidationMessage("Invalid Url!");
            return;
        }
        props.onChange(props.name, [...props.value, url.trim().toLowerCase()]);
        setUrl("");
    };

    // Remove link from list
    const handleClickRemoveLink = (removedIndex) => {
        props.onChange(props.name, props.value.filter((_, index) => index !== removedIndex));
    };

    return (
        <Grid container>
            {props.value.map((urlItem, index) =>
                <Grid container item xs={12} alignItems="center" spacing={0}>
                    <Grid item xs={1}>
                        <IconButton className={classes.iconButton}
                            aria-label="remove link"
                            onClick={() => handleClickRemoveLink(index)}
                        >
                            <HighlightOffIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={11}>
                        <Link target="_blank" color="secondary" variant="body2" key={index}
                            href={urlItem}>{urlItem}</Link>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12}>
                <FormControl className={classes.margin} fullWidth
                    color="secondary" >
                    <InputLabel htmlFor="urlSelector">Url Links</InputLabel>
                    <Input
                        id="urlSelector"
                        value={url}
                        onChange={handleChange}
                        aria-describedby="urlSelectorHelperText"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="secondary"
                                    aria-label="add link"
                                    onClick={handleClickAddLink}
                                >
                                    <AddCircleIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="urlSelectorHelperText">{validationMessage}</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
}