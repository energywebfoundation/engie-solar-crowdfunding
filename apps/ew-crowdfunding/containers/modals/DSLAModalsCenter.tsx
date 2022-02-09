import { FC } from 'react';
import { Login } from './Login';
import { Web3Notification } from './Web3Notification';
import { Redeem } from './Redeem';
import { Confirm } from './Confirm';

export const DSLAModalsCenter: FC = () => {
  return (
    <>
      <Web3Notification />
      <Login />
      <Redeem />
      <Confirm />
    </>
  );
};
