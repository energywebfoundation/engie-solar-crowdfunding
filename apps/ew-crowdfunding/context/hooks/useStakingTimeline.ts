import StakingTimelineEnum from './StakingTimelineEnum';

const useStakingTimeline = (
  activateStakingDate: Date,
  closeStackingDate: Date,
  lockStakesDate: Date,
  releaseRewardsDate: Date,
): StakingTimelineEnum => {
  if (!activateStakingDate || !closeStackingDate || !lockStakesDate || !releaseRewardsDate) {
    return;
  }
  const currentDate = new Date();

  if (currentDate < activateStakingDate) {
    return StakingTimelineEnum.BEFORE_STAKING;
  } else if (currentDate >= activateStakingDate && currentDate < closeStackingDate) {
    return StakingTimelineEnum.ACTIVATE_STAKING;
  } else if (currentDate >= closeStackingDate && currentDate < lockStakesDate) {
    return StakingTimelineEnum.CLOSE_STAKING;
  } else if (currentDate >= lockStakesDate && currentDate < releaseRewardsDate) {
    return StakingTimelineEnum.LOCK_STAKES;
  } else if (currentDate >= releaseRewardsDate) {
    return StakingTimelineEnum.RELEASE_REWARDS;
  }
};

export default useStakingTimeline;
