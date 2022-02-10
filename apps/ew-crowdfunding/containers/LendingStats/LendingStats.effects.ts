import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalLentAmount, selectGlobalTokenLimit, selectTotalLentAmount } from '../../redux-store';
import { propertyExists } from '../../utils';

export const useLendingStatsEffects = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState<boolean>(undefined);

  useEffect(() => {
    dispatch(getTotalLentAmount());
  });

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
