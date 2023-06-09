import { useEffect, useRef } from "react";
import { Dialog, type DialogProps, type Position } from "../Dialog";

export interface ContextMenuProps {
  active?: boolean;
  position: Position;
  activateTransitionClasses?: string[];
  inactivateTransitionClasses?: string[];
  transitionDuration?: string;
  enableOverlay?: boolean;
  dialogProps?: Omit<DialogProps, "active" | "enableOverlay" | "position">;
  overlayProps?: DialogProps["overlayProps"];
  portalIdentifier?: string;
  children: React.ReactNode;
}

export function ContextMenu({
  active = false,
  position,
  activateTransitionClasses = ["scale-1", "origin-top-left"],
  inactivateTransitionClasses = ["scale-0", "origin-top-left"],
  transitionDuration = "duration-150",
  enableOverlay = false,
  dialogProps,
  overlayProps,
  portalIdentifier = "context-menu-portal",
  children,
}: ContextMenuProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const sectionElement = sectionRef.current;
    if (active) {
      setTimeout(() => {
        sectionElement.classList.remove(...inactivateTransitionClasses);
        sectionElement.classList.add(...activateTransitionClasses);
      });
    } else {
      sectionElement.classList.remove(...activateTransitionClasses);
      sectionElement.classList.add(...inactivateTransitionClasses);
    }
  }, [activateTransitionClasses, active, inactivateTransitionClasses]);

  return (
    <Dialog
      active={active}
      enableOverlay={enableOverlay}
      overlayProps={overlayProps}
      portalIdentifier={portalIdentifier}
      position={position}
      activateTransitionClasses={[]}
      inactivateTransitionClasses={[]}
      {...dialogProps}
    >
      <section
        className={`transition-all ${transitionDuration} ${inactivateTransitionClasses.join(
          " ",
        )}`}
        ref={sectionRef}
      >
        {children}
      </section>
    </Dialog>
  );
}
