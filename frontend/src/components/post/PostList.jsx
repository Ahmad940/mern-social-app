import React from 'react';
import { useSelector } from 'react-redux';
import PostData from './PostData';

export default function PostList() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <React.Fragment>
      {posts.loading
        ? 'Loading posts wait ...'
        : posts.posts.map((post) => <PostData post={post} key={post._id} />)}
    </React.Fragment>
  );
}
