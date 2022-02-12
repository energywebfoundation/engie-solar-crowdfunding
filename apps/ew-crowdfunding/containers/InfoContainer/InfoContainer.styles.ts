import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      background: theme.palette.secondary.main,
      paddingTop: '130px',
      paddingBottom: '130px'
    },
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
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '20px',
    }
  };
});
