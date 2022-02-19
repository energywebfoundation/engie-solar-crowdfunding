import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    container: {
      maxWidth: '1400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        padding: '50px',
      },
      [theme.breakpoints.down('md')]: {
        padding: '50px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '25px',
      },
      gap: '40px',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '60px',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    imageWrapper: {
      flex: '1 0 auto',
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '24px',
      maxWidth: '500px'
    },
  };
});
