import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { signinActionThunk } from '../../redux/ducks/usersDuck';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ history }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const [inputValues, setInputValues] = useState({
    email: null,
    password: null,
    rememberMe: false,
    showPassword: false,
  });

  let token = Cookie.get('token');
  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [history, token]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === 'checkbox'
      ? setInputValues({ ...inputValues, [name]: checked })
      : setInputValues({ ...inputValues, [name]: value });
  };

  const handleClickShowPassword = () => {
    setInputValues({
      ...inputValues,
      showPassword: !inputValues.showPassword,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputValues;
    dispatch(signinActionThunk(email, password));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {user.error && (
          <Typography component='h1' variant='h5'>
            {user.error.data}
          </Typography>
        )}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
          type='post'
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={handleChange}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='password'
            type={inputValues.showPassword ? 'text' : 'password'}
            value={setInputValues.password}
            label='Password'
            name='password'
            autoComplete='current-password'
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip title='Toggle Password'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {inputValues.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
            name='rememberMe'
            checked={inputValues.rememberMe}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#!' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
