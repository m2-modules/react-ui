import { createPortal } from "react-dom";
import Overlay, { type OverlayProps } from "../Overlay";
import { useCallback, useEffect, useRef, useState } from "react";
import usePortal from "../hooks/usePortal";

export interface DialogProps {
  active?: boolean;
  enableOverlay?: boolean;
  activateTransitionClasses?: string[];
  inactivateTransitionClasses?: string[];
  transitionDuration?: string;
  onClose: () => void;
  overlayProps?: Omit<OverlayProps, "active" | "onClose">;
  children: React.ReactNode;
}

export default function Dialog({
  active = false,
  enableOverlay = true,
  activateTransitionClasses = ["opacity-1"],
  inactivateTransitionClasses = ["opacity-0"],
  transitionDuration = "duration-500",
  onClose,
  overlayProps,
  children,
}: DialogProps) {
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const dialogPortal = usePortal("dialog-portal");
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

  if ((!active && !_active) || !dialogPortal) return <></>;

  return createPortal(
    <>
      {enableOverlay && (
        <Overlay active={active} onClose={onClose} {...overlayProps} />
      )}
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
    dialogPortal,
  );
}
