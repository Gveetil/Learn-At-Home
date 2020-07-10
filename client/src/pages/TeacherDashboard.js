import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import InboxIcon from '@material-ui/icons/Inbox';
import AppTreeView from '../components/AppTreeView';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavigationPanel from "../components/NavigationPanel";
import NavigationWrapper from "../components/NavigationWrapper";
import { useAppContext } from "../context/AppContext";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewAssignment from "../components/teacher/NewAssignment";

const useStyles = makeStyles((theme) => ({

}));

const treeViewOptions = [
    { id: 'new', title: 'New Assignment', icon: AddCircleIcon, color: 'blue', link: '/add' },
    {
        id: 'assignment', title: 'Assignments', icon: AssignmentIcon, link: '/assignment',
        options: [
            { id: 'assignment_draft', title: 'Drafts', icon: DraftsIcon, link: '/assignment?type=draft', },
            { id: 'assignment_posted', title: 'Posted', icon: PostAddIcon, link: '/assignment?type=posted', },
            { id: 'assignment_completed', title: 'Completed', icon: AssignmentTurnedInIcon, link: '/assignment?type=completed', },
        ]
    }, {
        id: 'submission', title: 'Submissions', icon: AssignmentReturnedIcon, link: '/submission',
        options: [
            { id: 'submission_inbox', title: 'Inbox', icon: InboxIcon, link: '/submission?type=inbox', },
            { id: 'submission_inprogress', title: 'In Progress', icon: AssignmentIndIcon, link: '/submission?type=inprogress', },
            { id: 'submission_overdue', title: 'Overdue', icon: AssignmentLateIcon, link: '/submission?type=overdue', },
            { id: 'submission_marked', title: 'Marked', icon: AssignmentTurnedInIcon, link: '/submission?type=marked', },
        ]
    }];

// The teacher home page 
function TeacherDashboard(props) {
    const classes = useStyles();
    const theme = useTheme();
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Box display="flex">
                <NavigationPanel>
                    <AppTreeView
                        defaultExpanded={['assignment', 'submission']}
                        defaultSelected='new'
                        items={treeViewOptions}
                    />
                </NavigationPanel>
                <NavigationWrapper>
                    <NavBar handleLogout={props.handleLogout} />
                    <Box m={2}>
                        <Switch>
                            <Route exact path="/add">
                                <NewAssignment />
                            </Route>
                            <Route path="/assignment">
                                <div>assignment</div>
                            </Route>
                            <Route path="/submission">
                                <div>submission</div>
                            </Route>
                        </Switch>
                    </Box>
                    <Footer />
                </NavigationWrapper>
            </Box>
        </BrowserRouter>
    );
}

export default TeacherDashboard;
