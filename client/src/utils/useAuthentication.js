import { useEffect, useState } from 'react'
import { UserAccessType, AppContextAction, useAppContext } from "../context/AppContext";
import API from './API';

// This custom hook helps perform user authentication
function useAuthentication() {
    const [initialized, setInitialized] = useState(false);
    const [state, dispatch] = useAppContext();

    // Get current user from session when the app is first loaded
    useEffect(() => {
        async function getCurrentUser() {
            try {
                dispatch({ type: AppContextAction.LOADING, show: true });
                const results = await API.user.getCurrentUser();
                if (results && results.data && results.status === 200) {
                    dispatch({ type: AppContextAction.CURRENT_USER, user: results.data });
                }
                dispatch({ type: AppContextAction.LOADING, show: false });
            } catch (error) {
                // No active user session found - carry on to login   
                dispatch({ type: AppContextAction.LOADING, show: false });
            }
            setInitialized(true);
        }

        // If current user is reset, reset user object so all browser instances are logged out
        window.addEventListener('storage', e => {
            if (e.key.trim() === 'LEARN_AT_HOME_ACTIVE_CLIENT') {
                if (e.oldValue && !e.newValue) {
                    // Sign out from all instances 
                    dispatch({ type: AppContextAction.CURRENT_USER, user: null });
                }
            }
        });

        getCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Login the user into the system
    async function handleLogin(userName, password) {
        try {
            dispatch({ type: AppContextAction.LOADING, show: true });
            // Clear current user
            localStorage.setItem('LEARN_AT_HOME_ACTIVE_CLIENT', "");
            const results = await API.user.login({ userName, password });
            if (results && results.data && results.status === 200) {
                // Login Success
                dispatch({ type: AppContextAction.CURRENT_USER, user: results.data });
                dispatch({ type: AppContextAction.LOADING, show: false });
                return true;
            }

            dispatch({ type: AppContextAction.LOADING, show: false });
            return false;

        } catch (error) {
            if (error && error.response
                && error.response.status === 401) {
                // Authentication Errors -- return false
                dispatch({ type: AppContextAction.LOADING, show: false });
                return false;
            }
            dispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    // Close current user session
    async function handleLogout() {
        try {
            dispatch({ type: AppContextAction.LOADING, show: true });
            const results = await API.user.logout();
            if (results && results.data && results.status === 200) {
                dispatch({ type: AppContextAction.CURRENT_USER, user: null })
            }
            dispatch({ type: AppContextAction.LOADING, show: false });
        } catch (error) {
            console.log(error);
            dispatch({ type: AppContextAction.HANDLE_ERROR, error });
        }
    }

    return {
        user: state.user,
        UserAccessType,
        initialized,
        handleLogout,
        handleLogin,
    };
};

export default useAuthentication;