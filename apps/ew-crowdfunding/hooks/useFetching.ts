import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDSLAModalsDispatch } from '../context';
import { getWeb3 } from '../redux-store';

export const useFetching = () => {
  const dispatch = useDispatch();
  const dispatchModals = useDSLAModalsDispatch();

  useEffect(() => {
    dispatch(getWeb3(dispatchModals));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
