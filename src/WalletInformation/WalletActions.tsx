import { LogoutIcon } from "@/components/Icons";
import { Button } from "@/components/UI/Button";
import { useDynamicContext, Wallet } from "@dynamic-labs/sdk-react-core";

interface Props {
  wallet: Wallet;
}

export default function WalletActions({ wallet }: Props) {
  const { handleUnlinkWallet } = useDynamicContext();

  // console.log("awaiting signature stae", awaitingSignatureState);
  // console.log("isAuthenticated", wallet.isAuthenticated);

  // const handleMessageSign = async () => {
  //   const response = await wallet.signMessage("Authentication message");
  //   console.log("reponse", response);
  //   console.log("isAuthenticated", wallet.isAuthenticated);
  // };

  return (
    <div className="flex flex-col gap-2">
      <Button>Sign Message</Button>
      {/* <button onClick={handleMessageSign}>sign message</button> */}
      <Button
        variant="secondary"
        className="hover:bg-secondary-foreground/10"
        onClick={() => handleUnlinkWallet(wallet.id)}
      >
        <LogoutIcon />
        Disconnect
      </Button>
    </div>
  );
}
