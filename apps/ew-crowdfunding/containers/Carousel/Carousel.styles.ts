import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    carousel: {
      backgroundImage: `linear-gradient(360deg, #0F1E29 0%, rgba(15, 30, 41, 0) 100%), url('./LandingCover.png')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    appBar: {
      background: 'rgba(15, 30, 41, 0.64)',
      border: `2px solid ${theme.palette.common.white}`,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '60px',
      padding: '104px',
      maxWidth: '750px',
      color: theme.palette.common.white,
    },
  };
});
