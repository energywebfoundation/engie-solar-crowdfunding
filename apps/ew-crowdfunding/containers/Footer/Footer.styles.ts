import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      width: '100%',
      borderRadius: 0,
      [theme.breakpoints.down('sm')]: {
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
