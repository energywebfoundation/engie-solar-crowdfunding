import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      flex: '1 0 30%',
      [theme.breakpoints.down('md')]: {
        flex: '1 0 48%',
      },
      [theme.breakpoints.between(750, 1052)]: {
        flex: '1 0 48%',
      },
      [theme.breakpoints.down(750)]: {
        flex: '1 0 98%',
      },
    },
    paper: {
      padding: '24px',
      width: 'auto',
      height: '173px',
      borderRadius: 0,
    },
    title: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '5px',
    },
    border: {
      marginTop: '-6px',
      height: '6px',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
    },
  };
});
