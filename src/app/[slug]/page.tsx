import prisma from "@/lib/db";
import { redirect } from "next/navigation";

type RedirectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const url = await prisma.url.findUnique({
    where: {
      slug: decodedSlug,
    },
    select: {
      originalUrl: true,
    },
  });

  if (!url) return redirect("/");

  redirect(url.originalUrl);
}
