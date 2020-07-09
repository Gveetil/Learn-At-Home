import { useLayoutEffect } from 'react'
import { UserAccessType, AppContextAction, useAppContext } from "../context/AppContext";
import API from './API';

// This custom hook helps perform user authentication
function useAuthentication() {
    const [state, dispatch] = useAppContext();

    // Get current user from session when the page is first loaded
    useLayoutEffect(() => {
        async function getCurrentUser() {
            try {
                dispatch({ type: AppContextAction.LOADING, show: true });
                const results = await API.user.getCurrentUser();
                console.log(results.data);
                if (results && results.data && results.status === 200) {
                    dispatch({ type: AppContextAction.CURRENT_USER, user: results.data });
                }
                dispatch({ type: AppContextAction.LOADING, show: false });
            } catch (error) {
                // If error while retrieving current user, log and carry on 
                console.log(error);
            }
        }

        getCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Login the user into the system
    async function handleLogin(userName, password) {
        try {
            dispatch({ type: AppContextAction.LOADING, show: true });
            const results = await API.user.login({ userName, password });
            if (results && results.data && results.status === 200) {
                dispatch({ type: AppContextAction.CURRENT_USER, user: results.data });
            } else {
                dispatch({ type: AppContextAction.LOADING, show: false });
                return false;
            }
            dispatch({ type: AppContextAction.LOADING, show: false });
            return true;
        } catch (error) {
            console.log(error);
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
            return false;
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
            dispatch({ type: AppContextAction.SHOW_DIALOG, show: true, message: error.message });
        }
    }

    return {
        user: state.user,
        UserAccessType,
        handleLogout,
        handleLogin,
    };
};

export default useAuthentication;