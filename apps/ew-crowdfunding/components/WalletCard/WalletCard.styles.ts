import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      maxWidth: '450px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    title: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      borderRadius: '9',
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      padding: '13px',
    },
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      paddingTop: '16px',
      padding: '40px',
    },
  };
});
