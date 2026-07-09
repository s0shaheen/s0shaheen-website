import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemDetail } from "@/components/items";
import { getItem, getPopupItems } from "@/lib/content";

/**
 * The standalone page behind every popup — reached on hard navigation
 * (shared link, refresh). Soft navigation intercepts into the @modal slot.
 */

export function generateStaticParams() {
  return getPopupItems().map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  return { title: item?.title };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item?.popup) notFound();

  return (
    <div className="pt-16 sm:pt-24">
      <Link href="/" className="link-grow text-sm font-medium text-muted">
        ← Salman Shaheen
      </Link>
      <div className="mt-8 max-w-[52ch]">
        <ItemDetail item={item} />
      </div>
    </div>
  );
}
