import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialog-paper': {
        borderRadius: '0',
        minWidth: '370px',
        maxWidth: '450px',
      },
      '& .MuiDialogContent-root': {
        padding: theme.spacing(4),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(4),
      },
    },
    button: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
    dialogActions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
    },
  };
});
