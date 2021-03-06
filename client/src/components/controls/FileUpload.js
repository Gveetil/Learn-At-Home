import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    dropzone: {
        minHeight: "2rem",
        marginBottom: theme.spacing(1),
    },
    text: {
        fontSize: "1rem",
    }
}));

// Accepted file types
const acceptedFiles = ["image/*", ".doc", ".docx", ".pdf", ".rtf", ".xls", ".xlsx", ".ppt", ".pptx"];

// The File Upload Control 
export default function FileUpload(props) {
    const classes = useStyles();

    // Update local state on change of form fields
    const handleChange = (values) => {
        props.onChange(props.name, values);
    };

    return (
        <DropzoneArea
            key={props.fileUploadReset}
            dropzoneClass={classes.dropzone}
            dropzoneParagraphClass={classes.text}
            acceptedFiles={acceptedFiles}
            value={props.value}
            onChange={handleChange}
            filesLimit={15}
            dropzoneText="Drag and drop a file or click here"
            multiple
            style={{ height: "10%", }}
            showAlerts={['error']}
            maxFileSize={props.maxSize}
        />
    );
}