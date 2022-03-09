import { useState } from 'react';

export type Info = {
  name: string;
  title: string;
  paragraphs: string[];
  hyperlinks?: {
    name: string;
    link: string;
  }[];
};

export const useInfoPaneEffects = () => {
  const infoList: Info[] = [
    {
      name: 'How It Works',
      title: 'How The Clean Energy Fund Works',
      paragraphs: [
        'By joining the The Clean Energy Fund with your EWT, you are increasing renewable energy access in the developing world. Engie Energy Access will use your EWT to fund small-scale solar and storage systems for people needing reliable energy access in Benin, Rwanda and Zambia.',
        'The recipients (e.g., school, households, small businesses) will be paying for these solar systems in frequent and affordable intervals. These repayments will then be used to cover the staked EWT and 10% rewards to everyone who participated in this pilot on [RELEASE REWARDS] date. In this pilot, the Community Fund will cover all the risks in case of default or the recipients needing more time for repayment. So your stakes and rewards are guaranteed.',
        'The pilot aims at collecting $100,000 worth of EWT, which will be locked for 1 year from the initiation.',
      ],
    },
    {
      name: 'Step-by-step Guide',
      title: 'Step-by-step guide on how to use this site',
      paragraphs: [
        'By supporting the Solar Crowdfunding Pilot with your EWT, you are directly supporting expanding renewable energy access in the developing world. Use this site to trade your EWT for Solar Loan Tokens (SLT). Engie Energy Access will use the EWT you lent to fund small-scale solar + storage systems for people living in rural areas.',
        'After the recipients of these solar systems have paid off their systems, you will be able to use your SLT to reclaim your EWT plus a bonus equal to up to 10% of the EWT you lent. The program is expected to last 1-year from initiation.',
      ],
    },
    {
      name: 'Risks',
      title: 'Risks',
      paragraphs: [
        'By supporting the Solar Crowdfunding Pilot with your EWT, you are directly supporting expanding renewable energy access in the developing world. Use this site to trade your EWT for Solar Loan Tokens (SLT). Engie Energy Access will use the EWT you lent to fund small-scale solar + storage systems for people living in rural areas.',
        'After the recipients of these solar systems have paid off their systems, you will be able to use your SLT to reclaim your EWT plus a bonus equal to up to 10% of the EWT you lent. The program is expected to last 1-year from initiation.',
      ],
    },
    {
      name: 'Progress Reporting',
      title: 'Progress Reporting',
      paragraphs: [
        'By supporting the Solar Crowdfunding Pilot with your EWT, you are directly supporting expanding renewable energy access in the developing world. Use this site to trade your EWT for Solar Loan Tokens (SLT). Engie Energy Access will use the EWT you lent to fund small-scale solar + storage systems for people living in rural areas.',
        'After the recipients of these solar systems have paid off their systems, you will be able to use your SLT to reclaim your EWT plus a bonus equal to up to 10% of the EWT you lent. The program is expected to last 1-year from initiation.',
      ],
    },
  ];
  const [selected, setSelected] = useState<Info>(infoList[0]);

  return {
    selected,
    setSelected,
    infoList,
  };
};
