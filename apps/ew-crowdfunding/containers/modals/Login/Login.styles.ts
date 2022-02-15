import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
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
