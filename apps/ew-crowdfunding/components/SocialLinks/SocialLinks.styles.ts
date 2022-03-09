import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    socialLinks: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      padding: '20px',
      [theme.breakpoints.down(770)]: {
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
