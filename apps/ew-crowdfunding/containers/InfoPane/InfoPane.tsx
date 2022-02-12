import { FC } from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import { useStyles } from './InfoPane.styles';
import { Info, useInfoPaneEffects } from './InfoPane.effects';

export const InfoPane: FC = () => {
  const classes = useStyles();
  const { selected, setSelected, infoList } = useInfoPaneEffects();

  return (
    <Box className={classes.wrapper}>
      {selected && (
        <Paper className={classes.paper}>
          <Typography variant='h3'>{selected.title}</Typography>
          {selected.paragraphs.map((paragraph: string) => {
            return (
              <Typography variant='h5' key={paragraph}>
                {paragraph}
              </Typography>
            );
          })}
        </Paper>
      )}
      <Box className={classes.buttonWrapper}>
        {infoList.map((infoItem: Info) => {
          return (
            <Paper
              className={`${classes.button} ${selected.name === infoItem.name ? classes.selected : ''}`}
              onClick={() => setSelected(infoItem)}
              key={`${infoItem.name}-${infoItem.title}`}
            >
              <Typography align='center' variant='h5' fontWeight={500}>
                {infoItem.name}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
