import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '20px',
      borderRadius: '0',
      padding: '40px',
      paddingBottom: '52px',
      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
      },
    },
    title: {
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '24px',
    },
    status: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: '10px',
    },
    timeline: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bold: {
      fontWeight: 600,
    }
  };
});
