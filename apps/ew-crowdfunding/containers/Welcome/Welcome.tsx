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
  const energyWebChainLink = "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/trust-layer-energy-web-chain";
  const enrgyWebDIDLink = "https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#decentralized-identifiers-dids";
  const btBlockAuditLink = "https://github.com/energywebfoundation/engie-solar-crowdfunding/blob/d174e7ebe6aad06c455cfa8889d3e1f38f21bd79/Public%20Copy%20of%20Energy%20Web%20AG%20-%20Security%20Assessment%20of%20Engie%20Solar%20Crowdfunding%20v2.1%20final.pdf";
  
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
              Fund. Crowdfund for Solar is ENGIE'S first proof of concept to test the potential of decentralized finance
              in bringing new solar installations for energy-deficient communities.
            </Typography>
            <Typography variant='h5' color='common.black'>
              Crowdfund for Solar is powered by the Energy Web's open-source technology stack, specifically the
              <Link href={enrgyWebDIDLink} target="_blank"> Decentralized Identifiers</Link> and the public <Link href={energyWebChainLink} target="_blank">Energy Web blockchain</Link>. See the results of a successful
              smart-contract audit{' '}
              <Link href={btBlockAuditLink} target='_blank'>
                here.
              </Link>
            </Typography>
            <Typography variant='h5' color='common.black'>
              The Energy Web Community Fund, dedicated entirely to enhancing Energy Web’s open-source technology stack
              and expanding its real-world use, is supporting this proof of concept by covering the repayment risk and
              guaranteeing the repayment of original stakes plus rewards.
            </Typography>
            <Link href="https://www.youtube.com/watch?v=bRmKdNjk_zQ&feature=youtu.beg" target='_blank'>
              Learn how to stake EWT on Crowdfund for Solar
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
