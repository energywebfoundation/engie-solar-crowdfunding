import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '10px',
    },
    valueContainer: {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'end',
      gap: '10px',
    },
  };
});
