import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      background: theme.palette.primary.dark,
      paddingTop: '130px',
      paddingBottom: '130px',
      position: 'relative',
      borderRadius: 0,
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '20px',
    },
    topBubble: {
      position: 'absolute',
      top: '45px',
      right: 15,
    },
    downLeftBubble1: {
      position: 'absolute',
      left: 0,
      bottom: 10,
    },
    downLeftBubble2: {
      position: 'absolute',
      left: '50px',
      bottom: 10,
    },
    downRightBubble: {
      position: 'absolute',
      bottom: 45,
      right: 120,
    },
  };
});
