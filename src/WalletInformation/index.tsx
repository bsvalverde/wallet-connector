import { useDynamicContext, Wallet } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { WalletAuthenticationDialog } from "./WalletAuthenticationDialog";
import { WalletInformationLayout } from "./WalletInformationLayout";

interface Props {
  wallet: Wallet;
}

export function WalletInformation({ wallet }: Props) {
  const [isWalletAuthenticated, setIsWalletAuthenticated] = useState(false);

  const { handleLogOut } = useDynamicContext();

  useEffect(() => {
    setIsWalletAuthenticated(false);
  }, [wallet]);

  return (
    <>
      <WalletAuthenticationDialog
        wallet={wallet}
        isOpen={!isWalletAuthenticated}
        onWalletValidation={() => setIsWalletAuthenticated(true)}
        onCancel={handleLogOut}
      />
      <WalletInformationLayout wallet={wallet} />
    </>
  );
}
