import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { NavButton } from './styles';
import { useAppContext } from "../context/AppContext";
import PersonIcon from '@material-ui/icons/Person';
import AppLogo from '../components/AppLogo';

const drawerWidth = 0;

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: 36,
        //marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

// Application header / navigation toolbar
export default function NavBar(props) {
    const [state, _] = useAppContext();
    const classes = useStyles();

    return (
        <AppBar position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
            })}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: props.open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <div className={classes.title}>
                    <AppLogo variant="h6" />
                </div>
                <NavButton onClick={props.handleLogout}>Logout</NavButton>
                <Hidden xsDown>
                    <Chip icon={<PersonIcon />} label={state.user.firstName} />
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}