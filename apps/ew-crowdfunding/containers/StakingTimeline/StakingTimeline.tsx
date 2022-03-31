import { FC, useEffect } from 'react';
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
import { getOwner, selectContractAdmin, selectProvider, selectAddress, selectIsPaused, setContractStatus } from '../../redux-store';
import { useDispatch, useSelector } from 'react-redux';



export const StakingTimeline: FC = () => {
  const classes = useStyles();
  const dispatch  = useDispatch();
  const provider = useSelector(selectProvider);
  const admin = useSelector(selectContractAdmin);
  const currentAddress = useSelector(selectAddress);
  const isContractPaused = useSelector(selectIsPaused);
  const { stakingPeriod, timelines, message } = useStakingTimelineEffects();
  
  useEffect(() => {
    console.log("Fetching Contract owner")
    dispatch(getOwner(provider));
  },[])

  const handleContractStatus = () => {
    const isOwner = admin === currentAddress;
    if (isContractPaused){
      //dispath Unpause Action
      console.log("UnPausing contract..");
      dispatch(setContractStatus('unPause', provider, isOwner))
    } else {
      //dispatch Pause action
      console.log("Pausing contract..");
      dispatch(setContractStatus('pause', provider, isOwner))
    }
  }

  const renderAdminButton = () => {
    return (
    <Button
      variant='contained'
      type='submit'
      color='primary'
      onClick={handleContractStatus}
    >
      {!isContractPaused ? 'Pause Campaign' : 'Unpause Campaign'}
    </Button>
  )
 }

  const isCurrentUserAdmin = () => {
    return currentAddress === admin;
  }

  return (
    <Paper className={classes.wrapper}>
      <Box className={classes.status}>
        <Typography variant='body2' className={classes.title}>
          Campaign Status
        </Typography>
        <Typography>
          <strong>{message}</strong>
        </Typography>
      </Box>
      <Box className={classes.timeline}>
        <Timeline position='alternate'>
          {timelines?.length &&
            timelines.map((timeline: StakeTimeline) => {
              return (
                <TimelineItem key={`${timeline.date}_${timeline.name}`}>
                  <TimelineOppositeContent
                    color='info'
                    className={stakingPeriod === timeline.name ? `gradient-text ${classes.bold}` : ''}
                  >
                    {timeline.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={stakingPeriod === timeline.name ? 'secondary' : 'info'} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent className={stakingPeriod === timeline.name ? `gradient-text ${classes.bold}` : ''}>
                    {timeline.name}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
        </Timeline>
        {isCurrentUserAdmin() && renderAdminButton()}
      </Box>
      <Box className={classes.infoMessage}>
        <Typography fontStyle='italic' variant='body2'>
          All times are displayed in the timezone of your browser.
        </Typography>
      </Box>
    </Paper>
  );
};
