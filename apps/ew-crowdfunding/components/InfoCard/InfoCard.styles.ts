import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      padding: '24px',
      maxWidth: '400px',
      width: 'auto',
      height: '173px',
      borderRadius: 0,
      [theme.breakpoints.down('md')]: {
        maxWidth: '350px',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
    title: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '5px',
    },
    border: {
      marginTop: "-6px",
      height: '6px',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
    },
  };
});
