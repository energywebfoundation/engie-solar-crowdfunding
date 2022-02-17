import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      display: 'flex',
      width: '100%',
      borderRadius: 0,
      background: theme.palette.primary.dark,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
      padding: '20px',
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      padding: '20px',
      paddingLeft: '100px',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        paddingLeft: '0',
      },
    },
    socialLink: {
      marginRight: '30px',
      cursor: 'pointer',
    },
  };
});
