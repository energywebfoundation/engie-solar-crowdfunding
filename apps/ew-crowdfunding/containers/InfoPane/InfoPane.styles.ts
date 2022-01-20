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
      gap: '20px',
    },
  };
});
