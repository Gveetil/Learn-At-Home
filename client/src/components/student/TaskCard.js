import React, { useState } from 'react';
import format from 'date-fns/format';
import { Typography, Divider, Box, CardContent, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { StudentContextAction, useStudentContext } from '../../context/StudentContext';
import { ToastType, AppContextAction, useAppContext } from "../../context/AppContext";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AppItemCard from '../controls/AppItemCard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import URLViewer from '../controls/URLViewer';
import { SecondaryLinkButton, LinkButton } from "../styles";
import FileUpload from "../controls/FileUpload";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DropboxHelper from "../../utils/DropboxHelper";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
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
        paddingTop: theme.spacing(1.5),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        "&:last-child": {
            paddingBottom: theme.spacing(2),
        }
    },
    commentBox: {
        backgroundColor: theme.palette.primary.main,
    }
}));

// Default state of form fields
const defaultState = {
    error: '',
    files: [],
    fileUploadReset: 1,
    showComment: false,
}

// This component generates a task card based on the task passed in
export default function TaskCard(props) {
    /* eslint-disable no-unused-vars */
    const [state, appDispatch] = useAppContext();
    /* eslint-disable no-unused-vars */
    const [studentState, studentDispatch] = useStudentContext();
    const [formFields, setFormFields] = useState(defaultState);
    const classes = useStyles();

    // This function returns the subject name for a given subject id
    function getSubjectName(subjectId) {
        const subject = studentState.classSubjects.find(item => item.SubjectId === subjectId);
        return (subject) ? subject.SubjectName : "";
    }

    // Update local state on change of upload file
    const handleValueChange = (name, value) => {
        setFormFields({ ...formFields, [name]: value });
    };

    // Clear task submission
    function clearTaskSubmission() {
        // The DropzoneArea component does not reset state (known issue),
        // so updating key and forcing it to re-render
        defaultState.fileUploadReset += 1;
        //reset fields
        setFormFields(defaultState);
    }

    // Validate form data and set error message
    function validateForm(task) {
        if (!task.isLearningTask && formFields.files.length <= 0) {
            setFormFields({
                ...formFields,
                error: "Please upload Files to submit for this assignment!",
            });
            return false;
        }
        return true;
    }

    // Submit task and Upload files if applicable
    async function submitTask(task) {
        try {
            // Validate submission before save
            if (validateForm(task)) {
                appDispatch({ type: AppContextAction.LOADING, show: true });
                let uploadedFiles = [];
                if (!task.isLearningTask) {
                    uploadedFiles = await DropboxHelper.uploadFiles(formFields.files);
                }
                const newSubmission = {
                    AssignmentId: task.id,
                    submissionDate: Date.now(),
                    links: [...uploadedFiles],
                };
                const results = await API.student.createSubmission(newSubmission);
                let toastMessage = "Assignment submitted successfully!";
                if (task.isLearningTask)
                    toastMessage = "Learning Task completed successfully!";
                appDispatch({
                    type: AppContextAction.SHOW_TOAST,
                    show: true, message: toastMessage,
                    toastType: ToastType.Success
                });
                studentDispatch({ type: StudentContextAction.RELOAD_TASKS });
                appDispatch({ type: AppContextAction.LOADING, show: false });
            }
        } catch (error) {
            appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    return (
        <AppItemCard
            toggleIcon={(props.task.isLearningTask) ?
                <LibraryBooksIcon />
                : <AssignmentIcon />}
            palette={(props.task.isLearningTask) ? "learningTask" : "assignment"}
            id={props.task.id}
            title={`${getSubjectName(props.task.SubjectId)} : ${props.task.title}`}>
            <CardContent align="left" className={classes.cardContent}>
                <Box display="flex" alignItems="flex-start" className={classes.content}>
                    <Box display="flex" flexWrap="nowrap" flexGrow={1} alignItems="center">
                        <Typography variant="subtitle2" >
                            Posted:
                        </Typography>
                        <Typography variant="body2" component="p" >
                            {format(new Date(props.task.postedDate), "dd MMMM yyyy")}
                        </Typography>
                    </Box>
                    {((props.task.dueDate && !props.isSubmitted) ||
                        (props.isSubmitted && props.task.Submissions[0].submissionDate)) &&
                        <Box display="flex" flexWrap="nowrap" flexGrow={0} alignItems="center">
                            <Typography variant="subtitle2" >
                                {(props.task.isLearningTask) ?
                                    ((props.isSubmitted) ? "Completed: " : "")
                                    :
                                    ((props.isSubmitted) ? "Submitted: " : "Due On: ")}
                            </Typography>
                            <Typography variant="body2" component="p" >
                                {(props.isSubmitted) ?
                                    format(new Date(props.task.Submissions[0].submissionDate), "dd MMMM yyyy")
                                    :
                                    format(new Date(props.task.dueDate), "dd MMMM yyyy")}
                            </Typography>
                        </Box>}
                </Box>
                <Typography variant="subtitle2" component="p" >
                    Instructions
                </Typography>
                <Typography variant="body2" component="p"
                    style={{ whiteSpace: 'pre-wrap' }}
                    align="justify" >
                    {props.task.instructions}
                </Typography>
                <Box justifySelf="flex-start">
                    <URLViewer value={props.task.AssignmentLinks} />
                </Box>
                {(!props.task.isLearningTask && !props.isSubmitted) &&
                    <Box display="flex" my={2} flexGrow={1} justifySelf="flex-start">
                        <FileUpload
                            fileUploadReset={formFields.fileUploadReset}
                            name="files"
                            value={formFields.files}
                            maxSize={DropboxHelper.UPLOAD_FILE_SIZE_LIMIT}
                            onChange={handleValueChange} />
                    </Box>}

                {(props.isSubmitted && !props.task.isLearningTask) &&
                    <>
                        <Divider color="secondary" />
                        < Box pt={1} width="100%">
                            {props.task.Submissions[0].submissionDate &&
                                <>
                                    <Box display="flex" flexWrap="nowrap" alignItems="center">
                                        <Typography variant="subtitle2" component="p" >
                                            Links Submitted
                                    </Typography>
                                    </Box>
                                    <Box justifySelf="flex-start">
                                        <URLViewer pt="1" value={props.task.Submissions[0].SubmissionLinks} />
                                    </Box>
                                </>}
                            {(!props.task.Submissions[0].submissionDate) &&
                                <Typography variant="subtitle2" component="p" >
                                    Submission Closed by Teacher
                                </Typography>}
                            {props.task.Submissions[0].comment &&
                                <>
                                    <Box display="flex" flexWrap="nowrap" mt={1} alignItems="center">
                                        <SecondaryLinkButton size="small"
                                            component="a"
                                            onClick={() => setFormFields({ ...formFields, showComment: !formFields.showComment })}
                                        ><DoubleArrowIcon />
                                            Teacher Feedback
                                        </SecondaryLinkButton>
                                    </Box>
                                    <Collapse in={formFields.showComment} timeout="auto" unmountOnExit>
                                        <Box mt={1} >
                                            <Box display="flex" flexWrap="nowrap" alignItems="center">
                                                <Typography variant="subtitle2" >
                                                    Feedback Date:
                                                </Typography>
                                                <Typography variant="body2" component="p" >
                                                    {format(new Date(props.task.Submissions[0].markedDate), "dd MMMM yyyy")}
                                                </Typography>
                                            </Box>
                                            <Box border={1} mt={1} p={1} width="100%" borderColor="grey.300"
                                                className={classes.commentBox} >
                                                <Typography variant="body2" component="p"
                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                    align="justify">
                                                    {props.task.Submissions[0].comment}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Collapse>
                                </>
                            }
                        </Box>
                    </>}
                {formFields.error &&
                    <Box flexGrow={1} my={1}>
                        <Alert severity="error">{formFields.error}</Alert>
                    </Box>}
                {!props.isSubmitted &&
                    <Box display="flex" flexGrow={1} flexWrap="nowrap" justifyContent="flex-end">
                        {(!props.task.isLearningTask) &&
                            <LinkButton
                                onClick={() => clearTaskSubmission()}>
                                <CancelIcon /> Clear
                            </LinkButton>}
                        <LinkButton
                            onClick={() => submitTask(props.task)}>
                            <CheckCircleIcon /> {(props.task.isLearningTask) ? "Done" : "Submit"}
                        </LinkButton>
                    </Box>}
            </CardContent>
        </AppItemCard >
    );
}