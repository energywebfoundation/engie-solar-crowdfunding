import { useConfirmEffects } from './Confirm.effects';
import { DialogContainer, DialogTitleProps, DialogAction } from '../../../components';

export const Confirm = () => {
  const { open, title, onConfirm, text, closeModal } = useConfirmEffects();

  const titleProps: DialogTitleProps = {
    id: 'confirm-dialog-title',
    title,
    subtitle: text,
  };

  const dialogAction: DialogAction = {
    name: 'Confirm',
    type: 'button',
    onAction: () => {
      onConfirm();
      closeModal();
    },
  };

  return <DialogContainer titleProps={titleProps} open={open} closeModal={closeModal} dialogAction={dialogAction} />;
};
