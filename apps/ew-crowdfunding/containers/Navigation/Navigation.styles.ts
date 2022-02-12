import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
      padding: '3px'
    },
  };
});
