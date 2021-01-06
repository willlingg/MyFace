import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MyFaceNoText from "../Images/MyFaceNoText.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../App.css";

const StyledButton = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: "10px",
  },
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
    justifyContent: "flex-end",
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
  menu: {
    width: "200px",
  },
  icon: {
    marginRight: "20px",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <div className={classes.leftHeaderContainer}>
          <h2 className={classes.myFace}>MyFace</h2>
        </div>
        {localStorage.username && (
          <>
            <img className={classes.logo} src={MyFaceNoText} alt="" />
            <div className={classes.buttonGroup}>
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <AccountCircleIcon className={classes.avatar} />
                  Welcome {localStorage.username}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.menu}
                >
                  <MenuItem onClick={handleClose}>
                    <AddCircleIcon className={classes.icon} />
                    Create Post
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={() => logout()}>
                    <ExitToAppIcon className={classes.icon} />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </>
        )}
        {!localStorage.username && (
          <>
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
      ></Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
};
