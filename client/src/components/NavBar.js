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
import { AppContextAction, useAppContext } from "../context/AppContext";
import PersonIcon from '@material-ui/icons/Person';
import AppLogo from '../components/AppLogo';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.leftNavBarWidth,
            width: `calc(100% - ${theme.leftNavBarWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
}));

// Application header / navigation toolbar
export default function NavBar(props) {
    const [state, dispatch] = useAppContext();
    const classes = useStyles();

    const handleLeftNavToggle = () => {
        dispatch({ type: AppContextAction.SHOW_LEFT_NAV, show: !state.showLeftNav });
    };

    return (
        <AppBar position="fixed"
            elevation={2}
            className={clsx(classes.appBar, {
                [classes.appBarShift]: state.showLeftNav,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleLeftNavToggle}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: state.showLeftNav,
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