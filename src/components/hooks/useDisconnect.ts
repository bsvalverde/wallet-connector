import {
  useDynamicContext,
  useDynamicEvents,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

export function useDisconnect() {
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const { handleUnlinkWallet } = useDynamicContext();
  const userWallets = useUserWallets();

  useDynamicEvents("walletRemoved", () => {
    if (userWallets.length) {
      handleUnlinkWallet(userWallets[0].id);
    } else {
      setIsDisconnecting(false);
    }
  });

  const disconnect = () => {
    setIsDisconnecting(true);
    handleUnlinkWallet(userWallets[0].id);
  };

  return { disconnect, isDisconnecting };
}
