import { InfoCardProps } from '../../components';

export const useInfoContainerEffects = () => {
  const infoItems: InfoCardProps[] = [
    {
      title: '~ 759',
      type: 'million',
      text: 'Globally 759 million people - 1 out of 10 - do not have access to electricity.',
    },
    {
      title: '75',
      type: '%',
      text: "Sub-Saharan Africa accounts for 75 percent of the world's population without access to electricity.",
    },
    {
      title: '20',
      text: 'Among the 20 countries that comprise the smallest share of population with access to electricity, all are located in sub-Saharan Africa.',
    },
    {
      title: '>50',
      type: '%',
      text: 'Half of secondary schools in sub-Saharan Africa do not have power, which significantly restricts access to night time or evening classes, computers, internet, projectors and much more.',
    },
    {
      title: '4',
      type: '%',
      text: 'Despite being home to 17% of the world`s population, Africa currently accounts for just 4% of global power supply investment.',
    },
    {
      title: '2.6',
      type: 'billion',
      text: 'Around 2.6 billion people have to rely on dirty biomass fuels such as charcoal, coal and animal waste for cooking.',
    },
  ];

  return {
    infoItems,
  };
};
