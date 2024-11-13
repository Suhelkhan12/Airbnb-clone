"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { Link2Icon } from "lucide-react";
import { toast } from "sonner";

const ShareButton = ({
  propertyId,
  name,
}: {
  propertyId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareUrl = `${url}/properties/${propertyId}`;

  const handleClipboardCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Copied to clipboard.");
    } catch (err) {
      console.log(err);
      throw new Error("Clipboard funtion not working.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={"top"}
        align={"end"}
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <WhatsappShareButton url={shareUrl} title={name}>
          <WhatsappIcon size={26} round />
        </WhatsappShareButton>
        <Button size={"icon"} variant={"link"} onClick={handleClipboardCopy}>
          <Link2Icon />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
