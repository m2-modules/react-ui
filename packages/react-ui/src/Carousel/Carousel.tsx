import { Fragment, useCallback, useEffect, useRef, useState } from "react";

export type Direction = "horizontal" | "vertical";
export type TravelingMode = "one-way" | "round-trip";

export interface CarouselProps {
  items: React.ReactNode[];
  autoScrollInterval?: number;
  infiniteRolling?: boolean;
  enableScroll?: boolean;
  enableIndexIndicator?: boolean;
  indexIndicator?: (isActive: boolean) => React.ReactElement;
  direction?: Direction;
  travelingMode?: TravelingMode;
  handleItemChange?: (activeIndex: number) => void;
  height: number;
  width: number;
  listClassNames?: string;
  listItemClassNames?: string;
}

const DEFAULT_INTERVAL = 3 * 1000;

export default function Carousel({
  items,
  autoScrollInterval = DEFAULT_INTERVAL,
  infiniteRolling = false,
  enableScroll = false,
  enableIndexIndicator = false,
  indexIndicator,
  direction = "horizontal",
  travelingMode = "one-way",
  handleItemChange,
  height,
  width,
  listClassNames,
  listItemClassNames,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const isReverseRef = useRef(false);
  const virtualItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!itemsRef.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        if (!activeEntry) return;

        setActiveIndex(() =>
          Number(activeEntry.target.getAttribute("data-index")),
        );
      },
      { threshold: 0.1 },
    );

    itemsRef.current.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!virtualItemRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        if (!activeEntry) return;

        itemsRef.current[0]?.scrollIntoView();
      },
      { threshold: 1 },
    );
    observer.observe(virtualItemRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    handleItemChange?.(activeIndex);
  }, [activeIndex, handleItemChange, items]);

  const getNextItemElement = useCallback((): HTMLLIElement | null => {
    if (isReverseRef.current) {
      const prevItem = itemsRef.current[activeIndex - 1];
      if (prevItem) return prevItem;
      if (travelingMode === "one-way") return null;
      isReverseRef.current = false;
      return getNextItemElement();
    } else {
      const nextItem = itemsRef.current[activeIndex + 1];
      if (nextItem) return nextItem;
      if (infiniteRolling) return virtualItemRef.current;
      if (travelingMode === "one-way") return null;
      isReverseRef.current = true;
      return getNextItemElement();
    }
  }, [activeIndex, infiniteRolling, travelingMode]);

  useEffect(() => {
    if (autoScrollInterval <= 0) return;

    const interval = setInterval(() => {
      const nextItemElement = getNextItemElement();
      if (!nextItemElement) return;

      nextItemElement.scrollIntoView({
        behavior: "smooth",
      });
    }, autoScrollInterval);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, autoScrollInterval, getNextItemElement, travelingMode]);

  return (
    <section className="relative">
      <ul
        className={`snap-mandatory grid ${
          enableScroll ? "overflow-auto" : "overflow-hidden"
        } ${
          direction === "horizontal"
            ? "snap-x grid-flow-col"
            : "snap-y grid-flow-row"
        } ${listClassNames}`}
        style={{ height, width }}
      >
        {items.map((item, index) => (
          <li
            key={`carousel-item-${index}`}
            className={`snap-always snap-center ${listItemClassNames}`}
            data-index={index}
            style={{ height, width }}
            ref={(el) => {
              if (!el) return;
              itemsRef.current[index] = el;
            }}
          >
            {item}
          </li>
        ))}
        {infiniteRolling && (
          <li
            ref={virtualItemRef}
            style={{ height, width }}
            className="snap-always snap-center"
          >
            {items[0]}
          </li>
        )}
      </ul>

      {enableIndexIndicator && (
        <div className="absolute grid gap-2 grid-flow-col bottom-3 left-1/2 -translate-x-1/2">
          {Array.from({ length: items.length }).map((_, index) => {
            return (
              <Fragment key={`index-indicator-${index}`}>
                {indexIndicator ? (
                  indexIndicator(index === activeIndex)
                ) : (
                  <div
                    className={`rounded w-2 h-2 bg-white shadow-sm outline outline-3 ${
                      activeIndex === index
                        ? "outline-black"
                        : "outline-transparent"
                    }`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </section>
  );
}
