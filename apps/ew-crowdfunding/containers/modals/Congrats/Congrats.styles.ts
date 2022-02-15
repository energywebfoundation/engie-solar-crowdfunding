import { makeStyles } from '@mui/styles';
import { theme } from '../../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialog-paper':{
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
  };
});
