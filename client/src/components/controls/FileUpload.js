import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

// The File Upload Control 
export default function FileUpload(props) {
    return (
        <DropzoneArea
            accept="image/png, image/gif"
            onChange={props.onChange}
            minSize={1}
            multiple
            showAlerts={['error', 'info']}
            maxSize={props.maxSize}
        />
    );
}