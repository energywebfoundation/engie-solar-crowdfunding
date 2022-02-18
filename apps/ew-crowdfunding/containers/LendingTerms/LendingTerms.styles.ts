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
      gap: '20px',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '700px',
      [theme.breakpoints.down(1052)]: {
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
