import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      width: '100%',
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
    },
    colorPrimary: {
      backgroundColor: '#D3D3D3',
    },
    barColorPrimary: {
      backgroundColor: '#552382'
    },
  };
});
