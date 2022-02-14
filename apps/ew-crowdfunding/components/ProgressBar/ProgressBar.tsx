import { FC } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useStyles } from './ProgressBar.styles';

export interface ProgressBardProps {
  value: number;
  limit: number;
  description: string;
}

export const ProgressBar: FC<ProgressBardProps> = ({ value, limit, description }: ProgressBardProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <LinearProgress
        style={{ height: 10, borderRadius: 5 }}
        classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}
        value={(value / limit) * 100}
        variant='determinate'
        color='primary'
      />
      <Typography variant='body2'>
        {(value / limit) * 100}% of {limit} {description}
      </Typography>
    </Box>
  );
};
