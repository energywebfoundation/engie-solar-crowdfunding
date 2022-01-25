import { Box } from '@mui/material';
import { FC } from 'react';
import { EmailVerification, LendingDetails, LendingStats, LendingTerms } from '..';
import { useStyles } from './Lending.styles';

export const Lending: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <LendingDetails />
      <Box className={classes.info}>
        <EmailVerification />
        <LendingStats />
        <LendingTerms />
      </Box>
    </Box>
  );
};
