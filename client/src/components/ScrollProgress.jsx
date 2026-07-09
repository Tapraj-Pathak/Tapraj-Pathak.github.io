import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-cyan-400 via-fuchsia-500 to-violet-500"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
