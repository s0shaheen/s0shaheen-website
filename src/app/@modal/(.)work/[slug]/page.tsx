import { notFound } from "next/navigation";
import { ItemModal } from "@/components/item-modal";
import { ItemDetail } from "@/components/items";
import { getItem, getPopupItems } from "@/lib/content";

/** Soft navigation to /work/<slug> intercepts here and renders as a popup. */

export function generateStaticParams() {
  return getPopupItems().map((i) => ({ slug: i.slug }));
}

export default async function WorkModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item?.popup) notFound();

  return (
    <ItemModal>
      <ItemDetail item={item} />
    </ItemModal>
  );
}
