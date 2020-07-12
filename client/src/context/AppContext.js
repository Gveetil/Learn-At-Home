import React, { useReducer, useContext, createContext } from "react";

const AppContext = createContext();
const { Provider } = AppContext;

// Enum of Actions supported by this context  
const AppContextAction = {
    SHOW_DIALOG: "SHOW_DIALOG", // Sets the message to be displayed in the dialog
    LOADING: "LOADING",         // Sets the loading status
    CURRENT_USER: "CURRENT_USER",       // Sets the current user
    SHOW_LEFT_NAV: "SHOW_LEFT_NAV",     // Shows / hides the left navigation panel
    HANDLE_ERROR: "HANDLE_ERROR",       // Handles application errors
}

// The currently available user access types in the system
const UserAccessType = {
    Teacher: 1,
    Student: 2
};

// Default state of the context
const defaultState = {
    dialog: {
        show: false,
        message: "",
    },
    loading: false,
    showLeftNav: true,
    user: {
        authenticated: false,
    },
};

// Reducer to make changes to the application context state
const reducer = (state, action) => {
    switch (action.type) {
        case AppContextAction.SHOW_DIALOG: {
            const message = action.show ? action.message : "";
            return {
                ...state,
                loading: false,
                dialog: {
                    show: action.show,
                    message
                }
            }
        }
        case AppContextAction.HANDLE_ERROR: {
            if (action.error && action.error.response
                && action.error.response.status === 401) {
                // Authentication Errors -- redirect to login
                return {
                    ...state,
                    loading: false,
                    user: {
                        authenticated: false,
                    },
                    dialog: {
                        show: true,
                        message: action.error.message,
                    }
                }
            }
            //All other errors
            return {
                ...state,
                loading: false,
                dialog: {
                    show: true,
                    message: action.error.message,
                }
            }
        }
        case AppContextAction.LOADING: {
            return {
                ...state,
                loading: action.show
            }
        }
        case AppContextAction.SHOW_LEFT_NAV: {
            console.log("here", action.show);
            return {
                ...state,
                showLeftNav: action.show
            }
        }
        case AppContextAction.CURRENT_USER: {
            return {
                ...state,
                user: {
                    ...action.user,
                    authenticated: (action.user !== null)
                }
            }
        }
        default:
            return state;
    }
};

// Returns the Provider to be used when using the application context 
const AppProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return <Provider value={[state, dispatch]} {...props} />;
};

// Returns the application context 
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContextAction, UserAccessType };
