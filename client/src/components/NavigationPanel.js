import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { AppContextAction, useAppContext } from "../context/AppContext";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    drawer: {
        paddingRight: "2",
        overflowX: 'hidden',
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
        },
    },
    toolbar: {
        backgroundColor: theme.palette.navigation.sidePanel,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

// The Left Navigation Panel
function LeftNavPanel(props) {
    const [state, dispatch] = useAppContext();
    const classes = useStyles();

    const handleLeftNavToggle = () => {
        dispatch({ type: AppContextAction.SHOW_LEFT_NAV, show: !state.showLeftNav });
    };

    return (
        <div className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={!state.showLeftNav}
                    onClose={handleLeftNavToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <div onClick={handleLeftNavToggle} >
                        {props.children}
                    </div>
                </Drawer>
            </Hidden>
            <Hidden xsDown>
                <Drawer
                    anchor="left"
                    variant="persistent"
                    open={state.showLeftNav}
                    onClose={handleLeftNavToggle}
                >
                    <div>
                        <Box mb={1}>
                            <Paper className={classes.toolbar} square elevation={2}>
                                <IconButton onClick={handleLeftNavToggle}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Paper>
                        </Box>
                        {props.children}
                    </div>
                </Drawer>
            </Hidden>
        </div>
    );
}

export default LeftNavPanel;
