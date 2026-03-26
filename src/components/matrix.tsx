/* eslint-disable  @typescript-eslint/no-explicit-any */

'use client';

import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import clsx from "clsx";

const renderMatrix = (ref: React.RefObject<HTMLCanvasElement>, color: string | undefined) => {
  const canvas = ref.current;

  if (!canvas) return;
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // const katakana =
  //   "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
  // const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // const nums = "0123456789";
  // const alphabet = katakana + latin + nums;

  // const alphabet = "GANESHganesh";
  const alphabet = '01'

  let fontSize: number;
  if (canvas.width < 1080) fontSize = 10;
  else fontSize = 16;

  const columns = canvas.width / fontSize;

  const rainDrops: string | any[] = [];

  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }

  const render = () => {
    context.fillStyle = "rgba(0, 0, 0, 0.05)"; // black w a tiny bit of alpha
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = color ? color : "#0F0";
    context.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      // randomize the string of characters to render
      const text = alphabet.charAt(
        Math.floor(Math.random() * alphabet.length)
      );
      context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (
        rainDrops[i] * fontSize > canvas.height &&
        Math.random() > 0.975
      ) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  };
  return render;
};

interface MatrixRainingLettersProps {
  color?: string;
  custom_class?: string;
  key: string;
}

const MatrixRainingLetters = ({ color, custom_class, key }: MatrixRainingLettersProps) => {
  const ref = useRef<HTMLCanvasElement>(null!);
  const keyName = "mrl-" + key;
  useEffect(() => {
    const render = renderMatrix(ref, color);
    if (!render) return

    const intervalId = setInterval(render, 100);
    return () => clearInterval(intervalId);
  }, [color]);

  return (
    <React.Fragment>
      <canvas key={keyName} className={clsx("fixed h-screen bg-opacity-50 -z-20", custom_class)} ref={ref} />
    </React.Fragment>
  );
};

export default MatrixRainingLetters;