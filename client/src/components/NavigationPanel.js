import React, { Children } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { AppContextAction, useAppContext } from "../context/AppContext";

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    drawer: {
        paddingRight: "2",
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
        },
    },
    toolbar: {
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
    const theme = useTheme();

    const handleLeftNavToggle = () => {
        dispatch({ type: AppContextAction.SHOW_LEFT_NAV, show: !state.showLeftNav });
    };

    return (
        <div className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={state.showLeftNav}
                    onClose={handleLeftNavToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {props.children}
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
                        <div className={classes.toolbar} >
                            <IconButton onClick={handleLeftNavToggle}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        {props.children}
                    </div>
                </Drawer>
            </Hidden>
        </div>
    );
}

export default LeftNavPanel;
