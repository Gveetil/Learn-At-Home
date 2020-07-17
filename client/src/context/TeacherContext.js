import React, { useReducer, useContext, createContext } from "react";

const TeacherContext = createContext();
const { Provider } = TeacherContext;

// Enum of Actions supported by this context  
const TeacherContextAction = {
    // Sets the list of classes and subjects assigned to the teacher
    SET_CLASS_SUBJECTS: "SET_CLASS_SUBJECTS",
    // Sets the current list of assignments viewed by the teacher
    SET_ASSIGNMENT_LIST: "SET_ASSIGNMENT_LIST",
    // Refresh the current list of assignments viewed by the teacher
    RELOAD_ASSIGNMENTS: "RELOAD_ASSIGNMENTS",
    // Sets the current list of submissions viewed by the teacher
    SET_SUBMISSION_LIST: "SET_SUBMISSION_LIST",
    // Refresh the current list of submissions viewed by the teacher
    RELOAD_SUBMISSIONS: "RELOAD_SUBMISSIONS",
    // Sets the list of ratings available for submissions
    SET_RATINGS: "SET_RATINGS",
}

// Default state of the context
const defaultState = {
    classSubjects: [],
    assignments: [],
    submissions: [],
    reloadAssignments: false,
    reloadSubmissions: false,
    ratings: [],
};

// Reducer to make changes to the teacher context state
const reducer = (state, action) => {
    switch (action.type) {
        case TeacherContextAction.SET_CLASS_SUBJECTS: {
            return {
                ...state,
                classSubjects: [...action.classSubjects]
            }
        }
        case TeacherContextAction.SET_RATINGS: {
            return {
                ...state,
                ratings: [...action.data]
            }
        }
        case TeacherContextAction.SET_ASSIGNMENT_LIST: {
            return {
                ...state,
                submissions: [],
                reloadAssignments: false,
                assignments: [...action.data]
            }
        }
        case TeacherContextAction.RELOAD_ASSIGNMENTS: {
            return {
                ...state,
                reloadAssignments: true,
            }
        }
        case TeacherContextAction.SET_SUBMISSION_LIST: {
            return {
                ...state,
                assignments: [],
                reloadSubmissions: false,
                submissions: [...action.data]
            }
        }
        case TeacherContextAction.RELOAD_SUBMISSIONS: {
            return {
                ...state,
                reloadSubmissions: true,
            }
        }
        default:
            return state;
    }
};

// Returns the Provider to be used when using the teacher context 
const TeacherProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return <Provider value={[state, dispatch]} {...props} />;
};

// Returns the teacher context 
const useTeacherContext = () => {
    return useContext(TeacherContext);
};

export { TeacherProvider, useTeacherContext, TeacherContextAction };
