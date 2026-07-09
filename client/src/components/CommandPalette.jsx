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
        >
          {/* <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3 text-sm text-zinc-400">
            <Command size={16} />
            <span>Quick actions</span>
          </div>
          <div className="space-y-2 p-3">
            {[
              { label: "Jump to About", action: () => onSelect("about") },
              { label: "Jump to Projects", action: () => onSelect("projects") },
              { label: "Jump to Contact", action: () => onSelect("contact") },
              { label: "Copy email", action: () => onSelect("email") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-3 text-left text-sm text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
              >
                <span>{item.label}</span>
                <Sparkles size={14} className="text-cyan-400" />
              </button>
            ))}
          </div> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;
