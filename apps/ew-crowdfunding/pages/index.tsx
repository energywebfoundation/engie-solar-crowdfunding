import type { NextPage } from 'next';
import { Carousel, Contact, Footer } from '../containers';
import { AppContainer, ImageText, MediaText } from '../components';
import { theme } from '../dsla-theme';
import { Box, Paper } from '@mui/material';

const Home: NextPage = () => {
  return (
    <div>
      <Carousel />
      <AppContainer>
        <ImageText
          imagePath='/Store.png'
          title='Headline H2'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus. '
        />
        <ImageText
          imagePath='/House.png'
          title='Headline H2'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus. '
          reverse={true}
        />
      </AppContainer>
      <Paper style={{ background: theme.palette.primary.dark }}>
        <AppContainer darkBackground={true}>
          <ImageText
            imagePath='/Store2.png'
            title='Headline H2'
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus. '
          />
        </AppContainer>
      </Paper>
      <Box py={5} style={{ backgroundColor: ' #F8F9FA' }}>
        <AppContainer>
          <MediaText
            videoUrl='https://www.youtube.com/watch?v=fdXqhNjQQdM'
            heading='Lorem ipsum dolor sit amet'
            title='Headline H2'
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus. '
          />
        </AppContainer>
      </Box>
      <AppContainer>
        <ImageText
          imagePath='/AfricaMap.png'
          title='Headline H2'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus. '
          shadow={false}
        />
      </AppContainer>
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
