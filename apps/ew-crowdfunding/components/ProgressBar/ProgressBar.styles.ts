import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    progress: {
      width: '100%',
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
    },
  };
});
