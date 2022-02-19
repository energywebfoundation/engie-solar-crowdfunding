import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '96px',
      background:
        'radial-gradient(351.92% 130.17% at 336.54% -20.19%, rgba(165, 102, 255, 0.01) 0%, rgba(204, 133, 242, 0.01) 31.25%, rgba(251, 170, 225, 0.01) 42.14%, rgba(83, 86, 116, 0.01) 58.67%, rgba(67, 67, 101, 0.01) 62.21%, rgba(40, 23, 64, 0.01) 91.96%)',
      boxShadow:
        'inset -10.05px -10.05px 30.15px rgba(0, 170, 255, 0.08), inset 10.05px 10.05px 30.15px rgba(0, 170, 255, 0.08)',
      backdropFilter: 'blur(15.7031px)',
      borderRadius: '16px',
      [theme.breakpoints.down('sm')]: {
        padding: '40px',
      },
    },
  };
});
