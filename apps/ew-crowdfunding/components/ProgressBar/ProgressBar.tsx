import { FC } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useStyles } from './ProgressBar.styles';

export interface ProgressBardProps {
  value: number;
  limit: number;
  description: string;
  className?: string;
}

export const ProgressBar: FC<ProgressBardProps> = ({ value, limit, description, className }: ProgressBardProps) => {
  const classes = useStyles();
  const displayedProgress = Number(value) !== 0 && Number(limit) !== 0 ? Number((value / limit) * 100) : 0;
  const displayValue = Number(value) !== 0 && Number(limit) !== 0 ? (Number(value) / Number(limit)) * 100 : 0;

  return (
    <Box className={classes.wrapper}>
      <LinearProgress
        style={{ height: 10, borderRadius: 5 }}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: className ? className : classes.barColorPrimary,
        }}
        value={displayValue}
        variant='determinate'
        color='primary'
      />
      <Typography variant='body2'>
        {displayedProgress?.toLocaleString('en-US')}% of {Number(limit)?.toLocaleString('en-US')} {description}
      </Typography>
    </Box>
  );
};
