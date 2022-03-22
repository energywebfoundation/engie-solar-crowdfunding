import { StakingTimelineEnum } from './StakingTimelineEnum';
import { getStakingTimeline } from './getStakingTimeline';

export const getStakingStatus = (
  activateStakingDate: Date,
  closeStackingDate: Date,
  lockStakesDate: Date,
  releaseRewardsDate: Date,
  finalStopDate: Date,
) => {
  const stakingPeriod: StakingTimelineEnum = getStakingTimeline(
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
