import { makeStyles } from '@mui/styles';
import { theme } from '../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    backgroundImage: {
      backgroundImage: 'url(/Vector.png)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100%',
      minHeight: '100%',
      zIndex: 5,
      top: 0,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'start',
      gap: 20,
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  };
});
