import { Box, Container, Paper } from '@mui/material';
import { FC } from 'react';
import { InfoCard, InfoCardProps } from '../../components';
import { useInfoContainerEffects } from './InfoContainer.effects';
import { useStyles } from './InfoContainer.styles';

export const InfoContainer: FC = () => {
  const classes = useStyles();
  const { infoItems } = useInfoContainerEffects();
  return (
    <Paper className={classes.paper}>
      <Container maxWidth={false} className={classes.container}>
        <Box className={classes.wrapper}>
          {infoItems?.map((infoItem: InfoCardProps) => {
            return <InfoCard key={`${infoItem.title}-${infoItem.type}`} {...infoItem}></InfoCard>;
          })}
        </Box>
      </Container>
    </Paper>
  );
};
