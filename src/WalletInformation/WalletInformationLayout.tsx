import { Wallet } from "@dynamic-labs/sdk-react-core";
import { NetworkSelector } from "./NetworkSelector";
import { WalletActions } from "./WalletActions";
import { WalletNativeBalance } from "./WalletNativeBalance";
import { WalletSelector } from "./WalletSelector";

interface Props {
  wallet: Wallet;
}

export function WalletInformationLayout({ wallet }: Props) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="rounded-default bg-card md:self-start">
        <NetworkSelector wallet={wallet} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center rounded-default bg-card">
          <WalletNativeBalance wallet={wallet} />
          <span className="text-muted-foreground">|</span>
          <WalletSelector />
        </div>
        <div className="rounded-default bg-card p-4">
          <WalletActions wallet={wallet} />
        </div>
      </div>
    </div>
  );
}
