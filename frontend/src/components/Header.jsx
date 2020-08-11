import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAction } from '../redux/ducks/usersDuck';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness7 from '@material-ui/icons/Brightness7';
import jsCookie from 'js-cookie';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
}));

export default function Header({ darkMode, darkModeHandler, hello }) {
  const classes = useStyles();
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const userInfo = jsCookie.get('userInfo');
  const userData = userInfo ? JSON.parse(userInfo) : '';

  const anonymousHeader = (
    <Fragment>
      <Tooltip title='LightMode'>
        <IconButton color='inherit' onClick={darkModeHandler}>
          {darkMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
      <Button
        color='inherit'
        endIcon={<VpnKeyIcon />}
        component={Link}
        to='/login'
      >
        SignIn
      </Button>
      <Button
        color='inherit'
        endIcon={<AssignmentIndIcon />}
        component={Link}
        to='/register'
      >
        SignUp
      </Button>
    </Fragment>
  );

  const signedHeader = (
    <Fragment>
      <Typography variant='body1'>
        Welcome {_.startCase(userData.firstName)}
      </Typography>
      <Tooltip title={'profile'}>
        <IconButton color='inherit' component={Link} to='/profile'>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='LightMode'>
        <IconButton onClick={darkModeHandler} color='inherit'>
          {darkMode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>

      <Tooltip title={'Notifications'}>
        <IconButton color='inherit'>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={'Log out'}>
        <IconButton
          color='inherit'
          onClick={() => {
            dispatch(userLogoutAction());
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );

  const navBar = user.isLogged ? signedHeader : anonymousHeader;

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.titleLink}>
              Mern App
            </Link>
          </Typography>
          {navBar}
        </Toolbar>
      </AppBar>
    </div>
  );
}
