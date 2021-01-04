import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import MyFaceNoText from "../Images/MyFaceNoText.png";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  buttonGroup: {
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100px",
    marginRight: "10px",
  },
  myFace: {
    fontFamily: "Quicksand",
  },
  logo: {
    width: "50px",
    height: "50px",
    align: "center",
    marginBottom: "10px",
  },
  leftHeaderContainer: {
    width: "200px",
    display: "flex",
    align: "center",
    justifyContent: "center",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections } = props;

  const history = useHistory();

  const clickLink = (link) => {
    history.push(link);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  console.log(localStorage.token);

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        {localStorage.username && (
          <>
            <div className={classes.buttonGroup}>
              <Button
                className={classes.button}
                variant="outlined"
                size="small"
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </div>
            <img className={classes.logo} src={MyFaceNoText} alt="" />
            <div className={classes.buttonGroup}>
              <h3>Welcome {localStorage.username}</h3>
            </div>
          </>
        )}
        {!localStorage.username && (
          <>
            <div className={classes.leftHeaderContainer}>
              <h2 className={classes.myFace}>MyFace</h2>
            </div>
            <img className={classes.logo} src={MyFaceNoText} alt="" />
            <div className={classes.buttonGroup}>
              <Button
                className={classes.button}
                variant="outlined"
                size="small"
                onClick={() => clickLink("/signup")}
              >
                Sign Up
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => clickLink("/signin")}
              >
                Sign In
              </Button>
            </div>
          </>
        )}
      </div>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
};
