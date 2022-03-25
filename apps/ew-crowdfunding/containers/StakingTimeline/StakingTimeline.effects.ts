import { useSelector } from 'react-redux';
import { getStakingTimeline, StakingTimelineEnum } from '../../utils';
import {
  selectActivateStackingDate,
  selectContributionDeadline,
  selectFinalStopDate,
  selectLockStakesDate,
  selectReleaseRewardsDate,
} from '../../redux-store';
import { formatDate } from '../../utils';
import { DateTime } from 'luxon';

export type StakeTimeline = {
  date: string;
  name: StakingTimelineEnum;
};

export const useStakingTimelineEffects = () => {
  const activateStakingDate = new Date(useSelector(selectActivateStackingDate));
  const closeStackingDate = new Date(useSelector(selectContributionDeadline));
  const lockStakesDate = new Date(useSelector(selectLockStakesDate));
  const releaseRewardsDate = new Date(useSelector(selectReleaseRewardsDate));
  const finalStopDate = new Date(useSelector(selectFinalStopDate));

  const stakingPeriod: StakingTimelineEnum = getStakingTimeline(
    activateStakingDate,
    closeStackingDate,
    lockStakesDate,
    releaseRewardsDate,
    finalStopDate,
  );
  let currentStakingPeriod: string;

  const timelines: StakeTimeline[] = [
    {
      date: formatDate(activateStakingDate),
      name: StakingTimelineEnum.ACTIVATE_STAKING,
    },
    {
      date: formatDate(closeStackingDate),
      name: StakingTimelineEnum.CLOSE_STAKING,
    },
    {
      date: formatDate(lockStakesDate),
      name: StakingTimelineEnum.LOCK_STAKES,
    },
    {
      date: formatDate(releaseRewardsDate),
      name: StakingTimelineEnum.RELEASE_REWARDS,
    },
    {
      date: formatDate(finalStopDate),
      name: StakingTimelineEnum.FINAL_STOP,
    },
  ];

  switch (stakingPeriod) {
    case StakingTimelineEnum.BEFORE_STAKING:
      currentStakingPeriod = 'Staking has not started yet.';
      break;
    case StakingTimelineEnum.ACTIVATE_STAKING:
      currentStakingPeriod = 'Staking is activated and in progress.';
      break;
    case StakingTimelineEnum.CLOSE_STAKING:
      currentStakingPeriod = 'Staking is closed or the funding goal has been reached.';
      break;
    case StakingTimelineEnum.LOCK_STAKES:
      currentStakingPeriod = 'Contributions are locked.';
      break;
    case StakingTimelineEnum.RELEASE_REWARDS:
      currentStakingPeriod = 'Rewards are released.';
      break;
    case StakingTimelineEnum.FINAL_STOP:
      currentStakingPeriod = 'The campaign is complete.';
      break;
  }

  const message = `Today ${DateTime.fromJSDate(new Date()).toFormat('dd LLL yyyy')}: ${currentStakingPeriod}`;

  return {
    stakingPeriod,
    timelines,
    message,
  };
};
