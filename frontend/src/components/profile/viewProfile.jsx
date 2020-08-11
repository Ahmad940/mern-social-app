import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import _ from 'lodash';
import moment from 'moment';
import Axios from 'axios';

const useStyle = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: theme.spacing(5),
  },
  listItem: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ViewProfile = ({ history, match }) => {
  const classes = useStyle();
  const [user, setUser] = React.useState([]);
  const [error, setError] = React.useState({});

  const params = match.params.id;

  React.useEffect(() => {
    Axios.get(`/api/users/user/${params}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(({ response }) => {
        setError(response);
      });
  }, [params]);

  const { firstName, lastName, email, createdAt, updatedAt } = user;

  const listUserItem = (
    <List className={classes.listItem}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='FirstName' secondary={_.startCase(firstName)} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='LastName' secondary={_.startCase(lastName)} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Email' secondary={email} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ScheduleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='join'
          secondary={moment(createdAt).format('MMMM Do YYYY')}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EventAvailableIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='Last Update'
          secondary={moment(updatedAt).format('MMMM Do YYYY')}
        />
      </ListItem>
    </List>
  );

  console.log('error', error);

  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        {error.data ? (
          <Typography variant='h4'>{error.data}</Typography>
        ) : (
          listUserItem
        )}
      </Container>
    </div>
  );
};

export default ViewProfile;
