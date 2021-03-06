import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { RoundedButton, LinkButton } from '../components/styles';
import AppLogo from '../components/AppLogo';
import UserDialog from '../components/UserDialog';

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${theme.IMAGE_FOLDER_PATH}background.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
    },
}));

// The application login page 
function Login(props) {
    const classes = useStyles();
    const [formFields, setFormFields] = useState({
        userName: '',
        password: '',
        error: '',
        openUserSelection: false,
    });

    // Update local state on change of user name or password
    const handleInputChange = (event) => {
        let value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setFormFields({ ...formFields, [name]: value });
    };

    // Validate Form Fields and perform user login 
    async function handleLogin(event) {
        event.preventDefault();
        const userName = formFields.userName.trim();
        const password = formFields.password.trim();
        if (userName !== "" && password !== "") {
            if (await props.handleLogin(userName, password) === false)
                setFormFields({
                    ...formFields,
                    error: 'User name or password is incorrect!'
                });
        } else {
            setFormFields({
                ...formFields,
                error: 'Please enter a user name and password!'
            });
        }
    }

    // Opens the demo user selection dialog
    const openUserSelection = () => {
        setFormFields({
            ...formFields,
            openUserSelection: true,
        });
    };

    // Closes the demo user selection dialog
    const closeUserSelection = (value) => {
        if (value) {
            // If user is selected, update details
            setFormFields({
                ...formFields,
                userName: value,
                password: value,
                openUserSelection: false,
            });
            return;
        }
        setFormFields({
            ...formFields,
            openUserSelection: false,
        });
    };

    return (
        <Box height="100vh" width="100vw" display="flex"
            justifyContent="center"
            flexDirection="column" className={classes.root}>
            <Container maxWidth="sm">
                <Paper elevation={3}>
                    <form noValidate autoComplete="off">
                        <Box display="flex" align="center" flexGrow={1} m={4} pt={4} pb={3}>
                            <Grid container spacing={3} direction="row" alignContent="stretch"
                                justify="center" alignItems="center" >
                                <Grid item xs={12} md={10} >
                                    <Box mb={1}>
                                        <AppLogo variant="h5" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={10} >
                                    {(formFields.error === '') ? '' :
                                        <Box mb={2}>
                                            <Alert severity="error">{formFields.error}</Alert>
                                        </Box>}
                                    <TextField required autoFocus fullWidth
                                        color="secondary"
                                        label="User Name"
                                        value={formFields.userName}
                                        name="userName"
                                        onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} md={10} >
                                    <TextField required fullWidth
                                        label="Password"
                                        color="secondary"
                                        name="password"
                                        value={formFields.password}
                                        type="password"
                                        onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12} md={10} >
                                    <Box mt={1}>
                                        <RoundedButton onClick={handleLogin}
                                            type="submit"
                                            variant="contained">Sign In</RoundedButton>
                                    </Box>
                                    <Box mt={1}>
                                        <LinkButton
                                            onClick={openUserSelection}>
                                            Pick a Demo User
                                        </LinkButton>
                                    </Box>
                                    <UserDialog open={formFields.openUserSelection} onClose={closeUserSelection} />
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box >
    );
}
export default Login;
