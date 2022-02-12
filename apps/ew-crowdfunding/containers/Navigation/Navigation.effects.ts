import { useDispatch, useSelector } from 'react-redux';
import {
  requestLogout,
  selectAuthenticated,
  selectDid,
  selectIsLoading,
  selectProvider,
  selectSigner,
} from '../../redux-store';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import { useEffect, useState } from 'react';
import WalletConnectProvider from '@walletconnect/ethereum-provider';

export const useNavigationEffects = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const authenticated = useSelector(selectAuthenticated);
  const did = useSelector(selectDid);
  const [avatar, setAvatar] = useState<string>(null);
  const provider = useSelector(selectProvider);
  const signer = useSelector(selectSigner);

  const logout = async () => {
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    if (signer instanceof WalletConnectProvider) {
      await signer.disconnect();
    }
    dispatch(requestLogout());
  };

  useEffect(() => {
    if (did) {
      const svgAvatar = createAvatar(style, {
        seed: did,
        dataUri: true,
        colors: [
          'amber',
          'deepOrange',
          'blueGrey',
          'deepPurple',
          'grey',
          'indigo',
          'lime',
          'orange',
          'pink',
          'purple',
          'teal',
          'yellow',
        ],
      });
      setAvatar(svgAvatar);
    }
  }, [did]);

  return {
    isLoading,
    authenticated,
    did,
    avatar,
    logout,
  };
};
