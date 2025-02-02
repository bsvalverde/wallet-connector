import { Network } from "@/types/networks";

export const formatWalletAddress = (address: string) => {
  const initialPart = address.slice(0, 4);
  const finalPart = address.slice(address.length - 4);

  return `${initialPart}...${finalPart}`;
};

export const formatWalletBalance = ({
  balance,
  network,
}: {
  balance: string;
  network?: Network;
}) => {
  const [integer] = balance.split(".");
  const formattedBalance = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: integer.length === 1 ? 3 : 2,
    minimumIntegerDigits: 1,
    notation: "compact",
  }).format(parseFloat(balance));

  if (!network) {
    return formattedBalance;
  }

  return `${formattedBalance} ${network.nativeCurrency.symbol}`;
};
