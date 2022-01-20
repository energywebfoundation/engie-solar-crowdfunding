import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '20px',
    }
  };
});
