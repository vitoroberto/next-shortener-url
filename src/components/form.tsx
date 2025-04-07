"use client";

import { createShortUrl } from "@/app/actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState, useEffect, useState } from "react";
import ShortenedUrl from "./shortened-url";
import { OctagonAlert } from "lucide-react";

export type AddressFormData = {
  url: string;
  slug: string;
};

export type ActionResponse = {
  success: boolean;
  defaultValue?: string;
  message?: string;
  slug?: string;
  originalUrl?: string;
  errors?:
    | {
        [x: string]: string[] | undefined;
      }
    | undefined;
};

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function Form() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [state, action, isPending] = useActionState(
    createShortUrl,
    initialState,
  );
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="space-y-6">
      <form action={action}>
        <div className="space-y-2">
          <Input
            className={state.errors?.url ? "border-red-500" : ""}
            name="url"
            id="url"
            type="url"
            placeholder="https://exemplo.com"
            defaultValue={state.defaultValue}
            required
          />
          {state.errors?.url && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <OctagonAlert />
              <p className="text-red-500">{state.errors.url[1]}</p>
            </div>
          )}
          <Input
            className={state.errors?.slug ? "border-red-500" : ""}
            name="slug"
            id="slug"
            type="text"
            placeholder="slug"
            maxLength={40}
            required
          />
          {state.errors?.slug && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <OctagonAlert />
              <p className="text-red-500">{state.errors.slug}</p>
            </div>
          )}
          {state.message && (
            <div className="flex items-center gap-1 pb-4 text-sm text-red-500">
              <OctagonAlert />
              <p>{state.message}</p>
            </div>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Encurtando..." : "Encurtar"}
          </Button>
        </div>
      </form>

      {state.slug && (
        <ShortenedUrl
          slug={state.slug}
          originalUrl={state.originalUrl!}
          currentUrl={currentUrl}
        />
      )}
    </div>
  );
}
