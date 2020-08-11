import React, { useState } from 'react';
import Home from './components/Home.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import { CssBaseline, ThemeProvider, makeStyles } from '@material-ui/core';
import Error from './components/Error.jsx';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import Profile from './components/profile/Profile.jsx';
import ViewProfile from './components/profile/viewProfile';
import { lightTheme, darkTheme } from './utils/theme';

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
  },
}));

function App() {
  const [darkMode, setDarkMode] = useState('light');

  const toggleDarkMode = () => {
    if (darkMode === 'light') {
      setDarkMode('dark');
    }
    if (darkMode === 'dark') {
      setDarkMode('light');
    }
  };

  // added comment here
  const classes = useStyle();
  return (
    <Router>
      <ThemeProvider theme={darkMode === 'dark' ? darkTheme : lightTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <Header darkMode={darkMode} darkModeHandler={toggleDarkMode} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/register' component={SignUp} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/:id' component={ViewProfile} />
            <Route component={Error} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}
export default App;
