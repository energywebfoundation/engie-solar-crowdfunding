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
      borderRadius: '16px',
    },
    divider: {
      height: '3px',
      marginLeft: '5px',
      marginRight: '5px',
      width: '95%',
      background: 'rgba(0, 0, 0, 0.64)',
      borderRadius: '4px',
      margin: '0 auto',
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
      background: 'linear-gradient(253.88deg, #27163F -348.29%, #B5F9FE -262.61%, #27163F 81.26%)',
      borderRadius: '16px 16px 0px 0px',
      color: 'white',
      padding: '40px',
      minWidth: '320px',
    },
    contributionWrapper: {
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
      background: theme.palette.secondary.main,
      borderRadius: '0px 0px 16px 16px',
      color: 'white',
      padding: '40px 0px 40px 40px',
      minWidth: '320px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    contributionItem: {
      background: 'rgba(196, 196, 196, 0.16)',
      borderRadius: '16px 0px 0px 16px',
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
      padding: '40px 40px 40px 0px',
    },
    redeemableReward: {
      marginTop: '50px',
      padding: '16px',
      height: '86px',
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
    progressBarItem: {
      background: 'rgba(196, 196, 196, 0.16)',
      borderRadius: '0px 16px 16px 0px',
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
      paddingTop: '16px',
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
  };
});
