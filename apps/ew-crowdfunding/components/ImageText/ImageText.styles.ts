import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '60px',
      width: '100%',
      [theme.breakpoints.down(1200)]: {
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
      alignItems: 'start',
      gap: '24px',
      maxWidth: '500px'
    },
  };
});
