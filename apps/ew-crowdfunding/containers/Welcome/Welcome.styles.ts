import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'start',
      width: '100%',
      position: 'relative',
      zIndex: 10,
      padding: '40px 0',
    },
    background: {
      backgroundImage: `url('./Cover.png')`,
      minHeight: '590px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      padding: '40px',
      paddingRight: '120px',
      position: 'relative',
      zIndex: 30,
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        paddingRight: '40px',
      },
    },
    paper: {
      width: '100%',
      maxWidth: '700px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '30px',
      borderRadius: '16px',
      padding: '40px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '100%',
      },
      zIndex: 10,
    },
    imageContainer: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginBottom: '-180px',
      marginRight: '-150px',
      zIndex: 1,
      [theme.breakpoints.between(750, 1650)]: {
        marginRight: '-50px',
      },
      [theme.breakpoints.down(750)]: {
        marginRight: 0,
      },
    },
    powerLogo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
