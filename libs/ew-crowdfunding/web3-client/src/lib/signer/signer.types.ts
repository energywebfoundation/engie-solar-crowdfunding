export enum ProviderType {
    WalletConnect = "WalletConnect",
    MetaMask = "MetaMask",
}

export enum ProviderEvent {
    /**
     * Metamask events https://docs.metamask.io/guide/ethereum-provider.html#events
     */
    AccountChanged = "accountsChanged",
    NetworkChanged = "networkChanged",
    ChainChanged = "chainChanged",
    Connected = "connect",
    Network = "network",
    /**
     * WalletConnect events https://docs.walletconnect.com/1.0/client-api#register-event-subscription
     */
    Disconnected = "disconnect",
    SessionUpdate = "session_update",
}

export interface IPubKeyAndIdentityToken {
    publicKey: string;
    identityToken: string;
}

export type AccountInfo = {
    chainName: string;
    chainId: number;
    account: string;
};

export const PUBLIC_KEY = "PublicKey";
