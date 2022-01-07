import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {
    palette: {
      primary: {
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        dark: string;
        contrastText: string;
      };
      info: {
        main: string;
        contrastText: string;
      };
      error: {
        main: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
  }
}

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00AAFF',
      dark: '#5740DB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '##142938',
      dark: '#EE6C4D',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#9996A8',
      contrastText: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', // #3D365C
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 6px 28px #00000072',
          padding: '8px 25px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 400,
        },
        h1: {
          fontWeight: 500,
          fontSize: '4.5rem',
          //   fontFamily: 'Roboto',
        },
        h2: {
          fontWeight: 400,
          fontSize: '3rem',
        },
        h3: {
          fontWeight: 400,
          fontSize: '2rem',
        },
        h4: {
          fontWeight: 400,
          fontSize: '1.2rem',
        },
      },
    },
  },
};

export const theme = createTheme(lightTheme);
