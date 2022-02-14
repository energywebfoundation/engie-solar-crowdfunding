/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { useStyles } from './DialogTitle.styles';
import { Box, Typography } from '@mui/material';

export interface DialogTitleProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  colorClass?: string;
  children?: React.ReactNode;
}

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, title, subtitle, icon, colorClass } = props;
  const classes = useStyles();

  return (
    <DialogTitle className={classes.dialogTitle}>
      {icon && (
        <Box className={`${classes.iconWrapper} ${colorClass}`}>
          <img width={60} height={60} src={icon} alt={icon}></img>
        </Box>
      )}
      {title && (
        <Typography style={{ fontWeight: 500, fontSize: '24px' }}>
          {title}
        </Typography>
      )}
      {subtitle && <Typography variant='body2'>{subtitle}</Typography>}
      {children}
    </DialogTitle>
  );
};
