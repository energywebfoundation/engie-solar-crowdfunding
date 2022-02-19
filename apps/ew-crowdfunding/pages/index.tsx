import type { NextPage } from 'next';
import { Container } from '@mui/material';
import { theme } from '../dsla-theme';
import { Carousel, Footer } from '../containers';
import { ImageText } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Carousel />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          [theme.breakpoints.up('md')]: {
            padding: '50px',
          },
          [theme.breakpoints.down('md')]: {
            padding: '50px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '25px',
          },
          gap: '40px',
        }}
      >
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
        <ImageText
          imagePath='/AfricaMap.png'
          title='Headline H2'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a fringilla tortor. Donec eu diam ut velit auctor ultrices. Mauris in augue pellentesque mauris dignissim hendrerit at in purus. '
        />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
