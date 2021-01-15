import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "@material-ui/core/Input";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    verticalAlign: "middle",
    display: "flex",
    margin: "20px 0px",
  },
  icon: {
    marginRight: "10px",
  },
  modal: {},
}));

const StyledButton = withStyles({
  root: {
    background: "green",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: "10px auto",
  },
})(Button);

const PostModal = (props) => {
  const { handleModalClose, modalOpen } = props;
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();

  const selectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const createPost = () => {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("text", text);
    postData.append("post_image", selectedFile, selectedFile.name);
    fetch("http://localhost:8000/post/api/post/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
      body: postData,
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={() => {
          handleModalClose();
          setTitle(null);
          setText(null);
        }}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"lg"}
        className={classes.modal}
      >
        <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
        <DialogContent>
          <h4>Title</h4>
          <TextField
            error={title === ""}
            fullWidth
            id="outlined-error-helper-text"
            helperText={title === "" && "Please input a title"}
            placeholder="Enter title here..."
            variant="outlined"
            onKeyDown={(e) => {
              if (e.keyCode === 190) e.preventDefault();
            }}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={(event) => setTitle(event.target.value)}
          />
          <h4>Text</h4>
          <TextField
            error={text === ""}
            fullWidth
            id="outlined-error-helper-text"
            helperText={text === "" && "Please input some text"}
            rows={5}
            placeholder="Enter text here..."
            variant="outlined"
            multiline={true}
            onKeyDown={(e) => {
              if (e.keyCode === 190) e.preventDefault();
            }}
            onChange={(event) => setText(event.target.value)}
            onBlur={(event) => setText(event.target.value)}
          />
          <h4>Image (Optional)</h4>
          <input type="file" onChange={selectedHandler} />
        </DialogContent>
        <DialogActions>
          <StyledButton
            variant="contained"
            size="small"
            onClick={() => createPost()}
          >
            Buy
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostModal;
