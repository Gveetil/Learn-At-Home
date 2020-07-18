import React, { useState } from 'react';
import format from 'date-fns/format';
import { Typography, Divider, Box, CardContent, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { TeacherContextAction, useTeacherContext } from '../../context/TeacherContext';
import { ToastType, AppContextAction, useAppContext } from "../../context/AppContext";
import PersonIcon from '@material-ui/icons/Person';
import AppItemCard from '../controls/AppItemCard';
import URLViewer from '../controls/URLViewer';
import AppSelect from '../controls/AppSelect';
import { LinkButton } from "../styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import API from '../../utils/API';

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
        paddingTop: theme.spacing(0),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        }
    },
    commentBox: {
        backgroundColor: theme.palette.primary.main,
    },
    ratingSelect: {
        maxWidth: theme.spacing(20),
        minWidth: theme.spacing(15),
        [theme.breakpoints.down('xs')]: {
            minWidth: '100%',
        },
    },
}));

// Default state of form fields
const defaultState = {
    error: '',
    RatingId: '',
    comment: '',
}

// This component generates a submission card based on the task passed in
export default function SubmissionCard(props) {
    /* eslint-disable no-unused-vars */
    const [state, appDispatch] = useAppContext();
    /* eslint-disable no-unused-vars */
    const [teacherState, teacherDispatch] = useTeacherContext();
    const [formFields, setFormFields] = useState(defaultState);
    const classes = useStyles();

    // Update local state on change of form fields
    const handleInputChange = (event) => {
        let value = event.target.value;
        const name = event.target.name;
        setFormFields({ ...formFields, [name]: value });
        return;
    }

    // Clear submission marking
    function clearRating() {
        //reset fields
        setFormFields(defaultState);
    }

    // Validate form data and set error message
    function validateForm(task) {
        if (!formFields.RatingId) {
            setFormFields({
                ...formFields,
                error: "Please select a rating !",
            });
            return false;
        }
        return true;
    }

    // Submit rating and close assignment
    async function submitRating(task) {
        try {
            // Validate submission before save
            if (validateForm(task)) {
                appDispatch({ type: AppContextAction.LOADING, show: true });
                // Update rating and comments
                const ratingDetails = {
                    comment: formFields.comment.trim(),
                    markedDate: Date.now(),
                    RatingId: (formFields.RatingId) ? formFields.RatingId : null,
                }
                if (task.Submission) {
                    // Mark a student's submission
                    const currentSubmission = {
                        ...task.Submission,
                        ...ratingDetails,
                    };
                    await API.teacher.updateSubmission(currentSubmission);
                } else {
                    // Close an overdue assignment and mark it
                    const newSubmission = {
                        AssignmentId: task.AssignmentId,
                        StudentId: task.StudentId,
                        ...ratingDetails,
                    };
                    await API.teacher.createSubmission(newSubmission);
                }
                appDispatch({
                    type: AppContextAction.SHOW_TOAST,
                    show: true, toastType: ToastType.Success,
                    message: "Assignment marked successfully!",
                });
                teacherDispatch({ type: TeacherContextAction.RELOAD_SUBMISSIONS });
                appDispatch({ type: AppContextAction.LOADING, show: false });
            }
        } catch (error) {
            appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    // This function returns the rating name for a given rating id
    function getRatingName(ratingId) {
        const rating = teacherState.ratings.find(item => item.id === ratingId);
        return (rating) ? rating.name : "";
    }

    return (
        <AppItemCard
            toggleIcon={<PersonIcon />}
            buttonSize="small"
            collapse={props.collapse}
            fontSize="0.85rem"
            palette={props.hasSubmission ? "submitted" : "notSubmitted"}
            id={props.AssignmentId}
            title={`${props.StudentName} : ${props.ClassName}`}>
            <CardContent align="left" className={classes.cardContent}>
                {(props.hasSubmission) &&
                    (<Box width="100%" my={1}>
                        <Box display="flex" alignItems="flex-start" className={classes.content}>
                            <Box display="flex" flexWrap="nowrap" flexGrow={1} alignItems="center">
                                <Typography variant="subtitle2" >
                                    Submitted:
                                </Typography>
                                <Typography variant="body2" component="p" >
                                    {format(new Date(props.Submission.submissionDate), "dd MMMM yyyy")}
                                </Typography>
                            </Box>
                        </Box>
                        {props.Submission.SubmissionLinks &&
                            <Box justifySelf="flex-start">
                                <URLViewer pt="0.5" value={props.Submission.SubmissionLinks} />
                            </Box>}
                    </Box>)}
                {(!props.hasSubmission) &&
                    <Box my={1} >
                        <Typography variant="subtitle2" >
                            Assignment Not Submitted!
                    </Typography>
                    </Box>}
                {(!props.isMarked) &&
                    <Box >
                        <Divider color="secondary" />
                        <Box className={classes.ratingSelect} mb={1}>
                            <AppSelect
                                name="RatingId"
                                label="Rating"
                                value={formFields.RatingId}
                                data={teacherState.ratings.map(item =>
                                    ({ "value": item.id, "label": item.name }))}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <TextField required fullWidth multiline
                            label="Comments"
                            color="secondary"
                            name="comment"
                            value={formFields.comment}
                            type="text"
                            variant="filled"
                            onChange={handleInputChange}
                            inputProps={{
                                style: { minHeight: '3rem', },
                            }} />
                        {formFields.error &&
                            <Box flexGrow={1} my={1}>
                                <Alert severity="error">{formFields.error}</Alert>
                            </Box>}
                        <Box display="flex" flexWrap="wrap" flexGrow={1} mt={1} alignItems="flex-end">
                            <Box display="flex" flexGrow={1} justifyContent="flex-end" alignContent="flex-end" flexWrap="nowrap">
                                <LinkButton
                                    onClick={() => clearRating()}>
                                    <CancelIcon /> Clear
                                </LinkButton>
                                <LinkButton
                                    onClick={() => submitRating(props)}>
                                    <CheckCircleIcon /> Submit
                                </LinkButton>
                            </Box>
                        </Box>
                    </Box>}
                {props.isMarked &&
                    <>
                        <Divider color="secondary" />
                        <Box display="flex" flexWrap="nowrap" flexGrow={1} mt={1} alignItems="center">
                            <Typography variant="subtitle2" >
                                Rated
                                    </Typography>
                            <Typography variant="subtitle1" color="secondary" >
                                <strong>&nbsp;{getRatingName(props.Submission.RatingId)}&nbsp;&nbsp;</strong>
                            </Typography>
                            <Typography variant="subtitle2" >
                                On
                                    </Typography>
                            <Typography variant="body2" component="p" >
                                {format(new Date(props.Submission.markedDate), "dd MMMM yyyy")}
                            </Typography>
                        </Box>
                        {props.Submission.comment &&
                            <>
                                <Typography variant="subtitle2" >
                                    Feedback Comment
                                </Typography>
                                <Typography variant="body2" component="p"
                                    style={{ whiteSpace: 'pre-wrap' }}
                                    align="justify">
                                    {props.Submission.comment}
                                </Typography>
                            </>}
                    </>}
            </CardContent>
        </AppItemCard >
    );
}