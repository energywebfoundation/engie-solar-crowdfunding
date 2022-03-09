import { useState } from 'react';

export type Info = {
  name: string;
  title: string;
  paragraphs?: {
    text: string;
    list?: string[];
  }[];
  hyperlinks?: {
    name: string;
    link: string;
  }[];
};

export const useInfoPaneEffects = () => {
  const activateStakingDate = new Date(process.env.NEXT_ACTIVATE_STAKING_DATE);
  const closeStackingDate = new Date(process.env.NEXT_CLOSE_STAKING_DATE);
  const lockStakesDate = new Date(process.env.NEXT_LOCK_STAKES_DATE);
  const releaseRewardsDate = new Date(process.env.NEXT_RELEASE_REWARDS_DATE);

  const infoList: Info[] = [
    {
      name: 'How It Works',
      title: 'How The Clean Energy Fund Works',
      paragraphs: [
        {
          text: 'By joining the The Clean Energy Fund with your EWT, you are increasing renewable energy access in the developing world. Engie Energy Access will use your EWT to fund small-scale solar and storage systems for people needing reliable energy access in Benin, Rwanda and Zambia.',
        },
        {
          text: 'The recipients (e.g., school, households, small businesses) will be paying for these solar systems in frequent and affordable intervals. These repayments will then be used to cover the staked EWT and 10% rewards to everyone who participated in this pilot on [RELEASE REWARDS] date. In this pilot, the Community Fund will cover all the risks in case of default or the recipients needing more time for repayment. So your stakes and rewards are guaranteed.',
        },
        {
          text: 'The pilot aims at collecting $100,000 worth of EWT, which will be locked for 1 year from the initiation.',
        },
      ],
    },
    {
      name: 'Step-by-step Guide',
      title: 'Step-by-step guide on how to use this site',
      paragraphs: [
        {
          text: `You can already enroll into the campaign by connecting your wallet, verifying your email and adding an onchain “patron” role to your wallet. Anyone can enroll until ${closeStackingDate}`,
        },
        {
          text: `From ${activateStakingDate} date, stake your EWT and receive Solar Loan Tokens (SLT) as proof of participation. `,
          list: [
            `You can use (transfer and withdraw) your SLT immediately - note that you will need your SLT if you want to withdraw your EWT.`,
            `If you change your mind, you can withdraw your EWT until ${closeStackingDate} date without any rewards by depositing the SLT back.`,
          ],
        },
        {
          text: `After the ${closeStackingDate}, your staked EWT will be locked for 1 year from ${lockStakesDate} date until the ${releaseRewardsDate} date.`,
        },
        {
          text: `On ${releaseRewardsDate} date, you will be able to withdraw your EWT and corresponding rewards.`,
          list: [
            'Deposit your SLT to the connected wallet and click “Redeem”. This will burn your SLT and release your EWT.',
            'The rewards are 10% of the redeemed SLT.',
          ],
        },
      ],
    },
    {
      name: 'Announcements',
      title: 'Keep up-to-date with the most recent news',
      hyperlinks: [
        {
          name: 'Initial PR',
          link: 'https://medium.com/energy-web-insights/engie-energy-access-and-energy-web-announce-defi-crowdfunding-platform-to-help-scale-solar-mini-2142029ad84f',
        },
        {
          name: 'EW`s launch PR',
          link: '',
        },
        {
          name: 'Engie`s PR',
          link: '',
        },
        {
          name: 'Twitter Space',
          link: '',
        },
      ],
    },
    {
      name: 'Progress Reporting',
      title: 'What happens with the collected funds',
      paragraphs: [
        {
          text: 'EEA will deploy €100,000 worth of micro-loans to install new solar and storage systems within its 9 countries of operation. To maximize the impact, these loans will be prioritized for recipients in Rwanda, Benin, and Zambia given (1) higher rates of loan repayment and (2) high potential for impact on electricity rates. Current electrification rates are among the lowest: Rwanda (38%), Benin (40%), Zambia (43%). EEA will also prioritize women-led households and aimt at representing these as at least 30% of loan recipients.',
        },
        {
          text: 'Upon the completion of the pilot, EEA will provide a report on how the staked EWT were used and distributed',
        },
      ],
      hyperlinks: [
        {
          name: 'EEA`s financial report',
          link: '',
        },
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
