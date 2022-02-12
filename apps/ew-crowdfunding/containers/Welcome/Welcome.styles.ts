import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      flex: '1 1 auto',
      gap: '50px',
    },
    paper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '20px',
      borderRadius: '16px',
      padding: '40px',
    },
    imageContainer: {
      width: '100%',
    },
  };
});
