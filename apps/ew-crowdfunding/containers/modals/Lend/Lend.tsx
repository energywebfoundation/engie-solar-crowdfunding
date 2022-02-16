import { useLendEffects } from './Lend.effects';
import { DialogContainer, DialogTitleProps, DialogAction } from '../../../components';

export const Lend = () => {
  const { open, amount, onLend, closeModal } = useLendEffects();
  const titleProps: DialogTitleProps = {
    id: 'lend-dialog-title',
    title: 'Lending process',
    subtitle: `Do you want to lend ${amount} EWT?`,
  };

  const dialogAction: DialogAction = {
    name: 'Confirm',
    type: 'button',
    onAction: () => {
      onLend(amount);
      closeModal();
    },
  };

  return <DialogContainer titleProps={titleProps} open={open} closeModal={closeModal} dialogAction={dialogAction} />;
};
