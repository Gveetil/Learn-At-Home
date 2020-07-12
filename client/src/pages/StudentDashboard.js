import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppTreeView from '../components/controls/AppTreeView';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavigationPanel from "../components/NavigationPanel";
import NavigationWrapper from "../components/NavigationWrapper";
import { useAppContext } from "../context/AppContext";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import InboxIcon from '@material-ui/icons/Inbox';
import DescriptionIcon from '@material-ui/icons/Description';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

// The tree view options available for a student
const treeViewOptions = [
    { id: 'all', title: 'All', icon: InboxIcon, },
    {
        id: 'assignment', title: 'Assignments', icon: AssignmentIcon,
        options: [
            { id: 'assignment_active', title: 'Active', icon: AssignmentReturnedIcon, },
            { id: 'assignment_completed', title: 'Completed', icon: AssignmentTurnedInIcon, },
        ]
    }, {
        id: 'task', title: 'Learning Tasks', icon: LibraryBooksIcon,
        options: [
            { id: 'task_active', title: 'Active', icon: DescriptionIcon, },
            { id: 'task_completed', title: 'Completed', icon: LibraryAddCheckIcon, },
        ]
    }];

// The student dashboard 
function StudentDashboard(props) {
    const classes = useStyles();
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();
    return (
        <div >
            <Box display="flex">
                <NavigationPanel>
                    <AppTreeView
                        defaultExpanded={['assignment', 'task']}
                        defaultSelected='all'
                        items={treeViewOptions}
                    />
                </NavigationPanel>
                <NavigationWrapper>
                    <NavBar handleLogout={props.handleLogout} />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                            donec massa sapien faucibus et molestie ac.
                    </Typography>
                        <Typography paragraph>
                            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                     </Typography>
                    </main>
                    <Footer />
                </NavigationWrapper>
            </Box>
        </div >
    );
}

export default StudentDashboard;
