import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: number;
};

const COLORS = ['#FFD93D', '#FF6B6B', '#6BCB77', '#4D96FF', '#C779F9'];

const SparklePath = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', display: 'block' }}
  >
    <path
      d="M34 0C34 16.5685 47.4315 30 64 30C47.4315 30 34 43.4315 34 60C34 43.4315 20.5685 30 4 30C20.5685 30 34 16.5685 34 0Z"
      fill={color}
    />
  </svg>
);

type BurstProps = {
  burstId: number;
  originX: number;
  originY: number;
  onComplete: () => void;
};

const Burst = ({ burstId, originX, originY, onComplete }: BurstProps) => {
  const [sparkles] = useState<Sparkle[]>(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 220,
      size: 8 + Math.random() * 14,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      rotate: Math.random() * 360,
    })),
  );

  useEffect(() => {
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        left: originX,
        top: originY,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      aria-hidden
    >
      {sparkles.map((s) => (
        <motion.div
          key={`${burstId}-${s.id}`}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: s.x,
            y: s.y,
            scale: [0, 1, 0],
            rotate: s.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            marginLeft: -s.size / 2,
            marginTop: -s.size / 2,
          }}
        >
          <SparklePath color={s.color} />
        </motion.div>
      ))}
    </div>
  );
};

type SparkleBurstsProps = {
  bursts: { id: number; x: number; y: number }[];
  onBurstDone: (id: number) => void;
};

export const SparkleBursts = ({ bursts, onBurstDone }: SparkleBurstsProps) => (
  <AnimatePresence>
    {bursts.map((b) => (
      <Burst
        key={b.id}
        burstId={b.id}
        originX={b.x}
        originY={b.y}
        onComplete={() => onBurstDone(b.id)}
      />
    ))}
  </AnimatePresence>
);
