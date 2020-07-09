import React, { useState } from 'react';
import path from 'path';
import { Container, Grid, Paper, TextField, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { RoundedButton } from '../components/styles';
import AppLogo from '../components/AppLogo';

// Path to images folder
const IMAGE_FOLDER_PATH = path.join(process.env.PUBLIC_URL, "/images/");

// Styles used by this component
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${IMAGE_FOLDER_PATH}background.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
    },
}));

// The application login page 
function Login(props) {
    const classes = useStyles();
    const [formFields, setFormFields] = useState({ userName: '', password: '', error: '' });

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

    return (
        <Box height="100vh" width="100vw" display="flex"
            justifyContent="center"
            flexDirection="column" className={classes.root}>
            <Container maxWidth="sm">
                <Paper elevation={3}>
                    <form noValidate autoComplete="off">
                        <Box display="flex" align="center" flexGrow={1} p={2} py={4}>
                            <Grid container spacing={3} direction="row" alignContent="stretch"
                                justify="center" alignItems="center" >
                                <Grid item xs={12}>
                                    <AppLogo variant="h5" />
                                </Grid>
                                {(formFields.error === '') ? '' :
                                    <Grid item xs={12} >
                                        <Alert severity="error">{formFields.error}</Alert>
                                    </Grid>}
                                <Grid item xs={10} >
                                    <TextField required autoFocus fullWidth
                                        color="secondary"
                                        label="User Name"
                                        value={formFields.userName}
                                        name="userName"
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField required fullWidth
                                        label="Password"
                                        color="secondary"
                                        name="password"
                                        value={formFields.password}
                                        type="password"
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12} >
                                    <RoundedButton onClick={handleLogin}
                                        type="submit"
                                        variant="contained">Sign In</RoundedButton>
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
