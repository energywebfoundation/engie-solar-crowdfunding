/* eslint-disable @next/next/no-img-element */
import { Box, Container, Link, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './Welcome.styles';
import { ConnectCard, AppContainer } from '../../components';
import { RoleEnrollment } from '../RoleEnrollment';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from '../../redux-store';

export const Welcome: FC = () => {
  const classes = useStyles();
  const authenticated = useSelector(selectAuthenticated);

  return (
    <div>
      <Box className={classes.background}>
        <Box>{authenticated ? <RoleEnrollment /> : <ConnectCard />}</Box>
      </Box>
      <AppContainer>
        <Box className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Typography variant='h3' color='common.black' className='gradient-text'>
              Stake your Energy Web Tokens to provide energy access
            </Typography>
            <Typography variant='h5' color='common.black'>
              This staking pool is operated by Energy Web on behalf of ENGIE Energy Access and the Energy Web Community
              Fund. Crowdfund for Solar is ENGIE`S first proof of concept to test the potential of decentralized finance
              in bringing new solar installations for energy-deficient communities.
            </Typography>
            <Typography variant='h5' color='common.black'>
              Crowdfund for Solar is powered by the Energy Web`s open-source technology stack, specifically the
              Decentralized Identifiers (DID) and the Energy Web Chain (EWC). See the results of a successful
              smart-contract audit{' '}
              <Link href='' target='_blank'>
                here.
              </Link>
            </Typography>
            <Typography variant='h5' color='common.black'>
              The Energy Web Community Fund, dedicated entirely to enhancing Energy Web’s open-source technology stack
              and expanding its real-world use, is supporting this proof of concept by covering the repayment risk and
              guaranteeing the repayment of original stakes plus rewards.
            </Typography>
            <Link href='https://energy-web-foundation.gitbook.io/energy-web/token/staking' target='_blank'>
              Learn How to Stake EWT
            </Link>
            <Box className={classes.powerLogo}>
              <Typography mr={2} style={{ fontWeight: 700 }}>
                Powered by Lab.EnergyWeb
              </Typography>
              <img src='/EW_lab.png' alt='Lab icon' />
            </Box>
          </Paper>
          <img className={classes.imageContainer} src='/Bubbles2.png' alt='Engie Bubbles' />
        </Box>
      </AppContainer>
    </div>
  );
};
