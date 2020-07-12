import 'date-fns';
import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// The Date Picker Control 
export default function DatePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                color="secondary"
                disableToolbar
                disabled={props.disabled}
                disablePast={props.disablePast}
                autoOk={true}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                name={props.name}
                label={props.label}
                value={props.disabled ? null : props.value}
                onChange={(date) => props.onChange(props.name, date)}
                InputLabelProps={{
                    shrink: true,
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}