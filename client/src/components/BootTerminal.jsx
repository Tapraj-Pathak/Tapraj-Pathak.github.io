import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu } from "lucide-react";

const bootLines = [
  "boot tapraj.dev",
  "Initializing...",
  "\u2713 Computer Engineering Student",
  "\u2713 Full Stack Developer",
  "\u2713 Linux Enthusiast",
  "\u2713 Exploring Web3",
  "Welcome.",
];

const BootTerminal = () => {
  const [visible, setVisible] = useState(true);
  const [displayedLines, setDisplayedLines] = useState([]);
  const audioContextRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const sleep = (duration) =>
      new Promise((resolve) => {
        const timer = window.setTimeout(resolve, duration);
        timers.push(timer);
      });

    const playTypingSound = () => {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContextClass();
        }

        const audioContext = audioContextRef.current;
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "square";
        oscillator.frequency.value = 680 + Math.random() * 120;
        gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.0001,
          audioContext.currentTime + 0.035,
        );

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.035);
      } catch {
        // Browsers may block audio until the visitor interacts with the page.
      }
    };

    const typeBoot = async () => {
      setDisplayedLines([]);

      for (let lineIndex = 0; lineIndex < bootLines.length; lineIndex += 1) {
        const line = bootLines[lineIndex];

        for (let charIndex = 0; charIndex <= line.length; charIndex += 1) {
          if (cancelled) return;

          setDisplayedLines((currentLines) => {
            const nextLines = [...currentLines];
            nextLines[lineIndex] = line.slice(0, charIndex);
            return nextLines;
          });

          if (charIndex > 0 && line[charIndex - 1] !== " ") {
            playTypingSound();
          }

          await sleep(lineIndex === 0 ? 34 : 14 + Math.random() * 10);
        }

        await sleep(lineIndex < bootLines.length - 1 ? 90 : 750);
      }

      if (!cancelled) {
        setVisible(false);
      }
    };

    typeBoot();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      audioContextRef.current?.close?.();
    };
  }, []);

  const activeLineIndex = displayedLines.findLastIndex(Boolean);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-100 grid place-items-center bg-zinc-950 px-5 text-zinc-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          aria-live="polite"
        >
          <motion.div
            className="w-full max-w-3xl overflow-hidden rounded-lg border border-cyan-400/25 bg-black/90 shadow-[0_30px_120px_rgba(34,211,238,0.18)]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/3 px-5 py-3">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200">
                <Cpu size={15} />
                boot console
              </div>
              <div className="flex gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="min-h-88 px-5 py-6 font-mono text-sm leading-7 text-zinc-200 sm:px-7 sm:text-base">
              {displayedLines.map((line, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-cyan-300"
                      : line.startsWith("\u2713")
                        ? "text-emerald-300"
                        : "text-zinc-200"
                  }
                >
                  <span className="mr-2 text-zinc-500">$</span>
                  {line}
                  {index === activeLineIndex && (
                    <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan-300" />
                  )}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootTerminal;
