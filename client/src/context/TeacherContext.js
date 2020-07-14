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
}

// Default state of the context
const defaultState = {
    classSubjects: [],
    assignments: [],
    reloadAssignments: false,
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
        case TeacherContextAction.SET_ASSIGNMENT_LIST: {
            return {
                ...state,
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
