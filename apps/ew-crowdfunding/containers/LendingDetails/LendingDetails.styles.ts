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
      borderRadius: '0',
    },
    divider: {
      position: 'absolute',
      height: '1px',
      width: '100%',
      background: 'rgba(0, 0, 0, 0.64)',
    },
    separator: {
      position: 'absolute',
      width: '100%',
      height: '1px',
      background: 'rgba(0, 0, 0, 0.64)',
      bottom: '120px',
      [theme.breakpoints.down('sm')]: {
        bottom: '230px',
      },
    },
    lendingContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '30px',
      },
    },
    formContainer: {
      width: '100%',
      padding: '40px',
    },
    lendingTitle: {
      background: 'linear-gradient(253.88deg, #0F1E29 -348.29%, #B5F9FE -262.61%, #0F1E29 81.26%)',
      borderRadius: '0',
      color: theme.palette.common.white,
      padding: '40px',
      minWidth: '320px',
    },
    contributionWrapper: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
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
      gap: '28px',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
      borderRadius: '0',
      color: theme.palette.common.black,
      padding: '40px 0px 0px 40px',
      minWidth: '320px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('md')]: {
        minWidth: '200px',
      },
    },
    contributionItem: {
      background: 'rgba(196, 196, 196, 0.16)',
      border: '1px solid rgba(0, 0, 0, 0.16)',
      borderRadius: '0',
      padding: '16px',
      height: '86px',
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
      [theme.breakpoints.between(1052, 1220)]: {
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'start',
      },
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
    redeem: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: '28px',
      padding: '40px 40px 0px 0px',
    },
    balance: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: '20px',
    },
    redeemableReward: {
      marginTop: '50px',
      padding: '0px 16px',
      height: '86px',
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
    progressBarItem: {
      background: 'rgba(196, 196, 196, 0.16)',
      border: '1px solid rgba(0, 0, 0, 0.16)',
      borderRadius: '0',
      padding: '16px',
      paddingLeft: '100px',
      height: '86px',
      [theme.breakpoints.down('md')]: {
        paddingLeft: '16px',
      },
      [theme.breakpoints.between(900, 1280)]: {
        paddingLeft: '5px',
      },
      display: 'flex',
      alignItems: 'center',
    },
    progress: {
      width: '100%',
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
    },
    redeemAction: {
      marginTop: '50px',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        marginBottom: '30px'
      },
    },
  };
});
