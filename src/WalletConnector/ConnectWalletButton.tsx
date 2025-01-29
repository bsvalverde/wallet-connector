import { Button } from "@/components/UI/Button";

interface Props {
  onClick: VoidFunction;
}

export default function ConnectWalletButton({ onClick }: Props) {
  return <Button onClick={onClick}>Connect Wallet</Button>;
}
