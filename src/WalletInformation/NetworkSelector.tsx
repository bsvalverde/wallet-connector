import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { EvmNetwork } from "@dynamic-labs/sdk-react-core";

interface Props {
  value: string | number;
  networkOptions: EvmNetwork[];
  disabled: boolean;
  onNetworkSelect: (chainId: string | number) => void;
}

export function NetworkSelector({
  value,
  networkOptions,
  disabled,
  onNetworkSelect,
}: Props) {
  return (
    <Select
      value={`${value}`}
      onValueChange={(value) => onNetworkSelect(value)}
      disabled={disabled}
    >
      <SelectTrigger className="md:w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {networkOptions.map(({ chainId, iconUrls, vanityName, name }) => (
          <SelectItem key={chainId} value={`${chainId}`}>
            <div className="flex flex-row items-center gap-1">
              {iconUrls[0] && (
                <img
                  className="size-5"
                  src={iconUrls[0]}
                  alt={`${vanityName || name}'s icon`}
                />
              )}
              <span className="px-1">{vanityName || name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
