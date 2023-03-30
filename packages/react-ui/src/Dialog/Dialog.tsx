import { createPortal } from "react-dom";
import Overlay, { type OverlayProps } from "../Overlay";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import usePortal from "../hooks/usePortal";

export type Position = { left: number; top: number };
export interface DialogProps {
  active?: boolean;
  enableOverlay?: boolean;
  activateTransitionClasses?: string[];
  inactivateTransitionClasses?: string[];
  transitionDuration?: string;
  overlayProps?: Omit<OverlayProps, "active" | "onClose">;
  portalIdentifier?: string;
  children: React.ReactNode;
  position?: Position;
  handleClick?: () => void;
}

export default function Dialog({
  active = false,
  enableOverlay = true,
  activateTransitionClasses = ["opacity-1"],
  inactivateTransitionClasses = ["opacity-0"],
  transitionDuration = "duration-500",
  overlayProps,
  portalIdentifier = "dialog-portal",
  position,
  children,
  handleClick,
}: DialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogPortal = usePortal(portalIdentifier);
  const [_active, _setActive] = useState(active);

  const activateDialog = useCallback(() => {
    if (!containerRef.current) return;
    const dialogContainer = containerRef.current;
    _setActive(true);

    setTimeout(() => {
      dialogContainer.classList.remove(...inactivateTransitionClasses);
      dialogContainer.classList.add(...activateTransitionClasses);
    }, 100);
  }, [activateTransitionClasses, inactivateTransitionClasses]);

  const inactivateDialog = useCallback(() => {
    if (!containerRef.current) return;
    const dialogContainer = containerRef.current;

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

  const adjustPosition = useCallback(() => {
    if (!active || !containerRef.current || !position) return position;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const contentPositionLeft = position.left;
    const contentPositionTop = position.top;
    const contentPositionRight = contentPositionLeft + containerWidth;
    const contentPositionBottom = contentPositionTop + containerHeight;
    const documentBodyRect = document.body.getBoundingClientRect();
    const rightBoundary = documentBodyRect.right;
    const bottomBoundary = documentBodyRect.bottom;

    const adjustedPosition: Position = position;
    if (contentPositionLeft < 0) adjustedPosition.left = 0;
    if (contentPositionTop < 0) adjustedPosition.top = 0;
    if (contentPositionRight > rightBoundary)
      adjustedPosition.left = rightBoundary - containerWidth;
    if (contentPositionBottom > bottomBoundary)
      adjustedPosition.top = bottomBoundary - containerHeight;

    return adjustedPosition;
  }, [active, position]);

  const computeWrapperPosition = useCallback((): CSSProperties => {
    const adjustedPosition = adjustPosition();
    if (!containerRef.current || !adjustedPosition) {
      return {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    return {
      position: "fixed",
      left: adjustedPosition.left,
      top: adjustedPosition.top,
    };
  }, [adjustPosition]);

  if ((!active && !_active) || !dialogPortal) return <></>;

  return createPortal(
    <>
      {enableOverlay && (
        <Overlay active={active} handleClick={handleClick} {...overlayProps} />
      )}
      <div className="fixed z-[3]" style={computeWrapperPosition()}>
        <div
          ref={containerRef}
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
