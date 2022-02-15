import { Button, Dialog, DialogActions, DialogContent, Divider } from '@mui/material';
import { FC } from 'react';
import { BootstrapDialogTitle, DialogTitleProps } from '../DialogTitle';
import { useStyles } from './DialogContainer.styles';

export interface DialogAction {
    name: string;
    type: 'button' | 'reset' | 'submit';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAction?: (value?: any) => void;
}

export interface DialogContainerProps {
  titleProps: DialogTitleProps;
  open: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  dialogAction?: DialogAction;
}

export const DialogContainer: FC<DialogContainerProps> = ({ titleProps, children, open, closeModal, dialogAction }) => {
  const classes = useStyles();
  return (
    <Dialog className={classes.dialog} aria-labelledby='login-dialog-title' open={open}>
      <BootstrapDialogTitle {...titleProps} />
      {children ? <DialogContent dividers>{children}</DialogContent> : <Divider />}
      <DialogActions className={classes.dialogActions}>
        {dialogAction && (
          <Button
            variant='contained'
            type={dialogAction.type}
            color='primary'
            style={{ width: '100%' }}
            onClick={dialogAction.onAction}
          >
            {dialogAction.name}
          </Button>
        )}
        <Button variant='outlined' color='primary' style={{ width: '100%' }} autoFocus onClick={closeModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
