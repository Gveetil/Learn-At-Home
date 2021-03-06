import React from 'react';
import format from 'date-fns/format';
import { Link, Typography, Divider, Box, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TeacherContextAction, useTeacherContext } from '../../context/TeacherContext';
import { ToastType, AppContextAction, useAppContext } from "../../context/AppContext";
import AssignmentIcon from '@material-ui/icons/Assignment';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AppItemCard from '../controls/AppItemCard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import URLViewer from '../controls/URLViewer';
import ClassViewer from '../controls/ClassViewer';
import { LinkButton } from "../styles";
import API from '../../utils/API';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    content: {
        flexWrap: "nowrap",
        [theme.breakpoints.down('md')]: {
            flexWrap: "wrap",
            flexDirection: "column",
        },
    },
    spacing: {
        marginRight: theme.spacing(0.8),
    },
    cardContent: {
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        "&:last-child": {
            paddingBottom: theme.spacing(2.3),
        }
    },
}));

// This component generates an assignment card based on the assignment passed in
export default function AssignmentCard(props) {
    /* eslint-disable no-unused-vars */
    const [state, appDispatch] = useAppContext();
    /* eslint-disable no-unused-vars */
    const [teacherState, teacherDispatch] = useTeacherContext();
    const classes = useStyles();

    // This function returns the subject name for a given subject id
    function getSubjectName(subjectId) {
        const subject = teacherState.classSubjects.find(item => item.SubjectId === subjectId);
        return (subject) ? subject.SubjectName : "";
    }

    // delete assignment and dependencies
    async function deleteAssignmentHandler(id) {
        try {
            appDispatch({ type: AppContextAction.LOADING, show: true });
            await API.teacher.deleteAssignment(id);
            appDispatch({
                type: AppContextAction.SHOW_TOAST,
                show: true, message: "Assignment deleted successfully!",
                toastType: ToastType.Success
            });
            teacherDispatch({ type: TeacherContextAction.RELOAD_ASSIGNMENTS });
            appDispatch({ type: AppContextAction.LOADING, show: false });
        } catch (error) {
            appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    // Update assignment status to posted
    async function postAssignment(assignment) {
        try {
            appDispatch({ type: AppContextAction.LOADING, show: true });
            await API.teacher.postAssignment({ ...assignment, postedDate: Date.now() });
            appDispatch({
                type: AppContextAction.SHOW_TOAST,
                show: true, message: "Assignment posted successfully!",
                toastType: ToastType.Success
            });
            teacherDispatch({ type: TeacherContextAction.RELOAD_ASSIGNMENTS });
            appDispatch({ type: AppContextAction.LOADING, show: false });
        } catch (error) {
            appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    return (
        <AppItemCard
            toggleIcon={(props.assignment.isLearningTask) ?
                <LibraryBooksIcon />
                : <AssignmentIcon />}
            showDelete={!props.assignment.postedDate}
            palette={(props.assignment.isLearningTask) ? "learningTask" : "assignment"}
            onDelete={deleteAssignmentHandler}
            id={props.assignment.id}
            title={`${getSubjectName(props.assignment.SubjectId)} : ${props.assignment.title}`}>
            <CardContent align="left" className={classes.cardContent}>
                <Box display="flex" alignItems="flex-start" className={classes.content}>
                    <Box display="flex" flexWrap="nowrap" flexGrow={1} alignItems="center">
                        <Typography variant="subtitle2" >
                            {(props.assignment.postedDate) ? "Posted: " : "Created: "}
                        </Typography>
                        <Typography variant="body2" component="p" >
                            {(props.assignment.postedDate) ?
                                format(new Date(props.assignment.postedDate), "dd MMMM yyyy")
                                :
                                format(new Date(props.assignment.updatedAt), "dd MMMM yyyy")}
                        </Typography>
                    </Box>
                    {props.assignment.dueDate &&
                        <Box display="flex" flexWrap="nowrap" flexGrow={0} alignItems="center">
                            <Typography variant="subtitle2" >
                                Due On:
                            </Typography>
                            <Typography variant="body2" component="p" >
                                {format(new Date(props.assignment.dueDate), "dd MMMM yyyy")}
                            </Typography>
                        </Box>}
                </Box>
                <Typography variant="subtitle2" component="p" >
                    Instructions
                </Typography>
                <Typography variant="body2" component="p"
                    style={{ whiteSpace: 'pre-wrap' }}
                    align="justify" >
                    {props.assignment.instructions}
                </Typography>
                <URLViewer pb={1} value={props.assignment.AssignmentLinks} />
                <Box display="flex" alignItems="flex-end" className={classes.content}>
                    <Box display="flex" flexWrap="nowrap" flexGrow={1} alignSelf="flex-start">
                        <ClassViewer value={props.assignment.AssignmentClasses} />
                    </Box>
                    <Box display="flex" flexDirection="column" flexWrap="wrap" flexGrow={1} alignItems="flex-end">
                        {props.assignment.postedDate
                            && !props.assignment.isLearningTask
                            && props.assignment.AssignmentSubmissions[0] &&
                            <Box display="flex" py={1} flexWrap="nowrap" alignItems="center">
                                <Link color="secondary" className={classes.spacing}
                                    variant="body2" href="/submission?type=all">
                                    Submissions: {props.assignment.AssignmentSubmissions[0].StudentsSubmitted}</Link>
                                <Divider orientation="vertical" className={classes.spacing}
                                    flexItem color="secondary" />
                                <Link color="secondary" className={classes.spacing}
                                    variant="body2" href="/submission?type=all">
                                    Pending: {props.assignment.AssignmentSubmissions[0].StudentsPending}</Link>
                            </Box>
                        }
                        {!props.assignment.postedDate &&
                            <Box display="flex" alignItems="flex-end" alignSelf="flex-end">
                                <LinkButton
                                    onClick={() => postAssignment(props.assignment)}>
                                    <PostAddIcon /> Post
                            </LinkButton>
                            </Box>}
                    </Box>
                </Box>
            </CardContent>
        </AppItemCard >
    );
}