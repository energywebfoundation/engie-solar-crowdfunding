import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    listWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      gap: '10px',
    },
    listItem: {
      justifyContent: 'start',
      alignItems: 'start',
      padding: 0,
      margin: 0,
    },
  };
});
