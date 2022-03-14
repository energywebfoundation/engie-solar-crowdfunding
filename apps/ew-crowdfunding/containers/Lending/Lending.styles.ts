import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'start',
      flexDirection: 'column',
      gap: '30px',
    },
    stakeContainer: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'start',
      flexDirection: 'row',
      gap: '30px',
      width: '100%',
      [theme.breakpoints.down(1052)]: {
        flexDirection: 'column',
      },
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '30px',
      minWidth: '450px',
      [theme.breakpoints.down(1052)]: {
        width: '100%',
      },
    },
  };
});
