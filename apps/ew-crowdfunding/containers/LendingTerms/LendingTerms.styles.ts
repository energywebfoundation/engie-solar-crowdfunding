import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '10px',
      paddingBottom: '20px',
      maxWidth: '600px',
      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
      },
    },
    listWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '10px',
      padding: '20px',
    },
    listItem: {
      justifyContent: 'start',
      alignItems: 'start',
      padding: 0,
      margin: 0,
    },
  };
});
