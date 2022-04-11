/* eslint-disable @next/next/no-img-element */
import { Box, Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { InfoCard, InfoCardProps, AppContainer } from '../../components';
import { useInfoContainerEffects } from './InfoContainer.effects';
import { useStyles } from './InfoContainer.styles';

export const InfoContainer: FC = () => {
  const classes = useStyles();
  const { infoItems } = useInfoContainerEffects();
  return (
    <Paper className={classes.paper}>
      <img className={classes.topBubble} src='/Bubbles1.png' alt='Engie bubble' />
      <AppContainer>
        <Typography variant='h3' className='gradient-text'>
          Problems Addressed by the Crowdfund for Solar
        </Typography>
        <Box className={classes.wrapper}>
          {infoItems?.map((infoItem: InfoCardProps) => {
            return <InfoCard key={`${infoItem.title}-${infoItem.type}`} {...infoItem}></InfoCard>;
          })}
        </Box>
      </AppContainer>
      <img className={classes.downRightBubble} src='/BubbleDownRight.png' alt='Engie bubble' />
      <img className={classes.downLeftBubble1} src='/BubbleDownLeft1.png' alt='Engie bubble' />
      <img className={classes.downLeftBubble2} src='/BubbleDownLeft2.png' alt='Engie bubble' />
    </Paper>
  );
};
