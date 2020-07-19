import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { DialogTitle, DialogContent, Dialog, DialogActions, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

// Demo users available in the system
const userData = [
    { type: 'Teacher', value: 'dprice' },
    { type: 'Student', value: 'klee' },
];

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.secondary.contrastText,
        color: theme.palette.secondary.main,
    },
    listItem: {
        color: theme.palette.secondary.main,
    },
}));

// Poperties
UserDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

// This dialog helps with user selection for demo of the application  
export default function UserDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    // Close the dialog box
    const handleClose = () => {
        onClose("");
    };

    // Close the dialog box and select user
    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose}
            fullWidth maxWidth="xs"
            aria-labelledby="user-dialog-title" open={open}>
            <DialogTitle id="user-dialog-title">Pick a Demo User ...</DialogTitle>
            <DialogContent>
                <List>
                    {userData.map((user) => (
                        <ListItem button onClick={() => handleListItemClick(user.value)} key={user.value}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className={classes.listItem} primary={user.type} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
