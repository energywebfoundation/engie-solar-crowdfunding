import { UpdateWeb3Values } from '../state';

export const useProviderEvents = (
  provider: any,
  updateHandler: (values: UpdateWeb3Values) => void,
  closeHandler: () => void,
) => {
  const handleAccountsChanged = (accounts: string[]) => {
    // eslint-disable-next-line no-console
    console.log('accountsChanged', accounts);
    closeHandler();
    updateHandler({ address: accounts[0] });
  };

  const handleChainChanged = (_hexChainId: string) => {
    window.location.reload();
  };

  const handleDisconnect = (error: { code: number; message: string }) => {
    // eslint-disable-next-line no-console
    console.log('disconnect', error);
    closeHandler();
  };

  const handleEvents = () => {
    if (provider?.on) {
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);
      provider.on("connect", (info: { chainId: number }) => {
        console.log(info);
      });
      provider.on('network', (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
    }
  };

  return { handleEvents };
};
