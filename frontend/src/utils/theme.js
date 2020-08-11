import { dark } from '@material-ui/core/styles/createPalette';

const { createMuiTheme } = require('@material-ui/core');

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export const darkTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: dark,
      },
    },
  },
  palette: {
    type: 'dark',
  },
});
