import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialogContent-root': {
        padding: theme.spacing(6),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
      },
    },
    button: {
      width: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
  };
});
