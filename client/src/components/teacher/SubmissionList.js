import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TaskSubmissionsCard from './TaskSubmissionsCard';
import API from '../../utils/API';
import { AppContextAction, useAppContext } from "../../context/AppContext";
import { TeacherContextAction, useTeacherContext } from '../../context/TeacherContext';
import { Paper, Grid, Box, Typography, Container } from "@material-ui/core";
import { PageHeading } from "../styles"

// The types available for this list
const submissionTypes = new Map([
    ['all', { type: 'all', title: 'All Submissions', empty: 'No Submissions Found!', collapse: false }],
    ['inbox', { type: 'inbox', title: 'New Submissions', empty: 'No New Submissions!', collapse: false }],
    ['inprogress', { type: 'inprogress', title: 'Awaiting Submission', empty: 'No Assignments Awaiting Submission!', collapse: true }],
    ['overdue', { type: 'overdue', title: 'Submissions Overdue', empty: 'No Submissions Overdue!', collapse: true }],
    ['marked', { type: 'marked', title: 'Submissions Marked', empty: 'No Submissions Marked!', collapse: false }],
]);

// Submission List Page
function SubmissionList(props) {
    /* eslint-disable no-unused-vars */
    const [_, appDispatch] = useAppContext();
    const [teacherState, teacherDispatch] = useTeacherContext();
    const [initialized, setInitialized] = useState(false);

    const params = new URLSearchParams(props.location.search);
    const listQueryType = params.get("type");
    let listType = submissionTypes.get(listQueryType);
    // If the submission type is not found, default to all submissions
    if (!listType) listType = submissionTypes.get('all');

    // Load ratings when the page is first loaded
    useEffect(() => {
        async function initializeRatings() {
            try {
                // Check if ratings are loaded 
                if (teacherState.ratings.length <= 0) {
                    // Fetch ratings 
                    const results = await API.teacher.fetchRatings();
                    if (results && results.data && results.status === 200) {
                        teacherDispatch({ type: TeacherContextAction.SET_RATINGS, data: results.data });
                    }
                }
            } catch (error) {
                appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
            }
        }

        initializeRatings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reload submissions when the page is first loaded and when listType is updated
    useEffect(() => {
        setInitialized(false);
        teacherDispatch({ type: TeacherContextAction.RELOAD_SUBMISSIONS });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listType]);

    // Load submissions when realod is requested 
    useEffect(() => {
        async function loadSubmissions() {
            if (teacherState.reloadSubmissions) {
                setInitialized(false);
                try {
                    const results = await API.teacher.fetchSubmissions(listType.type);
                    if (results && results.data && results.status === 200) {
                        teacherDispatch({ type: TeacherContextAction.SET_SUBMISSION_LIST, data: results.data });
                    }
                } catch (error) {
                    appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
                }
                setInitialized(true);
            }
        }

        loadSubmissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherState.reloadSubmissions]);

    if (!initialized) {
        return (<div>Loading ...</div>);
    }

    if (teacherState.submissions != null && teacherState.submissions.length > 0)
        return renderSubmissions(listType.title, teacherState.submissions, listType.collapse);
    else
        return (
            <Container maxWidth="lg" align="center" >
                <Paper elevation={3}>
                    <Box align="center" mt={5} p={5}>
                        <Typography variant="h6" component="h6">
                            {listType.empty}
                        </Typography>
                    </Box>
                </Paper>
            </Container>);
}

// Render all submissions in the list  
function renderSubmissions(title, submissionList, collapseItems) {
    return (
        <Container maxWidth="lg" align="center" >
            {(title !== "") &&
                (<Box my={3} mt={4}>
                    <PageHeading>
                        {title}
                    </PageHeading>
                </Box>)}
            <Box align="left" mt={1}>
                <Grid container justify="center" spacing={3}>
                    {fetchTaskSubmissionGroups(submissionList).map((task, index) => (
                        <Grid item xs={12} key={index}>
                            <TaskSubmissionsCard
                                collapse={collapseItems}
                                {...task}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

// This function sorts the submission list data and returns an array of tasks
// with the related submissions nested inside it
function fetchTaskSubmissionGroups(submissionList) {
    if (!submissionList || submissionList.length <= 0)
        return [];

    // Data is ordered by assignment id, so create new group when id changes
    const taskSubmissionGroups = [];
    let currentAssignment = submissionList[0].Assignment;
    let currentSubmissions = [];
    submissionList.forEach(item => {
        if (item.AssignmentId === currentAssignment.id) {
            currentSubmissions.push(item);
        } else {
            // Add assignment to group 
            taskSubmissionGroups.push({
                task: currentAssignment,
                submissions: currentSubmissions
            });
            // Start new group
            currentAssignment = item.Assignment;
            currentSubmissions = [];
            currentSubmissions.push(item);
        }
    });
    // Add the last assignment to group
    taskSubmissionGroups.push({
        task: currentAssignment,
        submissions: currentSubmissions
    })
    return taskSubmissionGroups;
}

export default withRouter(SubmissionList);
