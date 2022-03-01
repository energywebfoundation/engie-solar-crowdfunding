import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    appBar: {
      backgroundColor: theme.palette.common.white,
      boxShadow: 'none',
    },
    didContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      [theme.breakpoints.down(505)]: {
        display: 'none',
      },
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
      padding: '3px',
    },
    logo: {
      cursor: 'pointer',
    },
  };
});
