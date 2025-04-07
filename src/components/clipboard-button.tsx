"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

export default function ClipboardButton({ url }: { url: string }) {
  const [urlCopied, setUrlCopied] = useState(false);

  async function copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setUrlCopied(true);
    } catch (error) {
      console.log(error);
    }
  }

  function onMouseLeave() {
    setTimeout(() => {
      setUrlCopied(false);
    }, 1000);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => copyToClipboard(url)}
      onMouseLeave={onMouseLeave}
    >
      {urlCopied ? <CheckIcon /> : <CopyIcon />}

      <span className="sr-only">Copie o link encurtado</span>
    </Button>
  );
}
