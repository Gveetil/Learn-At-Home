import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

// The Select Dropdown Control used by the application 
export default function AppSelect(props) {
    const classes = useStyles();
    return (
        <FormControl required fullWidth
            color="secondary"
            variant="filled">
            <InputLabel id={props.name}>{props.label}</InputLabel>
            <Select
                labelId={props.name}
                color="secondary"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className={classes.selectEmpty}>
                {props.data.map(item =>
                    <MenuItem key={item.value}
                        value={item.value}>{item.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}