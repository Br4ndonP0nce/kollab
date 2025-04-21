"use client";

import * as React from "react";
import { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

// Define types for the component props
interface Item {
  id: string;
  [key: string]: any;
}

interface InfiniteCarouselProps<T extends Item> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  speed?: number;
  gap?: number;
  itemWidth?: number;
}

/**
 * Simple Infinite Carousel Component
 *
 * @template T - The type of items to display in the carousel
 * @param {InfiniteCarouselProps<T>} props - Component props
 * @returns {JSX.Element} - The rendered carousel
 */
const InfiniteCarousel = <T extends Item>({
  items,
  renderItem,
  className = "",
  speed = 0, // Speed of auto-scroll (0 = disabled)
  gap = 16, // Gap between items
  itemWidth = 280, // Width of each item
}: InfiniteCarouselProps<T>): React.JSX.Element => {
  const [width, setWidth] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Calculate total width on mount and resize
  useEffect(() => {
    if (!innerRef.current) return;

    const calculateWidth = (): void => {
      if (innerRef.current) {
        const innerWidth = innerRef.current.scrollWidth;
        setWidth(innerWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [items]);

  // Set up mouse drag interaction
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);
  const [animationPaused, setAnimationPaused] = useState<boolean>(false);

  // Create a duplicate set of items for seamless looping
  const doubledItems: T[] = [...items, ...items];

  // Animation variants
  const sliderVariants = {
    animate: {
      x: speed ? [-width / 2, 0] : dragX,
      transition: {
        x: {
          duration: speed ? 25 : 0, // 25 seconds for full loop
          repeat: speed ? Infinity : 0,
          repeatType: "loop",
          ease: "linear",
        },
      },
    },
    dragging: {
      x: dragX,
      transition: {
        x: {
          duration: 0,
        },
      },
    },
  };

  const handleDragStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setAnimationPaused(true);

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;

    setDragStartX(clientX);
  };

  const handleDragMove = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    if (!isDragging || !carouselRef.current) return;

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;

    const deltaX = clientX - dragStartX;

    // Calculate new position ensuring it wraps around properly
    const newX = dragX + deltaX;

    setDragX(newX);
    setDragStartX(clientX);
  };

  const handleDragEnd = (): void => {
    setIsDragging(false);

    // Reset animation after a brief pause
    setTimeout(() => {
      setAnimationPaused(false);
    }, 500);
  };

  // Smooth scrolling effect
  const totalWidth = itemWidth * items.length;

  return (
    <div
      ref={carouselRef}
      className={`overflow-hidden cursor-grab ${className}`}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <motion.div
        ref={innerRef}
        className="flex"
        style={{ gap: `${gap}px` }}
        variants={sliderVariants}
        animate={isDragging ? "dragging" : "animate"}
        drag={isDragging ? "x" : false}
        dragConstraints={{ left: -width, right: 0 }}
      >
        {doubledItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0"
            style={{ width: `${itemWidth}px` }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
