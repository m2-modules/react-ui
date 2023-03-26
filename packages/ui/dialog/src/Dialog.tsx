import { createPortal } from "react-dom";
import Overlay from "@m2-modules/overlay";

const getDialogPortal = () => {
  let dialogPortal = document.querySelector<HTMLDivElement>("#dialog-portal");
  if (dialogPortal) return dialogPortal;
  dialogPortal = document.createElement("div");
  dialogPortal.id = "dialog-portal";
  document.body.append(dialogPortal);
  return dialogPortal;
};

export interface DialogProps {
  active?: boolean;
  enableOverlay?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({
  active = false,
  enableOverlay = true,
  onClose,
  children,
}: DialogProps) {
  return createPortal(
    <>
      {enableOverlay && (
        <Overlay
          active={active}
          onClose={() => {
            onClose();
          }}
        />
      )}
      <section className="fixed left-0 top-0 right-0 bottom-0 grid place-items-center z-[3]">
        {children}
      </section>
    </>,
    getDialogPortal(),
  );
}
