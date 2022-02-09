import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '10px',
      padding: '30px',
      maxWidth: '600px',
      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
      },
    },
    info: {
      display: 'flex',
      gap: '10px',
    },
    disclaimer: {
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      zIndex: 10,
      gap: '10px',
    },
    buttonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
      },
    },
  };
});
