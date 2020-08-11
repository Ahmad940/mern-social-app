import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Posts from './post/posts';

const useStyle = makeStyles((theme) => ({
  root: {
    // flex: 1,
    marginTop: theme.spacing(2),
    // background: theme.palette.primary
  },
}));

const Home = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='sm'>
        <Posts />
      </Container>
    </div>
  );
};

export default Home;
