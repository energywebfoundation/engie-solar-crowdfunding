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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'start',
      gap: '100px',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '40px',
      },
    },
    background: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      flex: '1 1 auto',
      gap: '50px',
    },
    paper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '20px',
      borderRadius: '16px',
      padding: '40px',
    },
    imageContainer: {
      width: '100%',
    },
  };
});
