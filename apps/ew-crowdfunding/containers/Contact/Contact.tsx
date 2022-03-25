/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Typography, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { AppContainer } from '../../components';
import { useStyles } from './Contact.styles';
import Link from 'next/link';
import { formatUTCDate, getStakingStatus } from '../../utils';

export const Contact: FC = () => {
  const classes = useStyles();

  const activateStakingDate = formatUTCDate(process.env.NEXT_PUBLIC_ACTIVATE_STAKING_DATE);
  const closeStackingDate = formatUTCDate(process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE);
  const lockStakesDate = formatUTCDate(process.env.NEXT_PUBLIC_LOCK_STAKES_DATE);
  const releaseRewardsDate = formatUTCDate(process.env.NEXT_PUBLIC_RELEASE_REWARDS_DATE);
  const finalStopDate = formatUTCDate(process.env.NEXT_PUBLIC_FULL_STOP_DATE);

  const stakingMessage = getStakingStatus(
    activateStakingDate,
    closeStackingDate,
    lockStakesDate,
    releaseRewardsDate,
    finalStopDate,
  );

  return (
    <Box py={5} className={classes.container}>
      <AppContainer>
        <Box className={classes.wrapper}>
          <Typography variant='h3'>Invest today and help electrify X homes!</Typography>
          <Typography variant='h5' mt={5} align='center'>
            EEA and Energy Web are committed to identifying opportunities to further scale and improve this solution.
            Interested in partnering or have feedback?
          </Typography>
          <Typography variant='h5' mt={3} align='center'>
            Contact Energy Web at
            <a className={classes.link} href='mailto:Lab@energyweb.org'>
              Lab@energyweb.org
            </a>
          </Typography>
          <Typography variant='h5' mb={5} align='center'>
            and EEA at
            <a className={classes.link} href='mailto:stefan.zelazny@engie.com.'>
              stefan.zelazny@engie.com.
            </a>
          </Typography>
          {stakingMessage && (
            <Typography variant='h5' style={{ fontWeight: '600' }} mb={5} align='center'>
              {stakingMessage}
            </Typography>
          )}
          <Link href='/wallet'>
            <a>
              <Button style={{ width: '200px' }} variant='contained'>
                Fund solar
              </Button>
            </a>
          </Link>
        </Box>
      </AppContainer>
    </Box>
  );
};
