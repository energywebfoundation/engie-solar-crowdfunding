import { useSelector } from 'react-redux';
import StakingTimelineEnum from '../../context/hooks/StakingTimelineEnum';
import useStakingTimeline from '../../context/hooks/useStakingTimeline';
import {
  selectActivateStackingDate,
  selectContributionDeadline,
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
  const stakingPeriod: StakingTimelineEnum = useStakingTimeline();
  let currentStakingPeriod: string;

  const activateStakingDate = formatDate(new Date(useSelector(selectActivateStackingDate)));
  const closeStackingDate = formatDate(new Date(useSelector(selectContributionDeadline)));
  const lockStakesDate = formatDate(new Date(useSelector(selectLockStakesDate)));
  const releaseRewardsDate = formatDate(new Date(useSelector(selectReleaseRewardsDate)));
  const timelines: StakeTimeline[] = [
    {
      date: activateStakingDate,
      name: StakingTimelineEnum.ACTIVATE_STAKING,
    },
    {
      date: closeStackingDate,
      name: StakingTimelineEnum.CLOSE_STAKING,
    },
    {
      date: lockStakesDate,
      name: StakingTimelineEnum.LOCK_STAKES,
    },
    {
      date: releaseRewardsDate,
      name: StakingTimelineEnum.RELEASE_REWARDS,
    },
  ];

  switch (stakingPeriod) {
    case StakingTimelineEnum.BEFORE_STAKING:
      currentStakingPeriod = 'Staking has not started yet';
      break;
    case StakingTimelineEnum.ACTIVATE_STAKING:
      currentStakingPeriod = 'Staking is activated and in progress';
      break;
    case StakingTimelineEnum.CLOSE_STAKING:
      currentStakingPeriod = 'Staking is closed or the funding goal has been reached';
      break;
    case StakingTimelineEnum.LOCK_STAKES:
      currentStakingPeriod = 'Contributions are locked';
      break;
    case StakingTimelineEnum.RELEASE_REWARDS:
      currentStakingPeriod = 'Rewards are released';
      break;
  }

  const message = `Today ${DateTime.fromJSDate(new Date()).toFormat('dd LLL yy')}, ${currentStakingPeriod}`;

  return {
    stakingPeriod,
    timelines,
    message,
  };
};
