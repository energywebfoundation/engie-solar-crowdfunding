import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    dialogTitle: {
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      padding: '13px',
      marginBottom: '25px',
    },
  };
});
