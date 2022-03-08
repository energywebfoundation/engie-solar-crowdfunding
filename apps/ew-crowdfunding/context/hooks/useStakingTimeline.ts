import { useSelector } from 'react-redux';
import {
  selectContributionDeadline,
  selectLockStakesDate,
  selectReleaseRewardsDate,
  selectActivateStackingDate,
} from '../../redux-store';
import StakingTimelineEnum from './StakingTimelineEnum';

const useStakingTimeline = (): StakingTimelineEnum => {
  const currentDate = new Date();
  const activateStakingDate = new Date(useSelector(selectActivateStackingDate));
  const closeStackingDate = new Date(useSelector(selectContributionDeadline));
  const lockStakesDate = new Date(useSelector(selectLockStakesDate));
  const releaseRewardsDate = new Date(useSelector(selectReleaseRewardsDate));

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
