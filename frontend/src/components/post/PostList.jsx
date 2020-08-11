import React from 'react';
import { useSelector } from 'react-redux';
import PostData from './PostData';
import Typography from '@material-ui/core/Typography';

export default function PostList() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <React.Fragment>
      {posts.loading ? (
        <Typography variant='body1' color='initial'>
          Loading posts wait ...
        </Typography>
      ) : (
        posts.posts.map((post) => <PostData post={post} key={post._id} />)
      )}
      {!posts.length && (
        <Typography variant='body1' color='initial'>
          No post found
        </Typography>
      )}
    </React.Fragment>
  );
}
