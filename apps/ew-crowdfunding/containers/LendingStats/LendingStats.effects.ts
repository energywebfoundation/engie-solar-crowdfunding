import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalLentAmount, selectGlobalTokenLimit, selectProvider, selectTotalLentAmount } from '../../redux-store';
import { propertyExists } from '../../utils';

export const useLendingStatsEffects = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(undefined);
  const provider = useSelector(selectProvider);

  useEffect(() => {
    dispatch(getTotalLentAmount(provider));
  }, [dispatch, provider]);

  const totalLentAmount = useSelector(selectTotalLentAmount);
  const globalTokenLimit = useSelector(selectGlobalTokenLimit);

  console.log('totalLentAmount: ', totalLentAmount)
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
