import { UpdateWeb3Values } from '../state';
import { ProviderType, ProviderEvent } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';

export const useProviderEvents = (
  provider: any,
  providerType: ProviderType,
  updateHandler: (values: UpdateWeb3Values) => void,
  closeHandler: () => void,
) => {
  const handleAccountsChanged = (accounts: string[]) => {
    // eslint-disable-next-line no-console
    console.log('accountsChanged', accounts);
    closeHandler();
    updateHandler({ address: accounts[0] });
  };

  const handleNetworkChanged = () => {
    // eslint-disable-next-line no-console
    console.log('network changed');
    closeHandler();
    // updateHandler({ address: accounts[0] });
  };

  const handleChainChanged = (_hexChainId: string) => {
    console.log('chain changed');
    window.location.reload();
  };

  const handleDisconnect = (error: { code: number; message: string }) => {
    // eslint-disable-next-line no-console
    console.log('disconnect', error);
    closeHandler();
  };

  const handleEvents = () => {
    console.log('Handle events: ', provider, provider?.on);
    if (provider?.on) {
      if (providerType === ProviderType.MetaMask) {
        provider.on(ProviderEvent.AccountChanged, handleAccountsChanged);
        provider.on(ProviderEvent.NetworkChanged, handleNetworkChanged);
        provider.on(ProviderEvent.ChainChanged, handleChainChanged);
        provider.on(ProviderEvent.Network, (_newNetwork, oldNetwork) => {
          // When a Provider makes its initial connection, it emits a "network"
          // event with a null oldNetwork along with the newNetwork. So, if the
          // oldNetwork exists, it represents a changing network
          if (oldNetwork) {
            window.location.reload();
          }
        });
      } else if (providerType === ProviderType.WalletConnect) {
        provider.on(ProviderEvent.Disconnected, handleDisconnect);
        provider.on(ProviderEvent.SessionUpdate, handleDisconnect);
      }
      provider.on(ProviderEvent.Connected, (info: { chainId: number }) => {
        console.log(info);
      });
    }
  };

  return { handleEvents };
};
