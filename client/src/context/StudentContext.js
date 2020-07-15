import React, { useReducer, useContext, createContext } from "react";

const StudentContext = createContext();
const { Provider } = StudentContext;

// Enum of Actions supported by this context  
const StudentContextAction = {
    // Sets the class and subjects assigned to the student
    SET_CLASS_SUBJECTS: "SET_CLASS_SUBJECTS",
    // Sets the current list of tasks viewed by the student
    SET_TASK_LIST: "SET_TASK_LIST",
    // Refresh the current list of tasks viewed by the student
    RELOAD_TASKS: "RELOAD_TASKS",
}

// Default state of the context
const defaultState = {
    classSubjects: [],
    tasks: [],
    reloadTasks: false,
};

// Reducer to make changes to the student context state
const reducer = (state, action) => {
    switch (action.type) {
        case StudentContextAction.SET_CLASS_SUBJECTS: {
            return {
                ...state,
                classSubjects: [...action.classSubjects]
            }
        }
        case StudentContextAction.SET_TASK_LIST: {
            return {
                ...state,
                reloadTasks: false,
                tasks: [...action.data]
            }
        }
        case StudentContextAction.RELOAD_TASKS: {
            return {
                ...state,
                reloadTasks: true,
            }
        }
        default:
            return state;
    }
};

// Returns the Provider to be used when using the student context 
const StudentProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return <Provider value={[state, dispatch]} {...props} />;
};

// Returns the student context 
const useStudentContext = () => {
    return useContext(StudentContext);
};

export { StudentProvider, useStudentContext, StudentContextAction };
