import { FC } from 'react';
import { Login } from './Login';
import { Web3Notification } from './Web3Notification';
import { Redeem } from './Redeem';
import { Confirm } from './Confirm';
import { Congrats } from './Congrats';
import { Lend } from './Lend';

export const DSLAModalsCenter: FC = () => {
  return (
    <>
      <Web3Notification />
      <Login />
      <Redeem />
      <Confirm />
      <Congrats />
      <Lend />
    </>
  );
};
