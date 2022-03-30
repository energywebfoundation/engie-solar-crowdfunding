import type { NextPage } from 'next';
import { Carousel, Contact, Footer, HowTo } from '../containers';
import { AppContainer, ImageText, MediaText } from '../components';
import { Box } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Carousel />
      <AppContainer>
        <ImageText
          imagePath='/WomenMarket.png'
          title='Leader in Africa`s off-grid solar'
          text='ENGIE Energy Access is the leading off-grid, Pay-As-You-Go (PAYGo) solar and mini-grid solutions provider in Africa. It delivers clean energy to the most remote households on the world’s fastest-growing continent. Thanks to its advanced product engineering and inclusive credit model, it has already transformed 6.5 million lives in 9 Sub-Saharan African countries and aims to reach 20 million by 2025.'
          link='https://engie-energyaccess.com/'
          linkText='Learn more'
          gradientText={true}
        />
        <ImageText
          imagePath='/House.png'
          title='Unlocking capital for change'
          text='Energy is Africa`s great challenge. Over 500 million Africans live without access to the electricity grid and rely on dangerous, dirty energy sources like kerosene. With the continent’s population predicted to double by 2050, there is an urgent need to increase clean energy usage. ENGIE Energy Access is tackling this growing challenge with grand-scale innovation. It can go further with access to direct, low-cost financing such as this Crowdfund for Solar platform, which unlocks capital from the global cryptocurrency market.'
          reverse={true}
          gradientText={true}
        />
      </AppContainer>
      <Box py={5} style={{ backgroundColor: ' #F8F9FA' }}>
        <AppContainer>
          <MediaText
            videoUrl='https://www.youtube.com/watch?v=J9LfencSqaQ&ab_channel=ENGIEEnergyAccess'
            heading='Why Crowdfund for solar?'
            text='This pilot platform is the first proof of concept leveraging decentralized finance (DeFi) to accelerate clean energy for all. These funds will be distributed as micro-loans to residents of low-electrification countries such as Rwanda, Uganda, and Zambia – enabling communities to gain affordable access to solar energy. These installations will increase clean energy access for at least 50 households and SMEs. In addition to creating this impact, investors will be paid back their principal and 10% interest after the 1-year completion of the campaign.'
            gradientText={true}
          />
        </AppContainer>
      </Box>
      <HowTo />
      <AppContainer>
        <ImageText
          imagePath='/Worker.png'
          title='How you can help'
          text='The funds raised from this platform will contribute to financing various types of life-enhancing projects, including providing solar energy for households, small businesses, and schools. Crypto investments will be translated into fair pricing plans paid back in installments by project owners via mobile money.'
          shadow={false}
          reverse={true}
          gradientText={true}
        />
      </AppContainer>
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
