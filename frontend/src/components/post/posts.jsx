import React, { useEffect } from 'react';
import NewPost from './newPost';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { postFetchThunk } from '../../redux/ducks/postsDuck';
import PostList from './PostList';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: theme.spacing(2),
  },
}));

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postFetchThunk());
  }, [dispatch]);

  const token = Cookie.get('token');

  return (
    <div className={classes.root}>
      {token && <NewPost />}
      <PostList />
    </div>
  );
};

export default Posts;
