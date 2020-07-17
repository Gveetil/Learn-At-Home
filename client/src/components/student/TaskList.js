import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TaskCard from './TaskCard';
import API from '../../utils/API';
import { AppContextAction, useAppContext } from "../../context/AppContext";
import { StudentContextAction, useStudentContext } from '../../context/StudentContext';
import { Paper, Grid, Box, Typography, Container } from "@material-ui/core";
import { PageHeading } from "../styles"

// The types available for this list
const taskTypes = new Map([
    ['all', { type: 'all', title: 'All Tasks', empty: 'No Tasks Found!' }],
    ['assignment', { type: 'assignment', title: 'All Assignments', empty: 'No Assignments Posted!' }],
    ['assignment_active', { type: 'assignment_active', title: 'Active Assignments', empty: 'No Active Assignments!' }],
    ['assignment_completed', { type: 'assignment_completed', title: 'Completed Assignments', empty: 'No Completed Assignments!' }],
    ['task', { type: 'task', title: 'All Learning Tasks', empty: 'No Learning Tasks Posted!' }],
    ['task_active', { type: 'task_active', title: 'Active Learning Tasks', empty: 'No Active Learning Tasks!' }],
    ['task_completed', { type: 'task_completed', title: 'Completed Learning Tasks', empty: 'No Completed Learning Tasks!' }]
]);

// Task List Page 
function TaskList(props) {
    /* eslint-disable no-unused-vars */
    const [_, appDispatch] = useAppContext();
    const [studentState, studentDispatch] = useStudentContext();
    const [initialized, setInitialized] = useState(false);

    const params = new URLSearchParams(props.location.search);
    const listQueryType = params.get("type");
    let listType = taskTypes.get(listQueryType);
    // If the task type is not found, default to all tasks
    if (!listType) listType = taskTypes.get('all');

    // Reload tasks when the page is first loaded and when listType is updated
    useEffect(() => {
        setInitialized(false);
        studentDispatch({ type: StudentContextAction.RELOAD_TASKS });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listType]);

    // Load tasks when reload is requested 
    useEffect(() => {
        async function loadTasks() {
            if (studentState.reloadTasks) {
                setInitialized(false);
                try {
                    const results = await API.student.fetchTasks(listType.type);
                    if (results && results.data && results.status === 200) {
                        studentDispatch({ type: StudentContextAction.SET_TASK_LIST, data: results.data });
                    }
                } catch (error) {
                    appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
                }
                setInitialized(true);
            }
        }

        loadTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentState.reloadTasks]);

    if (!initialized) {
        return (<div>Loading ...</div>);
    }

    if (studentState.tasks != null && studentState.tasks.length > 0)
        return renderTasks(listType.title, studentState.tasks);
    else
        return (
            <Container maxWidth="md" align="center" >
                <Paper elevation={3}>
                    <Box align="center" mt={5} p={5}>
                        <Typography variant="h6" component="h6">
                            {listType.empty}
                        </Typography>
                    </Box>
                </Paper>
            </Container>);
}

// Render all tasks in the list  
function renderTasks(title, taskList) {
    return (
        <Container maxWidth="md" align="center" >
            {(title !== "") &&
                (<Box my={3} mt={4}>
                    <PageHeading>
                        {title}
                    </PageHeading>
                </Box>)}
            <Box align="left" mt={1}>
                <Grid container justify="center" spacing={3}>
                    {taskList.map((task, index) => (
                        <Grid item xs={12} key={index}>
                            <TaskCard task={task}
                                isSubmitted={(task.Submissions && task.Submissions.length > 0)} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default withRouter(TaskList);
