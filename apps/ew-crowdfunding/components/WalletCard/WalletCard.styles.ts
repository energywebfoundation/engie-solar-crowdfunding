import { makeStyles } from '@mui/styles';
import { theme } from '../../dsla-theme';

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
        minWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        borderRadius: '16px !important',
        [theme.breakpoints.down("md")]: {
            width: '100%'
          },
    },
    title: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        borderRadius: '16px 16px 0 0',
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        padding: '13px',
        width: '96px',
        height: '96px',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        paddingTop: '16px',
        padding: '40px',
    }
  };
});
