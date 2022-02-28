import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    redeemButtons: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px',
    },
  };
});
