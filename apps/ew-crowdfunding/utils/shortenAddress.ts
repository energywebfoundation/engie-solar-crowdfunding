export const shortenAddress = (address: string) => {
  if (!address) {
    return;
  }
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
