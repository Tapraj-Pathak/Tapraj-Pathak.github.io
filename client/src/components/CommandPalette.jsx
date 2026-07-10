import { AnimatePresence, motion } from "framer-motion";
import { Command, Sparkles } from "lucide-react";

const CommandPalette = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-70 flex items-start justify-center bg-zinc-950/70 px-4 pt-24 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/40"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;
