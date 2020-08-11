import React from 'react';
import { makeStyles } from '@material-ui/core';
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
import Cookie from 'js-cookie';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import moment from 'moment';

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

const Profile = ({ history }) => {
  const classes = useStyle();
  if (!Cookie.get('token')) {
    history.push('/login');
  }
  const { firstName, lastName, email, join, lastUpdated } = Cookie.get(
    'userInfo'
  )
    ? JSON.parse(Cookie.get('userInfo'))
    : '';
  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <List className={classes.listItem}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='FirstName'
              secondary={_.startCase(firstName)}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='LastName'
              secondary={_.startCase(lastName)}
            />
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
              secondary={moment(join).format('MMMM Do YYYY')}
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
              secondary={moment(lastUpdated).format('MMMM Do YYYY')}
            />
          </ListItem>
        </List>
        <Button
          color='primary'
          variant='contained'
          onClick={() => alert('Not yet implemented')}
        >
          Edit Profile
        </Button>
      </Container>
    </div>
  );
};

export default Profile;
