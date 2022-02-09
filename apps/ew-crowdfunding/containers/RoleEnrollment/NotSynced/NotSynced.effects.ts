import { useDispatch } from 'react-redux';
import { addRole } from '../../../redux-store';

export const useNotSyncedEffects = () => {
  const dispatch = useDispatch();

  const onAddRole = () => {
    dispatch(addRole());
  };
  return onAddRole;
};
