import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ContributionItem.styles';

export interface IContributionItemProps {
  title: string;
  value: string | number;
  type: string;
  className?: string;
  titleClass?: string;
}

export const ContributionItem: FC<IContributionItemProps> = ({
  title,
  value,
  type,
  className,
  titleClass,
}: IContributionItemProps) => {
  const classes = useStyles();
  const displayedValue = Number(value).toPrecision(6).replace(/0+$/, '');
  let formmatedDisplayedValue: string;

  if (displayedValue?.toString()[displayedValue.toString().length - 1] === '.') {
    formmatedDisplayedValue = displayedValue.slice(0, -1);
  } else {
    formmatedDisplayedValue = displayedValue;
  }

  return (
    <Box className={`${classes.wrapper} ${className}`}>
      <Typography variant='body2' className={titleClass}>
        {title}
      </Typography>
      <Box className={classes.valueContainer}>
        <Typography variant='h4' fontWeight={'bold'}>
          {formmatedDisplayedValue}
        </Typography>
        <Typography variant='body2'>{type}</Typography>
      </Box>
    </Box>
  );
};
