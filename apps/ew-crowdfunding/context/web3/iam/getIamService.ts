import { setChainConfig, setCacheConfig } from '@engie-solar-crowdfunding/ew-crowdfunding/web3-client';
import { LoginOptions } from './types';
import { getSignerService } from './getSignerService';

export const getIamService = async ({ providerType }: LoginOptions) => {
  // // Set Cache Server
  setCacheConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    url: process.env.NEXT_PUBLIC_CACHE_SERVER,
  });
  // Set RPC
  setChainConfig(+process.env.NEXT_PUBLIC_CHAIN_ID || 73799, {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  });

  try {
    if (window.ethereum) {
      console.log('No ethereum object!');
      const { signerService, connectToCacheServer } = await getSignerService(providerType);
      const { cacheClient } = await connectToCacheServer();

      return {
        signerService,
        cacheClient,
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error('No ethereum object');
  }
};
