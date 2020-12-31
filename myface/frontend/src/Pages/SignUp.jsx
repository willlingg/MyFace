import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import MyFaceLogo from "../Images/MyFaceLogo.png";
import * as postFunctions from "../GrabPost";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      MyFace {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  logo: {
    width: "50%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
    verticalAlign: "middle",
    display: "flex",
  },
  icon: {
    marginRight: "10px",
  },
}));

export default function SignUp(props) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [badSignup, setBadSignup] = useState(false);

  const checkFilledFields = () => {
    return firstName && lastName && username && password;
  };

  const data = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    username: username,
    password: password,
  });

  const submitSignUp = () => {
    fetch("http://localhost:8000/core/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((json) => {
          props.history.push({
            pathname: "/signin",
            state: {
              afterSignUp: true,
            },
          });
        });
      } else {
        setBadSignup(true);
      }
    });
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.logo} src={MyFaceLogo} alt="" />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={(event) => setFirstName(event.target.value)}
                error={firstName === ""}
                helperText={
                  firstName === "" ? "Please enter a first name" : " "
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastName(event.target.value)}
                onBlur={(event) => setLastName(event.target.value)}
                error={lastName === ""}
                helperText={lastName === "" ? "Please enter a last name" : " "}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
                onBlur={(event) => setUsername(event.target.value)}
                error={username === ""}
                helperText={username === "" ? "Please enter a username" : " "}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                onBlur={(event) => setPassword(event.target.value)}
                error={password === ""}
                helperText={password === "" ? "Please enter a password" : " "}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && checkFilledFields()) submitSignUp();
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!checkFilledFields()}
            onClick={submitSignUp}
          >
            Sign Up
          </Button>
          {badSignup && (
            <div className={classes.error}>
              <ErrorOutlineIcon className={classes.icon} />
              This username has already been taken!
            </div>
          )}

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
