import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ToolTip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { newPostActionThunk } from '../../redux/ducks/postsDuck';
// import IconButton from '@material-ui/core/IconButton';
// import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    marginBottom: theme.spacing(2),
  },
  btn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  postBtn: {
    background:
      theme.palette.type === 'light'
        ? theme.palette.primary
        : theme.palette.background.paper,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const NewPost = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const snackBar = (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='success'>
        Posted successfully
      </Alert>
    </Snackbar>
  );

  return (
    <div className={classes.root}>
      {snackBar}
      <form>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <TextField
              label='Add new post'
              variant='outlined'
              multiline
              fullWidth
              rows={4}
              id='post'
              name='post'
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            {/* <div className={classes.btn}>
              <Button hidden></Button>
              <Button></Button>
              <ToolTip title='upload a photo'>
                <IconButton>
                  <AddAPhotoIcon />
                </IconButton>
              </ToolTip>
            </div> */}
          </Grid>
          <Grid item xs={2}>
            <ToolTip title='Post'>
              <Button
                variant='contained'
                color='primary'
                aria-label='Post Button'
                className={classes.postBtn}
                onClick={() => {
                  dispatch(newPostActionThunk(text));
                  setText('');
                  handleClick();
                }}
              >
                post
              </Button>
            </ToolTip>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewPost;
