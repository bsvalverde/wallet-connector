import { Network } from "@/types/networks";

interface Props {
  value: string | number;
  networkOptions: Network[];
  onNetworkSelect: (chainId: string | number) => void;
}

export function WalletSelector({
  value,
  networkOptions,
  onNetworkSelect,
}: Props) {
  return (
    <select
      value={value}
      onChange={(event) => onNetworkSelect(event.target.value)}
    >
      {networkOptions.map(({ chainId, vanityName, name }) => (
        <option key={chainId} value={chainId}>
          {vanityName || name}
        </option>
      ))}
    </select>
  );
}
