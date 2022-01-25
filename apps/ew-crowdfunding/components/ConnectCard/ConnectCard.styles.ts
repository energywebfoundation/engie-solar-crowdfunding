import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0,
      [theme.breakpoints.down("md")]: {
        width: '100%'
      },
    },
    paper: {
      width: 'auto',
      borderRadius: 0,
      minWidth: '300px',
      [theme.breakpoints.down("md")]: {
        width: '100%'
      },
    },
    title: {
      width: '100%',
      padding: '14px',
    },
    message: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    border: {
      marginTop: '-6px',
      height: '6px',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
    },
  };
});
