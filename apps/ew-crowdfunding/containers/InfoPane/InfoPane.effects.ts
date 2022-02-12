import { useState } from 'react';

export type Info = {
  name: string;
  title: string;
  paragraphs: string[];
};

export const useInfoPaneEffects = () => {
  const infoList: Info[] = [
    {
      name: 'How it Works',
      title: 'How Solar Crowdfunding Works',
      paragraphs: [
        'By supporting the Solar Crowdfunding Pilot with your EWT, you are directly supporting expanding renewable energy access in the developing world. Use this site to trade your EWT for Solar Loan Tokens (SLT). Engie Energy Access will use the EWT you lent to fund small-scale solar + storage systems for people living in rural areas.',
        'After the recipients of these solar systems have paid off their systems, you will be able to use your SLT to reclaim your EWT plus a bonus equal to up to 10% of the EWT you lent. The program is expected to last 1-year from initiation.',
      ],
    },
    {
      name: 'Announcements',
      title: 'Announcements',
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
