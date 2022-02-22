import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ContributionItem.styles';

export interface IContributionItemProps {
  title: string;
  value: string | number;
  type: string;
  className?: string;
}

export const ContributionItem: FC<IContributionItemProps> = ({ title, value, type, className }: IContributionItemProps) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.wrapper} ${className}`}>
      <Typography variant='body2'>
        {title}
      </Typography>
      <Box className={classes.valueContainer}>
        <Typography variant='h4' fontWeight={'bold'}>
          {value}
        </Typography>
        <Typography variant='body2'>{type}</Typography>
      </Box>
    </Box>
  );
};
