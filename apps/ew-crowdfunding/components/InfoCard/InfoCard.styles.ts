import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    paper: {
      padding: '24px',
      maxWidth: '350px',
      width: 'auto',
      height: '173px',
      borderRadius: 0,
    },
    title: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '5px',
    },
    border: {
      marginTop: "-6px",
      height: '6px',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
    },
  };
});
