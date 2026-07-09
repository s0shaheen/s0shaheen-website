"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "vaul";

const QUERY = "(min-width: 640px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Popup presentation (SPEC v1.0 §D6): every popup is URL-addressable via the
 * @modal intercepting route; this shell renders it as a centered dialog on
 * desktop and a vaul bottom sheet on mobile. Dismissal navigates back so the
 * URL and history stay correct.
 */
export function ItemModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isDesktop = useSyncExternalStore<boolean | null>(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => null,
  );

  const close = (open: boolean) => {
    if (!open) router.back();
  };

  // Avoid a flash of the wrong presentation before hydration measures the viewport.
  if (isDesktop === null) return null;

  if (isDesktop) {
    return (
      <Dialog.Root defaultOpen onOpenChange={close}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(10,10,9,0.45)] backdrop-blur-[3px]" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[calc(100vw-40px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-[rgba(20,20,18,0.2)] bg-white p-6 focus:outline-none motion-safe:animate-[modal-pop_190ms_cubic-bezier(0.4,0,0.2,1)]"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">Details</Dialog.Title>
            {children}
            <Dialog.Close
              aria-label="Close"
              className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-hair text-sm leading-none transition-colors duration-[180ms] hover:border-ink"
            >
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Drawer.Root defaultOpen onOpenChange={close}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[rgba(10,10,9,0.45)]" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] rounded-t-2xl border-t border-[rgba(20,20,18,0.2)] bg-white focus:outline-none">
          <Drawer.Title className="sr-only">Details</Drawer.Title>
          <div
            aria-hidden
            className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-[rgba(20,20,18,0.18)]"
          />
          <div className="overflow-y-auto p-6 pt-4">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
