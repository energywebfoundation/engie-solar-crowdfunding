import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialog-paper': {
        borderRadius: '16px',
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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      padding: '15px',
    },
    button: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
    redeemButtons: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px',
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
