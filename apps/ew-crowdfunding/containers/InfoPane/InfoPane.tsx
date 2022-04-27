import { FC } from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import { useStyles } from './InfoPane.styles';
import { Info, useInfoPaneEffects } from './InfoPane.effects';
import { ListComponent } from '../../components';

export const InfoPane: FC = () => {
  const classes = useStyles();
  const { selected, setSelected, infoList } = useInfoPaneEffects();

  const getPlaceholderText = (text : string) => {
    switch(text){
      case "EEA's financial report" :
        return "Coming soon: impact report by ENGIE Energy Access at the end of the campaign (Q2 2023)";
      case "EW's launch PR" :
        return "EW's launch PR (Coming Soon)";
      case "Engie's PR" :
        return "Coming soon: joint Press Release of Energy Web and ENGIE Energy Access";
      default: return text;
    }
  }

  return (
    <Box className={classes.wrapper}>
      {selected && (
        <Paper className={classes.paper}>
          <Typography variant='h3' className='gradient-text'>
            {selected.title}
          </Typography>
          {selected.paragraphs?.length &&
            selected.paragraphs.map((paragraph: {
              isBoldish?: boolean;
              boldText?: string;
              text: string;
              link?: {
                label: string;
                url: string;
              };
              list?: string[];
            }) => {
              return (
                <Box key={paragraph.text} className={classes.paragraphWrapper}>
                  <Typography variant='h5'>{paragraph.isBoldish ?
                    <>
                      <strong>{paragraph.boldText}</strong> {paragraph.text} 
                      <Link href={paragraph.link.url} target='_blank'>
                        {paragraph.link.label}
                      </Link>
                    </> 
                    : paragraph.text}</Typography>
                  {paragraph.list &&  <ListComponent listItems={paragraph.list} />}
                </Box>
              );
            })}
          {selected.hyperlinks?.length &&
            selected.hyperlinks.map((hyperlink: { name: string; link: string }) => {
              return (
                <Box key={hyperlink.name} className={classes.paragraphWrapper}>
                  {hyperlink.link !== '' && <Link href={hyperlink.link} target='_blank'>
                    {hyperlink.name || hyperlink.link}
                  </Link>}
                  {hyperlink.link === '' && <Typography variant='body1' fontStyle="italic">{getPlaceholderText(hyperlink.name)}</Typography>}
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
