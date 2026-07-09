import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = ({ visible }) => {
  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 rounded-full border border-zinc-700/70 bg-zinc-950/90 p-3 text-zinc-100 shadow-2xl shadow-black/40 backdrop-blur"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
};

export default BackToTop;
