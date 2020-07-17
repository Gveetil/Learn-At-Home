import React from 'react';
import format from 'date-fns/format';
import { Grid, Typography, Box, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTeacherContext } from '../../context/TeacherContext';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AppItemCard from '../controls/AppItemCard';
import SubmissionCard from './SubmissionCard';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    content: {
        flexWrap: "nowrap",
        [theme.breakpoints.down('xs')]: {
            flexWrap: "wrap",
            flexDirection: "column",
        },
    },
    cardContent: {
        backgroundColor: theme.palette.taskSubmissionList.body,
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        "&:last-child": {
            paddingBottom: theme.spacing(2),
        }
    },
}));

// This component generates a task submissions card based on the task 
// and submissions passed in
export default function TaskSubmissionsCard(props) {
    /* eslint-disable no-unused-vars */
    const [teacherState, _] = useTeacherContext();
    const classes = useStyles();

    // This function returns the subject name for a given subject id
    function getSubjectName(subjectId) {
        const subject = teacherState.classSubjects.find(item => item.SubjectId === subjectId);
        return (subject) ? subject.SubjectName : "";
    }

    return (
        <AppItemCard
            toggleIcon={<AssignmentIcon />}
            palette="taskSubmissionList"
            id={props.task.id}
            title={`${getSubjectName(props.task.SubjectId)} : ${props.task.title}`}>
            <CardContent align="left" className={classes.cardContent}>
                <Box display="flex" alignItems="flex-start" className={classes.content}>
                    <Box display="flex" flexWrap="nowrap" flexGrow={1} alignItems="center">
                        <Typography variant="subtitle2" >
                            Due On:
                        </Typography>
                        <Typography variant="body2" component="p" >
                            {format(new Date(props.task.dueDate), "dd MMMM yyyy")}
                        </Typography>
                    </Box>
                </Box>
                <Box align="left" mt={2} mb={1}>
                    <Grid container spacing={3}>
                        {props.submissions.map((task, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <SubmissionCard
                                    collapse={props.collapse}
                                    hasSubmission={task.Submission && task.Submission.submissionDate}
                                    isMarked={task.Submission && task.Submission.markedDate}
                                    {...task}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </CardContent>
        </AppItemCard >
    );
}