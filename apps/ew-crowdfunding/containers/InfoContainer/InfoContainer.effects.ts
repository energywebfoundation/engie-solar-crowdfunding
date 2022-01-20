import { InfoCardProps } from '../../components';

export const useInfoContainerEffects = () => {
  const infoItems: InfoCardProps[] = [
    {
      title: '~ 621',
      type: 'million',
      text: 'Two in every three people in Africa, around 621 million in total, have no access to electricity.',
    },
    {
      title: '90',
      type: '%',
      text: 'In 11 countries in Africa, more than 90% of people go completely without electricity.',
    },
    {
      title: '79',
      type: '%',
      text: '79% of people living in Third World African nations have no access to electricity.',
    },
    {
      title: '3 - 5',
      type: '%',
      text: 'Only 3-5% of people have easy access to electric power, just in a few African countries.',
    },
    {
      title: '518',
      type: 'kWh',
      text: 'Annual consumption is 518 KWh in Sub-Saharan Africa.',
    },
    {
      title: '4',
      type: '%',
      text: 'The continent accounts for less than 4% of global electricity use.',
    },
  ];

  return {
    infoItems,
  };
};
