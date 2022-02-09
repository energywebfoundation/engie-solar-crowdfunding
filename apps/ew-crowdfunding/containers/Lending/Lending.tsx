import { Box } from '@mui/material';
import { FC } from 'react';
import { RoleEnrollment, LendingDetails, LendingStats, LendingTerms } from '..';
import { useStyles } from './Lending.styles';

export const Lending: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <LendingDetails />
      <Box className={classes.info}>
        <RoleEnrollment />
        <LendingStats />
        <LendingTerms />
      </Box>
    </Box>
  );
};
