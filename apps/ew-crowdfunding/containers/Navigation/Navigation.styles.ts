import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    appBar: {
      backgroundColor: theme.palette.common.white,
      boxShadow: 'none',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toolbarMessage: {
      [theme.breakpoints.down(897)]: {
        display: 'none',
      },
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
      height: '2.5rem',
    },
  };
});
