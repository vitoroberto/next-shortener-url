import Link from "next/link";
import ClipboardButton from "./clipboard-button";

type ShortenedUrlProps = {
  slug: string;
  originalUrl: string;
  currentUrl: string;
};
export default function ShortenedUrl({
  slug,
  originalUrl,
  currentUrl,
}: ShortenedUrlProps) {
  const shortenedUrl = `${currentUrl}${slug}`;

  return (
    <div className="flex items-center justify-between rounded-md border-2 p-2">
      <Link
        href={originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="overflow-x-auto text-blue-500"
      >
        {shortenedUrl}
      </Link>
      <ClipboardButton url={shortenedUrl} />
    </div>
  );
}
