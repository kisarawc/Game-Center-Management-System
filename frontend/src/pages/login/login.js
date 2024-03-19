import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { spacing } from '@mui/system'; // Import the spacing function

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: spacing(8), // Use spacing function directly
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: spacing(1), // Use spacing function directly
  },
  submit: {
    margin: spacing(3, 0, 2), // Use spacing function directly
  },
}));

const Login = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button href="#" color="primary">
                Forgot password?
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
