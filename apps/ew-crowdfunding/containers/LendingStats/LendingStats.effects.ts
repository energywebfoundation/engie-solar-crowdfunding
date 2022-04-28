import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalLentAmount, selectGlobalTokenLimit, selectProvider, selectTotalLentAmount } from '../../redux-store';
import { propertyExists } from '../../utils';
import { Staking__factory, deployedAddress } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';


export const useLendingStatsEffects = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(undefined);
  const provider = useSelector(selectProvider);
  const signer = provider?.getSigner();
  const stakingContract = Staking__factory.connect(deployedAddress, signer);


  stakingContract?.on('NewStake', () => {
    dispatch(getTotalLentAmount(provider));
  });
  stakingContract?.on('Withdrawn', () => {
    dispatch(getTotalLentAmount(provider));
  });
  stakingContract?.on('Swept', () => {
    dispatch(getTotalLentAmount(provider));
  });
  useEffect(() => {
    dispatch(getTotalLentAmount(provider));
  }, [dispatch, provider]);

  const totalLentAmount = useSelector(selectTotalLentAmount);
  const globalTokenLimit = useSelector(selectGlobalTokenLimit);

  useEffect(() => {
    if (propertyExists(totalLentAmount) && propertyExists(globalTokenLimit)) {
      setIsReady(true);
    }
  }, [totalLentAmount, globalTokenLimit]);

  return {
    isReady,
    totalLentAmount,
    globalTokenLimit,
  };
};
