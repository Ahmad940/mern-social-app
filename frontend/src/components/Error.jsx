import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: theme.spacing(7),
  },
}));

const Error = () => {
  const classes = useStyle();
  return (
    <div>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h1" color="initial">
          Ooops 404
        </Typography>
        <Typography variant="h2" color="initial">
          Page not found
        </Typography>
      </Container>
    </div>
  );
};

export default Error;
