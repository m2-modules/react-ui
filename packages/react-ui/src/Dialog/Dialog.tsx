import { createPortal } from "react-dom";
import Overlay from "../Overlay";
import { useCallback, useEffect, useRef, useState } from "react";

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
  activateTransitionClasses?: string[];
  inactivateTransitionClasses?: string[];
  transitionDuration?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({
  active = false,
  enableOverlay = true,
  activateTransitionClasses = ["opacity-1"],
  inactivateTransitionClasses = ["opacity-0"],
  transitionDuration = "duration-500",
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
      dialogContainer.classList.remove(...inactivateTransitionClasses);
      dialogContainer.classList.add(...activateTransitionClasses);
    }, 100);
  }, [activateTransitionClasses, inactivateTransitionClasses]);

  const inactivateDialog = useCallback(() => {
    if (!dialogContainerRef.current) return;
    const dialogContainer = dialogContainerRef.current;

    dialogContainer.classList.remove(...activateTransitionClasses);
    dialogContainer.classList.add(...inactivateTransitionClasses);
  }, [activateTransitionClasses, inactivateTransitionClasses]);

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
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]">
        <div
          ref={dialogContainerRef}
          className={`transition-all ${transitionDuration} ${inactivateTransitionClasses.join(
            " ",
          )}`}
          onTransitionEnd={() => {
            if (!active && _active) _setActive(false);
          }}
        >
          {children}
        </div>
      </div>
    </>,
    getDialogPortal(),
  );
}
