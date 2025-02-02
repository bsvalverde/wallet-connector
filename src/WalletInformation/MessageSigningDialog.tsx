import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { LoadingButton } from "@/components/UI/LoadingButton";
import { Textarea } from "@/components/UI/Textarea";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";

interface Props {
  wallet: Wallet;
}

export function MessageSigningDialog({ wallet }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [isOpen]);

  const handleMessageSign = async () => {
    setIsSigning(true);
    try {
      await wallet.signMessage(message);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isSigning ? () => {} : setIsOpen}>
      <DialogTrigger asChild>
        <Button>Sign Message</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Dialog that allows user to type a message to be signed by the currently displayed wallet">
        <DialogHeader>
          <DialogTitle>Sign a message</DialogTitle>
        </DialogHeader>
        <Textarea
          value={message}
          placeholder="Type your message here"
          onChange={(event) => setMessage(event.target.value)}
          disabled={isSigning}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-foreground hover:bg-secondary-foreground/20"
              disabled={isSigning}
            >
              Close
            </Button>
          </DialogClose>
          <LoadingButton
            type="submit"
            variant="secondary"
            loading={isSigning}
            onClick={handleMessageSign}
          >
            Sign
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
