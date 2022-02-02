import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';
import detectMetamask from '@metamask/detect-provider';
import { useEffect, useState } from 'react';

export const useLoginEffects = () => {
  const {
    login: { open, isConnectedToRightNetwork, isMetamaskPresent, login },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();
  const [noMetamaskInstalled, setNoMetamaskInstalled] = useState(true);

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_LOGIN,
      payload: {
        open: false,
        isConnectedToRightNetwork,
        isMetamaskPresent,
        login,
      },
    });
  };

  const importMetamaskConf = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const metamaskProvider: any = await detectMetamask({
        mustBeMetaMask: true,
      });

      if (!metamaskProvider) {
        throw new Error('MetaMask not detected');
      }

      await metamaskProvider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${Number(process.env.NEXT_PUBLIC_CHAIN_ID).toString(16)}`, // Hexadecimal version of chain ID
            chainName: process.env.NEXT_PUBLIC_NETWORK_NAME,
            nativeCurrency: {
              name: process.env.NEXT_PUBLIC_CURRENCY_NAME,
              symbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL,
              decimals: 18,
            },
            rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
            blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL],
            iconUrls: [''],
          },
        ],
      });
      window.location.reload();
    } catch (addError) {
      console.log('Did not add network');
    }
  };

  const handleInstall = () => {
    window.open('https://metamask.io/', '_blank').focus();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setNoMetamaskInstalled(!((window as any).web3 || (window as any).ethereum));
  }, []);

  return {
    open,
    closeModal,
    isConnectedToRightNetwork,
    isMetamaskPresent,
    login,
    importMetamaskConf,
    handleInstall,
    noMetamaskInstalled,
  };
};
