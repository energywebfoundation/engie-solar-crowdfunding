/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Typography, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { AppContainer } from '../../components';
import { useStyles } from './Contact.styles';
import Link from 'next/link';
import { useStakingStatus } from '../../hooks';

export const Contact: FC = () => {
  const classes = useStyles();
  const stakingMessage = useStakingStatus();
  const [stackingStatus, setStackingStatus] = useState<string>(stakingMessage);

  useEffect(() => {
    setStackingStatus(stakingMessage);
  }, [stakingMessage]);

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
          {stackingStatus && (
            <Typography variant='h5' style={{ fontWeight: '600' }} mb={5} align='center'>
              {stackingStatus}
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
