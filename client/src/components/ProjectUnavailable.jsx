import { ArrowLeft, SearchX } from "lucide-react";

const ProjectUnavailable = ({ project, onBack }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_28%),linear-gradient(120deg,#f7f7f7_0%,#f3f4f6_100%)] px-6 py-10 text-zinc-800 dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_24%),linear-gradient(120deg,#09090b_0%,#111113_100%)] dark:text-zinc-100">
      <div className="w-full max-w-3xl rounded-[2rem] border border-rose-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(2,8,23,0.08)] backdrop-blur dark:border-rose-900/60 dark:bg-zinc-950/80">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-rose-500/10 p-2 text-rose-600 dark:text-rose-300">
            <SearchX size={18} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-rose-600 dark:text-rose-300">
            404 • Project demo not found
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-semibold text-zinc-950 dark:text-white sm:text-4xl">
          The demo for {project?.title || "this project"} is not hosted yet.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          This project is still being polished, kept private, or is waiting for
          its first public deployment. Please check back soon.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          <ArrowLeft size={16} /> Back to projects
        </button>
      </div>
    </div>
  );
};

export default ProjectUnavailable;
