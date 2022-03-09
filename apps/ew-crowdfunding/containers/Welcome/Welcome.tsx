/* eslint-disable @next/next/no-img-element */
import { Box, Container, Paper, Typography } from '@mui/material';
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
              Stake your Energy Web Tokens to provide Energy Access
            </Typography>
            <Typography variant='h5' color='common.black'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut lectus nec ante congue gravida. Nunc
              ligula arcu, sodales commodo auctor eget, auctor vel tellus. Nunc egestas sem eu malesuada porta.
              Phasellus mattis sagittis magna id commodo. Maecenas vulputate tortor vitae sapien vehicula varius.
            </Typography>
            <Typography variant='h5' color='common.black'>
              Sed tincidunt lorem ut ante feugiat, at vehicula nibh scelerisque. Suspendisse potenti. Vestibulum et
              porta erat.
            </Typography>
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
