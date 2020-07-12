import React, { useState, useEffect } from 'react';
import { FormControlLabel, Grid, Paper, TextField, Box, Typography, Container, Switch, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RoundedButton } from '../styles';
import API from '../../utils/API';
import { AppContextAction, useAppContext } from "../../context/AppContext";
import { TeacherContextAction, useTeacherContext } from '../../context/TeacherContext';
import MultiSelectClass from "./MultiSelectClass";
import FileUpload from "../controls/FileUpload";
import DatePicker from "../controls/DatePicker";
import URLListView from "../controls/URLListView";
import DropboxHelper from "../../utils/DropboxHelper";
import AppSelect from '../controls/AppSelect';
import { validate } from '@material-ui/pickers';

// Default state of form fields
const defaultState = {
    title: '',
    instructions: '',
    classes: [],
    url: [],
    SubjectId: "",
    dueDate: null,
    isLearningTask: true,
    error: '',
    files: [],
    fileUploadReset: 1,
}

// Create New Assignment Page
function NewAssignment(props) {
    /* eslint-disable no-unused-vars */
    const [_, appDispatch] = useAppContext();
    const [teacherState, teacherDispatch] = useTeacherContext();
    const [formFields, setFormFields] = useState(defaultState);

    // Update local state on change of form values
    const handleValueChange = (name, value) => {
        console.log(value);
        setFormFields({ ...formFields, [name]: value });
    };

    // Update local state on change of form fields
    const handleInputChange = (event) => {
        let value = event.target.value;
        const name = event.target.name;

        if (name === "isLearningTask") {
            // Reset due date if learning task is updated
            const isLearningTask = event.target.checked;
            if (isLearningTask) {
                setFormFields({
                    ...formFields,
                    dueDate: null,
                    [name]: isLearningTask
                });
            } else {
                setFormFields({ ...formFields, [name]: isLearningTask });
            }
            return;
        }

        setFormFields({ ...formFields, [name]: value });
        return;
    }

    // Validate Form Fields and post new assignment with today's date
    function handlePost(event) {
        event.preventDefault();
        saveFormData(new Date());
    }

    // Validate Form Fields and save new assignment
    function handleSave(event) {
        event.preventDefault();
        saveFormData(null);
    }

    // Validate form data and set error message
    function validateForm() {
        let error = "";
        if (formFields.title.trim() === "") {
            error = "Please enter a Title for this assignment!"
        } else if (formFields.instructions.trim() === "") {
            error = "Please enter Instructions for this assignment!"
        } else if (formFields.classes.length <= 0) {
            error = "Please select a class for this assignment!"
        } else if (formFields.SubjectId === "") {
            error = "Please select a Subject for this assignment!"
        }
        if (error !== "") {
            setFormFields({
                ...formFields,
                error,
            });
            return false;
        }
        return true;
    }

    // Upload files and save form data in the database
    async function saveFormData(postedDate) {
        try {
            // Check if form data is valid before save
            if (validateForm()) {
                appDispatch({ type: AppContextAction.LOADING, show: true });
                const uploadedFiles = await DropboxHelper.uploadFiles(formFields.files);
                const newAssignment = {
                    ...formFields,
                    postedDate,
                    links: [...formFields.url, ...uploadedFiles],
                };
                const results = await API.teacher.createAssignment(newAssignment);
                // The DropzoneArea component does not reset state (known issue),
                // so updating key and forcing it to re-render
                defaultState.fileUploadReset += 1;
                //reset fields
                setFormFields(defaultState);
                appDispatch({ type: AppContextAction.LOADING, show: false });
            }
        } catch (error) {
            appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    // Load subjects and classes taught by this user when the page is first loaded
    useEffect(() => {
        async function initializeClassSubjects() {
            try {
                // Load master data for the first time only
                if (teacherState.classSubjects.length <= 0) {
                    appDispatch({ type: AppContextAction.LOADING, show: true });
                    const results = await API.teacher.getClassSubjects();
                    if (results && results.data && results.status === 200) {
                        teacherDispatch({ type: TeacherContextAction.SET_CLASS_SUBJECTS, classSubjects: results.data });
                    }
                    // Selecting the first subject as default
                    defaultState.SubjectId = results.data[0].SubjectId;
                    setFormFields({ ...formFields, SubjectId: results.data[0].SubjectId });
                    appDispatch({ type: AppContextAction.LOADING, show: false });
                }
            } catch (error) {
                appDispatch({ type: AppContextAction.HANDLE_ERROR, error });
            }
        }

        initializeClassSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3}>
                <form noValidate autoComplete="off">
                    <Box display="flex" flexGrow={1} p={2}>
                        <Grid container spacing={3} direction="row" justify="flex-start" >
                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom={true}>Add New Assignment</Typography>
                                <Divider />
                            </Grid>
                            <Grid container item xs={12} spacing={3} sm={8}>
                                <Grid item xs={12}  >
                                    <TextField required autoFocus fullWidth
                                        color="secondary"
                                        label="Title"
                                        value={formFields.title}
                                        name="title"
                                        variant="filled"
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField required fullWidth multiline
                                        label="Instructions"
                                        color="secondary"
                                        name="instructions"
                                        value={formFields.instructions}
                                        type="text"
                                        variant="filled"
                                        onChange={handleInputChange}
                                        inputProps={{
                                            style: { minHeight: '5rem', },
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <URLListView
                                        value={formFields.url}
                                        name="url"
                                        onChange={handleValueChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FileUpload
                                        key={formFields.fileUploadReset}
                                        name="files"
                                        value={formFields.files}
                                        maxSize={DropboxHelper.UPLOAD_FILE_SIZE_LIMIT}
                                        onChange={handleValueChange} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box display="flex" height="100%" flexDirection="column" p={0} m={0}>
                                    <Grid container spacing={3} alignItems="center">
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={<Switch checked={formFields.isLearningTask}
                                                    onChange={handleInputChange}
                                                    color="secondary"
                                                    name="isLearningTask"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                                                label="Learning Task"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                disabled={formFields.isLearningTask}
                                                disablePast={true}
                                                label="Due Date"
                                                name="dueDate"
                                                value={formFields.dueDate}
                                                onChange={handleValueChange} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AppSelect
                                                name="SubjectId"
                                                label="Subject"
                                                value={formFields.SubjectId}
                                                data={teacherState.classSubjects
                                                    .filter((item, index) =>
                                                        isUniqueSubject(teacherState.classSubjects, item, index))
                                                    .map(item => ({ "value": item.SubjectId, "label": item.SubjectName }))}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MultiSelectClass
                                                subjectId={formFields.SubjectId}
                                                value={formFields.classes}
                                                name="classes"
                                                onChange={(event, values) => handleValueChange('classes', values)} />
                                        </Grid>
                                        {(formFields.error === '') ? '' :
                                            <Grid item xs={12}  >
                                                <Alert severity="error">{formFields.error}</Alert>
                                            </Grid>}
                                    </Grid>
                                    <Box display="flex" height="100%" flexGrow={1} flexWrap="nowrap"
                                        justifyContent="flex-end" alignItems="flex-start" pt={2}>
                                        <RoundedButton onClick={handleSave}
                                            type="submit"
                                            variant="contained">Save</RoundedButton>
                                        <RoundedButton onClick={handlePost}
                                            variant="contained">Post</RoundedButton>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper >
        </Container >
    );
}

// This function returns true if the subject is the first instance in the given array
// It helps eliminate duplicates from the resultset
function isUniqueSubject(array, item, index) {
    return array.findIndex(firstItem => firstItem.SubjectId === item.SubjectId) === index;
}

export default NewAssignment;
