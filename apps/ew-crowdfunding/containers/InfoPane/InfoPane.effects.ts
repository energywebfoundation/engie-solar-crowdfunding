import { useState } from 'react';
import { formatDate, formatUTCDate } from '../../utils';

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
  const activateStakingDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_ACTIVATE_STAKING_DATE));
  const closeStackingDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_CLOSE_STAKING_DATE));
  const lockStakesDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_LOCK_STAKES_DATE));
  const releaseRewardsDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_RELEASE_REWARDS_DATE));
  const finalStopDate = formatDate(formatUTCDate(process.env.NEXT_PUBLIC_FULL_STOP_DATE));

  const infoList: Info[] = [
    {
      name: 'How It Works',
      title: 'How Crowdfund for Solar works',
      paragraphs: [
        {
          text: 'By joining Crowdfund for Solar with your EWT, you are increasing renewable energy access in the developing world. ENGIE Energy Access will use your EWT to fund the manufacturing of solar home systems (SHS) for people in need of reliable energy access in countries like Rwanda, Uganda, and Zambia.',
        },
        {
          text: `The recipients (e.g. schools, households, and small businesses) will be able to lease-to-own these SHS, paying in affordable installments via mobile money. At the end of the repayment period, they own the system. These repayments will then be used to cover the staked EWT plus 10% in rewards to everyone who participated in this pilot on ${releaseRewardsDate} date. In this pilot, the Community Fund will cover all the risks in case of default or if the recipients need more time for repayment. So your stakes and rewards are guaranteed.`,
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
          text: `You can already enroll in the campaign by connecting your wallet, verifying your email address for that specific address, and adding an onchain “Patron” role to your wallet. Anyone can enroll until the end of the campaign.`,
        },
        {
          text: `From ${activateStakingDate} date, stake your EWT and receive Solar Loan Tokens (SLT) as proof of participation. `,
          list: [
            `To see your SLT in your wallet, click “Import tokens” in your MetaMask and paste the address of the smart contract your wallet interacted with. This address can be found on https://explorer.energyweb.org/  - simply look for the latest transaction associated with your wallet.`,
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
            'You should be enrolled to withdraw your principal and rewards (see Step 1).',
            'Deposit your SLT to the connected wallet and click “Redeem”. This will burn your SLT and release your EWT.',
            'The rewards are 10% of the redeemed SLT.',
          ],
        },
        {
          text: `You should withdraw your rewards anytime after ${releaseRewardsDate} and before ${finalStopDate}`
        },
        {
          text: 'Please stay informed about the campaign throughout the entire duration on our social media channels since we will not contact participants via email for privacy preservation.'
        }
      ],
    },
    {
      name: 'Announcements',
      title: 'Stay updated on Crowdfund for Solar',
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
          link: 'https://twitter.com/energywebx/status/1499075924842762247?t=7rf1zfwNAGXqIu79JlBepg&s=19',
        },
      ],
    },
    {
      name: 'Progress Reporting',
      title: 'What happens with the collected funds',
      paragraphs: [
        {
          text: 'ENGIE Energy Access will deploy €100,000 worth of micro-loans to install solar home systems to those in need in Africa. To maximize the impact, these loans will be provided to recipients in countries like Rwanda, Uganda and Zambia given (1) higher rates of loan repayment there and (2) high potential for impact on electricity rates. ENGIE Energy Access is prioritizing women among the recipients and will aim to provide at least 30% of the loans to women-led households.',
        },
        {
          text: 'Upon the completion of the pilot, ENGIE Energy Access will provide a report on how the staked EWT were used and distributed.',
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
