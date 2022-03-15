import StakingTimelineEnum from './StakingTimelineEnum';
import useStakingTimeline from './useStakingTimeline';

const useStakingStatus = () => {
  const activateStakingDate = new Date(process.env.NEXT_PUBLIC_ACTIVATE_STAKING_DATE);
  const closeStackingDate = new Date(process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE);
  const lockStakesDate = new Date(process.env.NEXT_PUBLIC_LOCK_STAKES_DATE);
  const releaseRewardsDate = new Date(process.env.NEXT_PUBLIC_RELEASE_REWARDS_DATE);
  const finalStopDate = new Date(process.env.NEXT_PUBLIC_FULL_STOP_DATE);

  const stakingPeriod: StakingTimelineEnum = useStakingTimeline(
    activateStakingDate,
    closeStackingDate,
    lockStakesDate,
    releaseRewardsDate,
    finalStopDate,
  );
  let currentStakingPeriod: string;
  switch (stakingPeriod) {
    case StakingTimelineEnum.ACTIVATE_STAKING:
      currentStakingPeriod = 'Staking is now open!';
      break;
    case StakingTimelineEnum.CLOSE_STAKING:
      currentStakingPeriod = 'Staking is now closed!';
      break;
    case StakingTimelineEnum.LOCK_STAKES:
      currentStakingPeriod = 'Contributions are locked for solar loans.';
      break;
    case StakingTimelineEnum.RELEASE_REWARDS:
      currentStakingPeriod = 'Rewards have been released and solar loans realized.';
      break;
    case StakingTimelineEnum.FINAL_STOP:
      currentStakingPeriod = 'The campaign is complete.';
      break;
  }
  return currentStakingPeriod;
};

export default useStakingStatus;
