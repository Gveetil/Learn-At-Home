import React, { useState, useEffect } from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import InboxIcon from '@material-ui/icons/Inbox';
import AppTreeView from '../components/controls/AppTreeView';
import Box from '@material-ui/core/Box';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavigationPanel from "../components/NavigationPanel";
import NavigationWrapper from "../components/NavigationWrapper";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NewAssignment from "../components/teacher/NewAssignment";
import AssignmentList from "../components/teacher/AssignmentList";
import API from '../utils/API';
import { AppContextAction, useAppContext } from "../context/AppContext";
import { TeacherContextAction, useTeacherContext } from '../context/TeacherContext';

// The tree view options available for a teacher
const treeViewOptions = [
    { id: 'new', title: 'New Assignment', icon: AddCircleIcon, link: '/add' },
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

// The teacher dashboard 
function TeacherDashboard(props) {
    /* eslint-disable no-unused-vars */
    const [_, appDispatch] = useAppContext();
    /* eslint-disable no-unused-vars */
    const [__, teacherDispatch] = useTeacherContext();
    const [initialized, setInitialized] = useState(false);

    // Load subjects and classes taught by this user when the page is first loaded
    useEffect(() => {
        async function initializeClassSubjects() {
            try {
                // Load teacher master data
                const results = await API.teacher.getClassSubjects();
                if (results && results.data && results.status === 200) {
                    teacherDispatch({ type: TeacherContextAction.SET_CLASS_SUBJECTS, classSubjects: results.data });
                }
                setInitialized(true);
            } catch (error) {
                appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
            }
        }

        initializeClassSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!initialized) {
        return (<div>Loading ...</div>);
    }

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Box display="flex">
                <NavigationPanel>
                    <AppTreeView
                        defaultExpanded={['/assignment', '/submission']}
                        defaultSelected='new'
                        items={treeViewOptions}
                    />
                </NavigationPanel>
                <NavigationWrapper>
                    <NavBar handleLogout={props.handleLogout} />
                    <Box m={2} mb={4}>
                        <Switch>
                            <Route exact path="/add">
                                <NewAssignment />
                            </Route>
                            <Route path="/assignment">
                                <AssignmentList />
                            </Route>
                            <Route path="/submission">
                                <div>submission</div>
                            </Route>
                            <Redirect from="/" to="/add" />
                        </Switch>
                    </Box>
                    <Footer />
                </NavigationWrapper>
            </Box>
        </BrowserRouter>
    );
}

export default TeacherDashboard;
