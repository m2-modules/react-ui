import { createPortal } from "react-dom";
import Overlay from "@m2-modules/overlay";
import { useCallback, useEffect, useRef, useState } from "react";

const ACTIVATE_CLASS_NAME = "opacity-1";
const INACTIVATE_CLASS_NAME = "opacity-0";

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
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const [_active, _setActive] = useState(active);

  const activateDialog = useCallback(() => {
    if (!dialogContainerRef.current) return;
    const dialogContainer = dialogContainerRef.current;
    _setActive(true);

    setTimeout(() => {
      dialogContainer.classList.remove(INACTIVATE_CLASS_NAME);
      dialogContainer.classList.add(ACTIVATE_CLASS_NAME);
    }, 100);
  }, []);

  const inactivateDialog = useCallback(() => {
    if (!dialogContainerRef.current) return;
    const dialogContainer = dialogContainerRef.current;

    dialogContainer.classList.remove(ACTIVATE_CLASS_NAME);
    dialogContainer.classList.add(INACTIVATE_CLASS_NAME);
  }, []);

  useEffect(() => {
    if (active) {
      activateDialog();
    } else {
      inactivateDialog();
    }
  }, [activateDialog, active, inactivateDialog]);

  if (!active && !_active) return <></>;

  return createPortal(
    <>
      {enableOverlay && <Overlay active={active} onClose={onClose} />}
      <div
        ref={dialogContainerRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-0 z-[3]"
        onTransitionEnd={() => {
          if (!active && _active) _setActive(false);
        }}
      >
        {children}
      </div>
    </>,
    getDialogPortal(),
  );
}
