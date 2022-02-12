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
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: '10px',
      width: '100%',
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
    divider: {
      marginRight: '-40px',
      marginLeft: '-40px'
    }
  };
});
