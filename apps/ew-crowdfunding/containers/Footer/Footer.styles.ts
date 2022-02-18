import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      display: 'flex',
      width: '100%',
      borderRadius: 0,
      paddingLeft: '100px',
      paddingRight: '100px',
      background: theme.palette.primary.dark,
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
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
    socialLinks: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      padding: '20px',
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
