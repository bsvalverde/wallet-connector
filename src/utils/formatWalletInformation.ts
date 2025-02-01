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
  const [integer, decimals = ""] = balance.split(".");
  const formattedBalance = `${integer}.${decimals.slice(0, 3).padEnd(3, "0")}`;

  if (!network) {
    return formattedBalance;
  }

  return `${formattedBalance} ${network.nativeCurrency.symbol}`;
};
