import { Wallet } from "@dynamic-labs/sdk-react-core";
import { WalletInformationLayout } from "./WalletInformationLayout";

interface Props {
  wallet: Wallet;
}

export function WalletInformation({ wallet }: Props) {
  return (
    <>
      <WalletInformationLayout wallet={wallet} />
    </>
  );
}
