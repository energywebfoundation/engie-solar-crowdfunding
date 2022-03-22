/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { selectProvider } from '../redux-store';
import { Staking__factory, deployedAddress } from '@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts';
import { useState } from 'react';

enum ContractState {
  PAUSED = 'contractPaused',
  UNPAUSED = 'contractUnpaused',
  TERMINATED = 'campaignAborted',
}

export const useContractStatus = () => {
  const provider = useSelector(selectProvider);
  const signer = provider?.getSigner();
  const [contractState, setContractState] = useState<ContractState>();
  const stakingContract = Staking__factory.connect(deployedAddress, signer);

  stakingContract.on('StatusChanged', (eventState: ContractState) => {
    if (eventState !== contractState) {
      setContractState(eventState);
    }
  });

  return contractState;
};
