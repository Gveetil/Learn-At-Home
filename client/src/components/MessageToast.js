import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AppContextAction, useAppContext } from "../context/AppContext";

// Styling for the Alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// This component displays messages in a toast. 
export default function MessageToast() {
    const [state, dispatch] = useAppContext();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: AppContextAction.SHOW_TOAST, show: false });
    };

    if (state.toast.show) {
        return (
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={state.toast.show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={state.toast.type}>
                    {state.toast.message}
                </Alert>
            </Snackbar>);
    };
    return "";
}
