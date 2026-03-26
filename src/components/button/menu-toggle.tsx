"use client";

import { motion } from "framer-motion";

interface PathProps {
  initial?: "open" | "closed";
  d?: string;
  variants?: {
    closed: { d?: string; stroke?: string; opacity?: number };
    open: { d?: string; stroke?: string; opacity?: number };
  };
  animate?: "open" | "closed";
  transition?: { duration: number };
  fill?: string;
  strokeWidth?: number;
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export function MenuToggle({ toggle, isOpen }: MenuToggleProps) {
  return (
    <button onClick={toggle} className="md:hidden" aria-label="Toggle menu">
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          initial="closed"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5", stroke: "white" },
            open: { d: "M 3 16.5 L 17 2.5", stroke: "white" },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Path
          initial="closed"
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Path
          initial="closed"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: "white" },
            open: { d: "M 3 2.5 L 17 16.346", stroke: "white" },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </button>
  );
}
