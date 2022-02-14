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
      // backgroundColor: 'radial-gradient(351.92% 130.17% at 336.54% -20.19%, #A566FF 0%, #CC85F2 31.25%, #FBAAE1 42.14%, #535674 66.62%, #434365 73.04%, #281740 91.96%)',
      // backgroundColor: 'grey',
      backgroundColor: '#D3D3D3',
    },
    barColorPrimary: {
      // backgroundColor: 'radial-gradient(351.92% 130.17% at 336.54% -20.19%, #A566FF 0%, #CC85F2 31.25%, #FBAAE1 42.14%, #535674 66.62%, #434365 73.04%, #281740 91.96%)',
      backgroundColor: '#27163F'
    },
  };
});
