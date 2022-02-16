import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'start',
      flex: '1 1 0',
      gap: '30px',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
      },
    },
    paper: {
      width: '100%',
      maxWidth: '700px',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '30px',
      borderRadius: '16px',
      padding: '40px',
      height: '100%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '100%',
      },
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '20px',
      minWidth: '250px',
      maxWidth: '450px',
      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
        width: '100%',
      },
    },
    button: {
      cursor: 'pointer',
      borderRadius: '16px',
      padding: '20px',
      width: '100%',
    },
    selected: {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  };
});
