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
      gap: '30px',
      padding: '30px',
    },
    divider: {
      height: '3px',
      width: '100%',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
    },
    lendingDetails: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '30px',
      },
    },
    contributionWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'start',
      },
    },
    contribution: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: '10px',
    },
    box: {
      width: '100%',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: '10px',
    },
    details: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'start',
      },
    },
    disclaimer: {
      display: 'flex',
      zIndex: 10,
      gap: '5px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'start',
      },
    },
    buttonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
      },
    },
    progress: {
      width: '100%',
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
    },
  };
});
