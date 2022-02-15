import { useCongratsEffects } from './Congrats.effects';
import { DialogTitleProps, DialogContainer } from '../../../components';

export const Congrats = () => {
  const { open, closeModal } = useCongratsEffects();

  const titleProps: DialogTitleProps = {
    id: 'congrats-notification-dialog-title',
    title: 'Congratulations!',
    subtitle: 'You just signed a new staking contract. EWT is now sent to the staking pool!',
    icon: '/Confetti.png',
    colorClass: 'bg-success',
  };

  return <DialogContainer titleProps={titleProps} open={open} closeModal={closeModal} />;
};
