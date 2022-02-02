import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
      },
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      padding: '15px',
    },
    button: {
      width: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
  };
});
