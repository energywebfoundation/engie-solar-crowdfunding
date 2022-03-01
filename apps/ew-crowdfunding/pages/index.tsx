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
          title='Who We Are'
          text='EEA is a leading off-grid, Pay-As-You-Go (PAYGo) solar and mini-grid solutions provider in Africa, delivering clean energy solutions to the most remote households on the world`s fastest growing continent. EEA has transformed 6.5 million lives in 9 countries and aims to reach 20 million by 2025. Learn more'
          link='https://engie-energyaccess.com/'
        />
        <ImageText
          imagePath='/House.png'
          title='Creating Impact'
          text='Sub-Saharan Africa has the world`s lowest energy access rate with over half of the population unconnected. Tackling this growing challenge requires grand-scale innovation and, most importantly, access to direct, low-cost financing. This crowdfunding platform unlocks capital from the global cryptocurrency market, bringing a significant new source of funding to clean energy deployment in Africa.'
          reverse={true}
        />
      </AppContainer>
      <Paper style={{ background: theme.palette.primary.dark }}>
        <AppContainer darkBackground={true}>
          <ImageText
            imagePath='/Store2.png'
            title='How does this platform work?'
            text='This DeFi platform uses the open-source Energy Web technology stack and runs on the Energy Web Chain. Micro-investors can finance the installation of clean energy assets by staking their Energy Web Tokens (EWT), the native token of the Energy Web Chain. In this first proof of concept, the target goal is to collect $100,000 worth of EWT within START_DATE and END_DATE.'
          />
        </AppContainer>
      </Paper>
      <Box py={5} style={{ backgroundColor: ' #F8F9FA' }}>
        <AppContainer>
          <MediaText
            videoUrl='https://www.youtube.com/watch?v=jkjfa3otdQM'
            heading='Why Crowdfund for Solar?'
            // title='Headline H2'
            text='These funds will be distributedas micro-loans to residents of Benin,Rwanda, and Zambia-African countries with some of the lowest rates of electrification enabling communities to purchase solar systems without taking out high-interest loans from traditional banks. These installations will increase clean energy access for X number of people. In addition to creating this impact, investors will be paid back their principal and 10% interest after the 1-year completion of the campaign.'
          />
        </AppContainer>
      </Box>
      <AppContainer>
        <ImageText
          imagePath='/AfricaMap.png'
          title='Empowering Communities'
          text='Funds raised will contribute to financing different types of projects including solar for homes, small businesses, and schools. Crypto investments will be translated into fair pricing plans paid back in installments by project owners via mobile money.'
          shadow={false}
        />
      </AppContainer>
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
