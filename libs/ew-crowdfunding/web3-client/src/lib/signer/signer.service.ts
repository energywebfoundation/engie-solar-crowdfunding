import { BigNumber, providers, Wallet, ethers, utils, Signer } from 'ethers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { Methods } from '@ew-did-registry/did';
import { chainConfigs } from '../config/chain.config';
import { ProviderType, ProviderEvent, AccountInfo, IPubKeyAndIdentityToken, PUBLIC_KEY } from './signer.types';
import base64url from 'base64url';
import { computeAddress } from 'ethers/lib/utils';
import { ExecutionEnvironment, executionEnvironment } from '../utils';
import { ERROR_MESSAGES } from '../errors';

const { arrayify, keccak256, recoverPublicKey, getAddress, hashMessage } = utils;
export type ServiceInitializer = () => Promise<void>;
export class SignerService {
  private _publicKey!: string;
  private _isEthSigner!: boolean;
  private _identityToken!: string;
  private _address!: string;
  private _account!: string;

  private _chainId!: number;
  private _chainName!: string;
  private _chainDisplayName!: string;

  private _servicesInitializers: ServiceInitializer[] = [];

  private _walletEventListeners: { event: ProviderEvent; cb: any }[] = [];

  constructor(private _signer: Required<Signer>, private _providerType: ProviderType) {}

  async init() {
    if (executionEnvironment() === ExecutionEnvironment.BROWSER) {
      this._publicKey = localStorage.getItem(PUBLIC_KEY) as string;
    }
    try {
      this._address = await this.signer.getAddress();
      this._chainId = (await this._signer.provider.getNetwork()).chainId;
    } catch (error) {
      console.log('error: ', error);
    }
    this._chainDisplayName = chainConfigs()[this._chainId].chainDisplayName;
    this._chainName = chainConfigs()[this._chainId].chainName;
    if (this._signer instanceof providers.JsonRpcSigner) {
      this._account = (await this._signer.provider.listAccounts())[0];
    } else if (this._signer instanceof Wallet) {
      this._account = this._address;
    }
    /**
     * @todo provide general way to initialize with previously saved key
     */
    this.initEventHandlers();

    for await (const initializer of this._servicesInitializers) {
      await initializer();
    }
  }

  /**
   * Registers reinitialization of dependent service on signer reconnection
   */
  onInit(initializer: ServiceInitializer) {
    this._servicesInitializers.push(initializer);
  }

  async emit(e: ProviderEvent) {
    await Promise.all(
      this._walletEventListeners
        .map(({ event, cb }) => {
          return e === event ? cb() : null;
        })
        .filter(Boolean),
    );
  }

  on(event: ProviderEvent, cb: () => void) {
    this._walletEventListeners.push({ event, cb });
  }

  /**
   * Add event handler for certain events
   * @requires to be called after the connection to wallet was initialized
   */
  initEventHandlers() {
    const accChangedHandler = async () => {
      await this.closeConnection();
      await this.init();
    };
    if (this._providerType === ProviderType.MetaMask) {
      this.on(ProviderEvent.AccountChanged, accChangedHandler);
      this.on(ProviderEvent.NetworkChanged, accChangedHandler);
    } else if (this._providerType === ProviderType.WalletConnect) {
      this.on(ProviderEvent.SessionUpdate, accChangedHandler);
      this.on(ProviderEvent.Disconnected, this.closeConnection);
    }
  }

  get signer() {
    return this._signer;
  }

  get address() {
    return this._address;
  }

  get accountInfo(): AccountInfo {
    return { account: this._account, chainId: this._chainId, chainName: this._chainDisplayName };
  }

  get provider() {
    return this._signer.provider;
  }

  get chainId() {
    return this._chainId;
  }

  async balance() {
    return this.signer.getBalance();
  }

  get providerType() {
    return this._providerType;
  }

  get did() {
    return `did:${Methods.Erc1056}:${this.chainName()}:${this._address}`;
  }

  async send({ to, data, value }: providers.TransactionRequest): Promise<providers.TransactionReceipt> {
    const tx = { to, from: this.address, data, ...(value && { value: BigNumber.from(value) }) };
    const receipt = await (await this._signer.sendTransaction(tx)).wait();
    return receipt;
  }

  /**
   * Makes a (readonly) call to a smart contract
   * https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/-%23-Provider-call
   * @param params.to adddress of contract
   * @param params.data call data
   * @returns The result of the call
   */
  async call({ to, data }: providers.TransactionRequest): Promise<string> {
    const tx = { to, from: this.address, data };
    const result = await this._signer.call(tx);
    return result;
  }

  async signMessage(message: Uint8Array) {
    return this.signer.signMessage(message);
  }

  async connect(signer: Required<ethers.Signer>, providerType: ProviderType) {
    this._signer = signer;
    this._providerType = providerType;
    await this.init();
  }

  async closeConnection() {
    if (this._signer instanceof WalletConnectProvider) {
      await this._signer.disconnect();
    }
    return true;
  }

  chainName() {
    return this._chainName;
  }

  async publicKeyAndIdentityToken(): Promise<IPubKeyAndIdentityToken> {
    if (!this._publicKey || !this._identityToken) {
      await this._calculatePubKeyAndIdentityToken();
    }
    return {
      publicKey: this._publicKey,
      identityToken: this._identityToken,
    };
  }

  private async _calculatePubKeyAndIdentityToken() {
    const header = {
      alg: 'ES256',
      typ: 'JWT',
    };
    const encodedHeader = base64url(JSON.stringify(header));
    const address = this._address;
    const payload = {
      iss: `did:${Methods.Erc1056}:${this.chainName()}:${address}`,
      claimData: {
        blockNumber: await this._signer.provider.getBlockNumber(),
      },
    };

    const encodedPayload = base64url(JSON.stringify(payload));
    const token = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString('hex')}`;
    // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
    // keccak256 hash is applied for Metamask to display a coherent hex value when signing
    const message = arrayify(keccak256(token));
    // Computation of the digest in order to recover the public key under the assumption
    // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
    const digest = arrayify(hashMessage(message));
    const sig = await this._signer.signMessage(message);
    const keyFromMessage = recoverPublicKey(message, sig);
    const keyFromDigest = recoverPublicKey(digest, sig);
    if (getAddress(this._address) === computeAddress(keyFromMessage)) {
      this._publicKey = keyFromMessage;
      this._isEthSigner = false;
    } else if (getAddress(this._address) === computeAddress(keyFromDigest)) {
      this._publicKey = keyFromDigest;
      this._isEthSigner = true;
    } else {
      throw new Error(ERROR_MESSAGES.NON_ETH_SIGN_SIGNATURE);
    }

    this._identityToken = `${encodedHeader}.${encodedPayload}.${base64url(sig)}`;
  }
}
