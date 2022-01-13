import { makeStyles } from "@mui/styles";
import { theme } from '../../theme';
export const useStyles = makeStyles(() => {
 return ({
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      padding: "30px",
      borderRadius: "8px",
      border: `1px solid ${theme.palette.primary.main}`
    },
    button: {
      width: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
    },
  })
});
