export type SocialLink = {
  name: string;
  icon: string;
  url: string;
};
export const useFooterEffects = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Discord',
      icon: '/DiscordLogo.png',
      url: '#',
    },
    {
      name: 'Medium',
      icon: '/MediumLogo.png',
      url: '#',
    },
    {
      name: 'Telegram',
      icon: '/TelegramLogo.png',
      url: '#',
    },
    {
      name: 'Twitter',
      icon: '/TwitterLogo.png',
      url: '#',
    },
  ];

  return socialLinks;
};
