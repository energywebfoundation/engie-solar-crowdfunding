import { useWeb3NotificationEffects } from './Web3Notification.effects';
import { DialogContainer, DialogTitleProps } from '../../../components';

export const Web3Notification = () => {
  const { open, config, closeModal } = useWeb3NotificationEffects();
  const titleProps: DialogTitleProps = {
    id: 'eb3-notification-dialog-title',
    title: config?.title,
    subtitle: config?.text,
  };

  return <DialogContainer titleProps={titleProps} open={open} closeModal={closeModal} />;
};
