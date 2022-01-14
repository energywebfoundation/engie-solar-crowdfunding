import { makeStyles } from '@mui/styles';
import { theme } from '../../../theme';

export const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
      },
    },
  };
});
