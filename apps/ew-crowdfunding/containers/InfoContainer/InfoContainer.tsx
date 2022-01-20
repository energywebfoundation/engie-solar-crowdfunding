import { Box } from '@mui/material';
import { FC } from 'react';
import { InfoCard, InfoCardProps } from '../../components';
import { useInfoContainerEffects } from './InfoContainer.effects';
import { useStyles } from './InfoContainer.styles';

export const InfoContainer: FC = () => {
  const classes = useStyles();
  const { infoItems } = useInfoContainerEffects();
  return (
    <Box className={classes.wrapper}>
      {infoItems?.map((infoItem: InfoCardProps) => {
        return <InfoCard key={`${infoItem.title}-${infoItem.type}`} {...infoItem}></InfoCard>;
      })}
    </Box>
  );
};
