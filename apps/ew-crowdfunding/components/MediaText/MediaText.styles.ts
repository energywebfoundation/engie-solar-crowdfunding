import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    mainWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '60px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '60px',
      width: '100%',
      [theme.breakpoints.down(1200)]: {
        flexDirection: 'column',
      },
      zIndex: 12,
    },
    mediaWrapper: {
      flex: '1 0 auto',
      borderRadius: '16px',
      position: 'relative',
      zIndex: 10,
    },
    player: {
      borderRadius: '16px',
      zIndex: 6,
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '24px',
      maxWidth: '500px',
      zIndex: 5,
    },
    ellipse: {
      position: 'absolute',
      left: '170px',
      top: '215px',
      zIndex: 2,
    },
    ellipse2: {
      position: 'absolute',
      left: '390px',
      top: '450px',
      zIndex: 3,
    }
  };
});
