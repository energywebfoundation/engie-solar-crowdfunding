import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      zIndex: 10,
      borderRadius: 0,
      paddingLeft: '100px',
      paddingRight: '100px',
      background: theme.palette.primary.dark,
      justifyContent: 'space-between',
      [theme.breakpoints.down(860)]: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 0,
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
  };
});
