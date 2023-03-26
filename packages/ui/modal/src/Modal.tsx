import { CSSProperties, useEffect, useRef } from "react";

export interface ModalProps {
  active?: boolean;
  background?: CSSProperties["background"];
  escapeByClick?: boolean;
  onEscape?: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  active = false,
  background = "rgba(0,0,0,0.3)",
  escapeByClick = true,
  onEscape,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    if (active) {
      modalRef.current.classList.replace("opacity-0", "opacity-100");
    }
  }, [active]);

  return (
    <section
      ref={modalRef}
      className="fixed left-0 right-0 top-0 bottom-0 transform transition-opacity duration-500 opacity-0"
      style={{ background }}
      onClick={() => {
        if (!modalRef.current) return;
        if (escapeByClick) {
          modalRef.current.classList.replace("opacity-100", "opacity-0");
        }
      }}
      onTransitionEnd={() => {
        if (!modalRef.current) return;

        if (modalRef.current.classList.contains("opacity-0")) {
          onEscape?.();
        }
      }}
    >
      {children}
    </section>
  );
}
