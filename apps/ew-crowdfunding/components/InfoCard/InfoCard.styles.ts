import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      flex: '1 0 30%',
      [theme.breakpoints.down('md')]: {
        flex: '1 0 48%',
      },
      [theme.breakpoints.between(750, 1052)]: {
        flex: '1 0 48%',
      },
      [theme.breakpoints.down(750)]: {
        flex: '1 0 98%',
      },
    },
    darkPaper: {
      padding: '24px',
      width: 'auto',
      height: '173px',
      background:
        'radial-gradient(351.92% 130.17% at 336.54% -20.19%, rgba(165, 102, 255, 0.01) 0%, rgba(204, 133, 242, 0.01) 31.25%, rgba(251, 170, 225, 0.01) 42.14%, rgba(83, 86, 116, 0.01) 58.67%, rgba(67, 67, 101, 0.01) 62.21%, rgba(40, 23, 64, 0.01) 91.96%);',
      boxShadow:
        'inset -10.05px -10.05px 30.15px rgba(29, 8, 58, 0.24), inset 10.05px 10.05px 30.15px rgba(29, 8, 58, 0.24)',
      borderRadius: '16px 16px 0px 0px',
    },
    title: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '5px',
    },
    border: {
      marginTop: '-6px',
      height: '6px',
      background: 'linear-gradient(135deg, #00AAFF 0.89%, #23D2B5 94.05%)',
      borderRadius: '0px 0px 16px 16px'
    },
  };
});
