import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import StudentHome from "./StudentHome";
// import TeacherHome from "./TeacherHome";
import { makeStyles } from '@material-ui/core/styles';
import { UserAccessType, useAppContext } from "../context/AppContext";
import { RoundedButton } from '../components/styles';


// Styles used by this component
const useStyles = makeStyles((theme) => ({
}));

// The application homepage 
function AppDashboard(props) {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box display="flex">
                <NavBar handleLogout={props.handleLogout}
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                />
                {getUserPage(state.user.AccessTypeId)}
                <Footer />
            </Box>
        </>
    );

    // Returns the user homepage based on the user access type
    function getUserPage(accessTypeId) {
        // console.log(accessTypeId);
        // if (accessTypeId === UserAccessType.Teacher) {
        //     return <TeacherHome open={open} handleDrawerClose={handleDrawerClose} />
        // } else if (accessTypeId === UserAccessType.Student) {
        //     return <StudentHome open={open} handleDrawerClose={handleDrawerClose} />
        // }
        // return "";
    }
}

export default AppDashboard;
