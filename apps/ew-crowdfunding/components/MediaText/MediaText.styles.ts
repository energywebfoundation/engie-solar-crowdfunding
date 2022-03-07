import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    mainWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '60px',
      justifyContent: 'space-betweem',
      width: '100%',
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
      borderRadius: '0',
      position: 'relative',
      zIndex: 10,
      [theme.breakpoints.down(1200)]: {
        width: '100%'
      },
      maxWidth: '600px',
      boxShadow: '-40px 4px 40px rgba(0, 0, 0, 0.24)',
    },
    player: {
      borderRadius: '0',
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
      left: '270px',
      top: '230px',
      zIndex: 2,
      [theme.breakpoints.down(1200)]: {
        left: '270px',
        top: '230px',
      },
      [theme.breakpoints.down(880)]: {
        left: '0',
        top: '230px',
      },
      [theme.breakpoints.down(550)]: {
        width: '300px',
        top: '330px',
      },
    },
  };
});
