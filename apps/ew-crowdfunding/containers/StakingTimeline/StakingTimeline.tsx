import { FC } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useStyles } from './StakingTimeline.styles';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useStakingTimelineEffects, StakeTimeline } from './StakingTimeline.effects';
import { selectContractAdmin } from '../../redux-store';
import { useDispatch, useSelector } from 'react-redux';



export const StakingTimeline: FC = () => {
  const classes = useStyles();
  const { stakingPeriod, timelines, message } = useStakingTimelineEffects();

  return (
    <Paper className={classes.wrapper}>
      <Box className={classes.status}>
        <Typography variant='body2' className={classes.title}>
          Campaign Status
        </Typography>
        <Typography><strong>{message}</strong></Typography>
      </Box>
      <Box className={classes.timeline}>
        <Timeline position='alternate'>
          {timelines?.length &&
            timelines.map((timeline: StakeTimeline) => {
              return (
                <TimelineItem key={`${timeline.date}_${timeline.name}`}>
                  <TimelineOppositeContent color='info' className={stakingPeriod === timeline.name ? `gradient-text ${classes.bold}` : ''}>{timeline.date}</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={stakingPeriod === timeline.name ? 'secondary' : 'info'} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent className={stakingPeriod === timeline.name ? `gradient-text ${classes.bold}` : ''}>{timeline.name}</TimelineContent>
                </TimelineItem>
              );
            })}
        </Timeline>
        <Button
           variant='contained'
           type='submit'
           color='primary'

        >
          Pause Campaign
        </Button>
      </Box>
    </Paper>
  );
};
