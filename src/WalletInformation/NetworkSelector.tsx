import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { Network } from "@/types/networks";

interface Props {
  value: string | number;
  networkOptions: Network[];
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
      <SelectTrigger className="w-[140px]">
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
