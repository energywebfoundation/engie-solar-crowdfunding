import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ApprovedSynced.styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const ApprovedSynced: FC = () => {
  const classes = useStyles();
  return (
    <Box className={`${classes.wrapper} successBorder`}>
      <Box className={classes.info}>
        <CheckCircleIcon color={`success`} />
        <Typography variant='body2'>You have verified your email and are authorized to stake.</Typography>
      </Box>
    </Box>
  );
};
