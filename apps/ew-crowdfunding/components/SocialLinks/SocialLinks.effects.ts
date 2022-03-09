export type SocialLink = {
  name: string;
  icon: string;
  url: string;
};
export const useSocialLinksEffects = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Medium',
      icon: '/MediumLogo.png',
      url: 'https://medium.com/energy-web-insights',
    },
    {
      name: 'Twitter',
      icon: '/TwitterLogo.png',
      url: 'https://twitter.com/energywebx',
    },
    {
      name: 'LinkedIn',
      icon: 'LinkedinLogo.png',
      url: 'https://www.linkedin.com/company/energy-web-foundation',
    },
    {
      name: 'Discord',
      icon: '/DiscordLogo.png',
      url: 'https://discord.com/invite/psraNwqGqp',
    },
    {
      name: 'Telegram',
      icon: '/TelegramLogo.png',
      url: 'https://t.me/energyweb',
    },
  ];

  return socialLinks;
};
