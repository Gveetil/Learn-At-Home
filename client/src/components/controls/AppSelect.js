import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

// The Select Dropdown Control used by the application 
export default function AppSelect(props) {
    const classes = useStyles();
    return (
        <FormControl required fullWidth>
            <InputLabel id={props.name}>{props.label}</InputLabel>
            <Select
                labelId={props.name}
                color="secondary"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className={classes.selectEmpty}
                InputLabelProps={{
                    shrink: true,
                }}
            >
                {props.data.map(item =>
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}