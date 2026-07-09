const SectionHeading = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment} space-y-3`}>
      <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
