export const useLendingStatsEffects = () => {
  const lendedAmount = 200;
  const globalTokenLimit = Number(process.env.NEXT_PUBLIC_GLOBAL_TOKEN_LIMIT);
  return {
    lendedAmount,
    globalTokenLimit,
  };
};
