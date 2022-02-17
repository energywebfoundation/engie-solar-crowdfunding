import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    container: {
      maxWidth: '1400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        padding: '50px',
      },
      [theme.breakpoints.down('md')]: {
        padding: '50px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '25px',
      },
      gap: '40px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'start',
      width: '100%',
      position: 'relative',
      zIndex: 10,
    },
    background: {
      backgroundImage: `url('./Cover.png')`,
      minHeight: '590px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
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
      marginRight: '-195px',
      marginBottom: '-50px',
      zIndex: 1,
    },
  };
});
