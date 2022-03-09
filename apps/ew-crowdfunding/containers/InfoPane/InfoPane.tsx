import { FC } from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import { useStyles } from './InfoPane.styles';
import { Info, useInfoPaneEffects } from './InfoPane.effects';
import { ListComponent } from '../../components';

export const InfoPane: FC = () => {
  const classes = useStyles();
  const { selected, setSelected, infoList } = useInfoPaneEffects();

  return (
    <Box className={classes.wrapper}>
      {selected && (
        <Paper className={classes.paper}>
          <Typography variant='h3' className='gradient-text'>
            {selected.title}
          </Typography>
          {selected.paragraphs?.length &&
            selected.paragraphs.map((paragraph: { text: string; list?: string[] }) => {
              return (
                <Box key={paragraph.text} className={classes.paragraphWrapper}>
                  <Typography variant='h5'>{paragraph.text}</Typography>
                  {paragraph.list && <ListComponent listItems={paragraph.list} />}
                </Box>
              );
            })}
          {selected.hyperlinks?.length &&
            selected.hyperlinks.map((hyperlink: { name: string; link: string }) => {
              return (
                <Box key={hyperlink.name} className={classes.paragraphWrapper}>
                  <Link href={hyperlink.link} target='_blank'>
                    {hyperlink.name || hyperlink.link}
                  </Link>
                </Box>
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
              <Typography variant='h5' fontWeight={500}>
                {infoItem.name}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
