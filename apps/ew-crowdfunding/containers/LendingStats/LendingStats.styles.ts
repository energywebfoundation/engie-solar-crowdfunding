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
        maxWidth: '600px',
        [theme.breakpoints.down('md')]: {
          maxWidth: '100%',
        },
    }
  };
});
