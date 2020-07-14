import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useTeacherContext } from '../../context/TeacherContext';

// The Class List Control 
export default function ClassViewer(props) {
    /* eslint-disable no-unused-vars */
    const [teacherState, _] = useTeacherContext();

    // This function returns the class name for a given class id
    function getClassName(classId) {
        const classValue = teacherState.classSubjects.find(item => item.ClassId === classId);
        return (classValue) ? classValue.ClassName : "";
    }

    return (
        <Box >
            <Typography variant="subtitle2" >
                Class
            </Typography>
            <Typography variant="body2" component="span">
                {(props.value
                    .map((item) => getClassName(item.ClassId))
                    .join(", "))}
            </Typography>
        </Box >
    );
}