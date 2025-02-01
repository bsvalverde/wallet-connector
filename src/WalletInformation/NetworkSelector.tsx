import { Network } from "@/types/networks";

interface Props {
  value: string | number;
  networkOptions: Network[];
  disabled: boolean;
  onNetworkSelect: (chainId: string | number) => void;
}

export function WalletSelector({
  value,
  networkOptions,
  disabled,
  onNetworkSelect,
}: Props) {
  return (
    <select
      value={value}
      onChange={(event) => onNetworkSelect(event.target.value)}
      disabled={disabled}
    >
      {networkOptions.map(({ chainId, vanityName, name }) => (
        <option key={chainId} value={chainId}>
          {vanityName || name}
        </option>
      ))}
    </select>
  );
}
