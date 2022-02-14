import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialog-paper':{
        borderRadius: '16px',
        minWidth: '370px',
      },
      '& .MuiDialogContent-root': {
        padding: theme.spacing(4),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(4),
      },
    },
    buttonContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
    },
    button: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
  };
});
