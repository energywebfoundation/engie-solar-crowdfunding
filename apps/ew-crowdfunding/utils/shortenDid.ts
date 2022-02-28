export const shortenDid = (did: string) => {
  if (!did) {
    return;
  }
  return `${did.slice(0, 19)}...${did.slice(did.length - 4)}`;
};
