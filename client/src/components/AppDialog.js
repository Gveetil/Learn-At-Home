import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { AppContextAction, useAppContext } from "../context/AppContext";

// The dialog component used by the application 
export default function AppDialog() {
    const [state, dispatch] = useAppContext();

    // Close the dialog box
    const handleClose = () => {
        dispatch({ type: AppContextAction.SHOW_DIALOG, show: false });
    };

    return (
        <div>
            <Dialog fullWidth maxWidth='xs'
                open={state.dialog.show}
                onClose={handleClose}
                aria-labelledby="dialog-title">
                <DialogTitle id="dialog-title">Learn@Home</DialogTitle>
                <DialogContent>
                    <DialogContentText color="textPrimary">
                        {state.dialog.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}