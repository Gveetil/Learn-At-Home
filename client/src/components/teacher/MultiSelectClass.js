import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useTeacherContext } from '../../context/TeacherContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// The Class multiselect drop down List View Control 
export default function MultiSelectClass(props) {
    /* eslint-disable no-unused-vars */
    const [teacherState, _] = useTeacherContext();
    return (
        <Autocomplete
            color="secondary"
            multiple
            value={props.value}
            id="Class"
            options={fetchUniqueClasses(teacherState.classSubjects, props.subjectId)}
            getOptionLabel={(option) => option.ClassName}
            onChange={props.onChange}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        color="secondary"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.ClassName}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Class" required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    color="secondary"
                    onKeyPress={(event) => event.preventDefault()} />
            )}
        />
    );
}

// This function returns a list of all classes assigned to the teacher
// for a given subject
function fetchUniqueClasses(itemArray, subjectId) {
    const subjectList = itemArray.filter((item) => item.SubjectId === subjectId);
    return subjectList.filter((item, index) =>
        isUniqueClass(subjectList, item, index));
}

// This function returns true if the class is the first instance in the given array  
// It helps eliminate duplicates from the resultset
function isUniqueClass(array, item, index) {
    return array.findIndex(firstItem => firstItem.ClassId === item.ClassId) === index;
}