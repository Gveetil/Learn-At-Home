import React, { useState, useEffect } from 'react';
import AppTreeView from '../components/controls/AppTreeView';
import Box from '@material-ui/core/Box';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavigationPanel from "../components/NavigationPanel";
import NavigationWrapper from "../components/NavigationWrapper";
import { AppContextAction, useAppContext } from "../context/AppContext";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import InboxIcon from '@material-ui/icons/Inbox';
import DescriptionIcon from '@material-ui/icons/Description';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TaskList from "../components/student/TaskList";
import API from '../utils/API';
import { StudentContextAction, useStudentContext } from '../context/StudentContext';
import { NavigationTitle } from '../components/styles';
import { Divider } from '@material-ui/core';

// The tree view options available for a student
const treeViewOptions = [
    { id: 'all', title: 'All', icon: InboxIcon, link: '/task' },
    {
        id: 'assignment', title: 'Assignments', icon: AssignmentIcon, link: '/task?type=assignment',
        options: [
            { id: 'assignment_active', title: 'Active', icon: AssignmentReturnedIcon, link: '/task?type=assignment_active' },
            { id: 'assignment_completed', title: 'Completed', icon: AssignmentTurnedInIcon, link: '/task?type=assignment_completed' },
        ]
    }, {
        id: 'task', title: 'Learning Tasks', icon: LibraryBooksIcon, link: '/task?type=task',
        options: [
            { id: 'task_active', title: 'Active', icon: DescriptionIcon, link: '/task?type=task_active' },
            { id: 'task_completed', title: 'Completed', icon: LibraryAddCheckIcon, link: '/task?type=task_completed' },
        ]
    }];

// The student dashboard 
function StudentDashboard(props) {
    /* eslint-disable no-unused-vars */
    const [_, appDispatch] = useAppContext();
    /* eslint-disable no-unused-vars */
    const [studentState, studentDispatch] = useStudentContext();
    const [initialized, setInitialized] = useState(false);

    // Load subjects and classes taught by this user when the page is first loaded
    useEffect(() => {
        async function initializeClassSubjects() {
            try {
                // Load student master data
                const results = await API.student.getClassSubjects();
                if (results && results.data && results.status === 200) {
                    studentDispatch({ type: StudentContextAction.SET_CLASS_SUBJECTS, classSubjects: results.data });
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
                    <NavigationTitle>{studentState.classSubjects[0].ClassName}</NavigationTitle>
                    <Divider />
                    <AppTreeView
                        defaultExpanded={['/task?type=assignment', '/task?type=task']}
                        defaultSelected='all'
                        items={treeViewOptions}
                    />
                </NavigationPanel>
                <NavigationWrapper>
                    <NavBar handleLogout={props.handleLogout} />
                    <Box m={2} mb={4}>
                        <Switch>
                            <Route path="/task">
                                <TaskList />
                            </Route>
                            <Redirect from="/" to="/task" />
                        </Switch>
                    </Box>
                    <Footer />
                </NavigationWrapper>
            </Box>
        </BrowserRouter>
    );
}

export default StudentDashboard;
