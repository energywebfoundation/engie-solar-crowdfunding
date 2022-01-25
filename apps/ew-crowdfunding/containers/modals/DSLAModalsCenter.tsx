import { FC } from 'react';
import { Login } from './Login';
import { Web3Notification } from './Web3Notification';

export const DSLAModalsCenter: FC = () => {
  return (
    <>
      <Web3Notification />
      <Login />
    </>
  );
};
