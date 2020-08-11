import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ToolTip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { newCommentActionThunk } from '../../redux/ducks/postsDuck';
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
  commentBtn: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary
        : theme.palette.background.paper,
  },
}));

const NewComment = ({ postId }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <TextField
              label='Add a new comment'
              variant='outlined'
              multiline
              fullWidth
              rowsMax={5}
              id='post'
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              name='post'
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
                className={classes.commentBtn}
                onClick={() => {
                  dispatch(newCommentActionThunk(postId, comment));
                  setComment('');
                }}
              >
                Comment
              </Button>
            </ToolTip>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewComment;
