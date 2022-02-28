import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'start',
      flexDirection: 'row',
      gap: '30px',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
      },
    },
    paper: {
      width: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '30px',
      borderRadius: '16px',
      padding: '40px',
      height: '100%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '100%',
      },
    },
    buttonWrapper: {
      display: 'flex',
      minWidth: '445px',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '30px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    button: {
      cursor: 'pointer',
      borderRadius: '16px',
      padding: '20px',
      width: '100%',
    },
    selected: {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  };
});
