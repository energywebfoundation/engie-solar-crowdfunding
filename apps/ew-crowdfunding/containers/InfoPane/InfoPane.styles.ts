import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'start',
      flex: '1 1 0',
      gap: '20px',
    },
    paper: {
      width: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '20px',
      borderRadius: '16px',
      padding: '40px',
      height: '100%',
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      minWidth: '250px',
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
