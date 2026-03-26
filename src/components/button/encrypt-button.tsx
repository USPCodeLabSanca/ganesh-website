"use client";

import { useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import Link from "next/link";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

interface EncryptButtonProps {
  onClick?: () => void;
  targetText: string;
}

export default function EncryptButton({ targetText }: EncryptButtonProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [text, setText] = useState(targetText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= targetText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(targetText);
  };

  return (
    <Link
      href={`/about`}>
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="cursor-pointer group relative overflow-hidden rounded border-[2px] border-neutral-500 bg-transparent px-4 py-2 font-mono text-neutral-100 transition-colors hover:text-terminal hover:border-terminal"
      >
        <div className="relative z-10 flex items-center gap-2">
          <MagnifyingGlassIcon className="w-5" />
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-green-400/0 from-40% via-green-400/100 to-green-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </motion.button>
    </Link>
  );
};