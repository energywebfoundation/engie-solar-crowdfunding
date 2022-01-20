import { Typography } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import { FC } from 'react';
import { theme } from '../../dsla-theme';
import { useStyles } from './ContributionItem.styles';

export interface IContributionItemProps {
  title: string;
  value: string | number;
  type: string;
}

export const ContributionItem: FC<IContributionItemProps> = ({ title, value, type }: IContributionItemProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Typography style={{ textTransform: 'uppercase' }} variant='h5' color={theme.palette.primary.main}>
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
