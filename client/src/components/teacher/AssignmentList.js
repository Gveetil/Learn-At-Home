import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AssignmentCard from './AssignmentCard';
import API from '../../utils/API';
import { AppContextAction, useAppContext } from "../../context/AppContext";
import { TeacherContextAction, useTeacherContext } from '../../context/TeacherContext';
import { Paper, Grid, Box, Typography, Container } from "@material-ui/core";
import { PageHeading } from "../styles"

// The types available for this list
const assignmentTypes = new Map([
    ['all', { type: 'all', title: 'All Assignments', empty: 'No Assignments Found!' }],
    ['draft', { type: 'draft', title: 'Draft Assignments', empty: 'No Assignment Drafts!' }],
    ['posted', { type: 'posted', title: 'Assignments Posted', empty: 'No Assignments Posted!' }],
    ['completed', { type: 'completed', title: 'Completed Assignments', empty: 'No Completed Assignments!' }]
]);

// Assignment List Page
function AssignmentList(props) {
    /* eslint-disable no-unused-vars */
    const [_, appDispatch] = useAppContext();
    const [teacherState, teacherDispatch] = useTeacherContext();
    const [initialized, setInitialized] = useState(false);

    const params = new URLSearchParams(props.location.search);
    const listQueryType = params.get("type");
    let listType = assignmentTypes.get(listQueryType);
    // If the assignment type is not found, default to all assignments
    if (!listType) listType = assignmentTypes.get('all');

    // Reload assignments when the page is first loaded and when listType is updated
    useEffect(() => {
        setInitialized(false);
        teacherDispatch({ type: TeacherContextAction.RELOAD_ASSIGNMENTS });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listType]);

    // Load assignments when realod is requested 
    useEffect(() => {
        async function loadAssignments() {
            if (teacherState.reloadAssignments) {
                setInitialized(false);
                try {
                    // Load master data for the first time only
                    appDispatch({ type: AppContextAction.LOADING, show: true });
                    const results = await API.teacher.fetchAssignments(listType.type);
                    if (results && results.data && results.status === 200) {
                        teacherDispatch({ type: TeacherContextAction.SET_ASSIGNMENT_LIST, data: results.data });
                    }
                    appDispatch({ type: AppContextAction.LOADING, show: false });
                } catch (error) {
                    appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
                }
                setInitialized(true);
            }
        }

        loadAssignments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherState.reloadAssignments]);

    if (!initialized) {
        return (<div>Loading ...</div>);
    }

    if (teacherState.assignments != null && teacherState.assignments.length > 0)
        return loadAssignments(listType.title, teacherState.assignments);
    else
        return (
            <Box mb={5}>
                <Paper elevation={3}>
                    <Box align="center" p={5}>
                        <Typography variant="h6" component="h6">
                            {listType.empty}
                        </Typography>
                    </Box>
                </Paper>
            </Box>);
}

// Render all assignments in the list  
function loadAssignments(title, assignmentList) {
    return (
        <Container maxWidth="md" align="center" >
            {(title !== "") &&
                (<Box my={3} >
                    <PageHeading>
                        {title}
                    </PageHeading>
                </Box>)}
            <Box align="left" mt={1}>
                <Grid container justify="center" spacing={2}>
                    {assignmentList.map((assignment, index) => (
                        <Grid item xs={12} key={index}>
                            <AssignmentCard assignment={assignment} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default withRouter(AssignmentList);
