"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const MONTESSORI_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const initialOffset =
    direction === "up"
      ? { y: 22, x: 0 }
      : direction === "left"
        ? { x: -24, y: 0 }
        : direction === "right"
          ? { x: 24, y: 0 }
          : { x: 0, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.6, delay, ease: MONTESSORI_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: MONTESSORI_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TactileCardProps {
  children: ReactNode;
  className?: string;
}

export function TactileCard({ children, className = "" }: TactileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
