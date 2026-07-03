/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  type?: "fade" | "zoom";
}

export default function AnimateIn({ children, direction = "up", delay = 0, type = "fade" }: AnimateInProps) {
  const getVariants = () => {
    if (type === "zoom") {
      const transition = { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as any };
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition }
      };
    }

    const offsets = { up: 40, left: -40, right: 40, none: 0 };
    const transition = { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as any };
    return {
      hidden: { 
        opacity: 0, 
        y: direction === "up" ? offsets.up : 0,
        x: direction === "left" ? offsets.left : direction === "right" ? offsets.right : 0
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        transition 
      }
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}