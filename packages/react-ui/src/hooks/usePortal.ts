import { useLayoutEffect, useState } from "react";
export default function usePortal(id: string) {
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let portal = document.querySelector<HTMLDivElement>(`#${id}`);
    if (!portal) {
      portal = document.createElement("div");
      document.body.append(portal);
      portal.id = id;
    }

    setPortal(portal);

    return () => {
      portal?.remove();
    };
  }, [id]);

  return portal;
}
