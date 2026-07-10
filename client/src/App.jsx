import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Download,
  Mail,
  MapPin,
  MonitorPlay,
  TerminalSquare,
  Cpu,
  LaptopMinimal,
  BriefcaseBusiness,
  ScanSearch,
  Menu,
  X,
} from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import BootTerminal from "./components/BootTerminal";
import ProjectUnavailable from "./components/ProjectUnavailable";
import { GithubIcon, LinkedinIcon } from "./components/BrandIcons";
import {
  commands,
  hackathons,
  githubHighlights,
  navItems,
  projects,
  skills,
  socialLinks,
  timeline,
} from "./constants/content";

const initialTerminalOutput = [
  { label: "whoami", value: "Tapraj\nComputer Engineering Student\nNepal" },
  {
    label: "ls projects",
    value:
      "tapraj-pathak.me\nChattenger\nSmart Saauji\nQueueZero\nKyc-quality-dector",
  },
];

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [terminalInput, setTerminalInput] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactFeedback, setContactFeedback] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;

    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setBackToTopVisible(window.scrollY > 560);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const top = section.offsetTop - 140;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          setActiveSection(section.id);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalIndex((value) => (value + 1) % initialTerminalOutput.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    root.style.colorScheme = isDarkMode ? "dark" : "light";
    window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const currentTerminal = initialTerminalOutput[terminalIndex];
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL || "taprajpathak111@gmail.com";
  const heroStats = useMemo(
    () => [
      { label: "Hackathons", value: "3+" },
      { label: "Years building", value: "2+" },
      { label: "Focus", value: "AI / Web3" },
    ],
    [],
  );

  const handleCopyEmail = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(contactEmail);
      setCopyFeedback("Copied to clipboard");
      window.setTimeout(() => setCopyFeedback(""), 2200);
    }
  };

  const handleCommand = (event) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    if (command === "whoami") {
      setTerminalInput("");
      setTerminalIndex(0);
      return;
    }
    if (command === "projects") {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTerminalInput("");
      return;
    }
    if (command === "contact") {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTerminalInput("");
      return;
    }
    setTerminalInput("");
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus("sending");
    setContactFeedback("");

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Message could not be sent.");
      }

      setContactStatus("success");
      setContactFeedback("Message sent. I will get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      setContactStatus("error");
      setContactFeedback(error.message || "Message could not be sent.");
    }
  };

  if (selectedProject) {
    return (
      <ProjectUnavailable
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div>
      <BootTerminal />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_28%),linear-gradient(120deg,#f7f7f7_0%,#f3f4f6_100%)] text-zinc-800 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.11),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.11),transparent_24%),linear-gradient(120deg,#09090b_0%,#111113_100%)] dark:text-zinc-100">
        <ScrollProgress />
        <motion.div
          style={{ scaleX: scrollProgress }}
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-cyan-400 via-fuchsia-500 to-violet-500"
        />
        {copyFeedback && (
          <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-zinc-200/80 bg-white/95 px-4 py-3 text-sm text-zinc-900 shadow-lg shadow-zinc-900/10 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/95 dark:text-zinc-100">
            {copyFeedback}
          </div>
        )}

        <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/70 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <a
              href="#home"
              className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-700 dark:text-zinc-200"
            >
              tapraj.dev
            </a>
            <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex dark:text-zinc-400">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`transition hover:text-zinc-950 dark:hover:text-white ${activeSection === item.id ? "text-zinc-950 dark:text-white" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDarkMode((value) => !value)}
                className="hidden rounded-full border border-zinc-300 px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 md:inline-flex dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                aria-label="Toggle color theme"
              >
                {isDarkMode ? "Light" : "Dark"}
              </button>
              <button
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex rounded-full border border-zinc-300 p-2 text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 md:hidden dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                aria-label="Open navigation menu"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-zinc-200/80 bg-white/95 px-6 py-4 md:hidden dark:border-zinc-800/80 dark:bg-zinc-950/95">
              <div className="flex flex-col gap-3 text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <main>
          <section
            id="home"
            className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 lg:px-8 lg:py-28"
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-8"
              >
                <div className="space-y-5">
                  <h1 className="max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
                    Hey, I&apos;m Tapraj.
                    <span className="mt-3 block text-zinc-600 dark:text-zinc-300">
                      I build software that solves real-world problems.
                    </span>
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    Full stack developer, computer engineering student, and
                    AI/Web3 enthusiast building thoughtful products with backend
                    depth and product intuition.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    View projects <ArrowRight size={16} />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                    Contact me <Mail size={16} />
                  </a>
                  <a
                    href="/resume.pdf"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/20 dark:text-cyan-300"
                  >
                    Download Resume <Download size={16} />
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {[
                    "Full Stack Development",
                    "Artificial Intelligence",
                    "Linux",
                    "Web3",
                    "Startups",
                    "Open Source",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-300 px-3 py-2 dark:border-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                className="rounded-4xl border border-zinc-200/80 bg-white/70 p-6 shadow-[0_30px_90px_rgba(2,8,23,0.08)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/75"
              >
                <div className="rounded-3xl border border-zinc-200/70 bg-zinc-950 p-6 text-zinc-100 dark:border-zinc-800">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Cpu size={16} />
                      <span>tapraj@dev:~</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                  <div className="space-y-5 text-sm leading-7 text-zinc-300">
                    <p className="text-cyan-400">
                      &gt; {currentTerminal.label}
                    </p>
                    <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300">
                      {currentTerminal.value}
                    </pre>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/70"
                    >
                      <p className="text-xl font-semibold text-zinc-950 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="About"
                title="A builder shaped by systems, curiosity, and meaningful problems."
                description="I am a computer engineering student who enjoys building products with depth — from backend systems to polished experiences. My work sits at the intersection of engineering discipline, practical product thinking, and the curiosity to explore AI, Linux, and Web3."
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70"
              >
                <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  I am drawn to ambitious ideas that become real tools. I enjoy
                  backend architecture, API design, authentication systems, and
                  the invisible work that makes software reliable. I also love
                  the energy of hackathons, where fast iteration and sharp
                  problem framing matter as much as elegant code.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="rounded-full border border-zinc-300 px-3 py-2 dark:border-zinc-700">
                    Backend-first thinking
                  </span>
                  <span className="rounded-full border border-zinc-300 px-3 py-2 dark:border-zinc-700">
                    Linux and developer tooling
                  </span>
                  <span className="rounded-full border border-zinc-300 px-3 py-2 dark:border-zinc-700">
                    Hackathon-driven building
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="skills" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionHeading
              eyebrow="Skills"
              title="A stack built for shipping ambitious ideas."
              description="My work spans product interfaces, reliable backends, and the systems that make applications feel alive."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {skills.map((group, index) => {
                const Icon = group.icon;
                return (
                  <motion.article
                    key={group.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[1.6rem] border border-zinc-200/80 bg-white/70 p-6 shadow-[0_20px_50px_rgba(2,8,23,0.05)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/75"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-500">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-zinc-300 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <section
            id="projects"
            className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
          >
            <SectionHeading
              eyebrow="Selected Projects"
              title="Products I am building with intent."
              description="Each project reflects a focus on clarity, performance, and useful systems rather than noise."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.07 }}
                  className="group overflow-hidden rounded-4xl border border-zinc-200/80 bg-white/70 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70"
                >
                  <div className={`h-36 bg-linear-to-r ${project.accent}`} />
                  <div className="p-7">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-zinc-100 px-3 py-2 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      >
                        <GithubIcon size={16} /> GitHub
                      </a>
                      {project.demo && project.demo !== "#" ? (
                        <a
                          href={project.demo}
                          className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                        >
                          <MonitorPlay size={16} /> Live Demo
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                        >
                          <MonitorPlay size={16} /> Live Demo
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            id="hackathons"
            className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
          >
            <SectionHeading
              eyebrow="Hackathons"
              title="Momentum built through experimentation."
              description="I am preparing for ambitious challenges and using each build to sharpen both product and engineering depth."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
                <div className="space-y-6">
                  {hackathons.map((event) => {
                    const Icon = event.icon;
                    return (
                      <div
                        key={event.title}
                        className="flex gap-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/70"
                      >
                        <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-500">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                            {event.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-4xl border border-zinc-200/80 bg-linear-to-br from-cyan-500/10 via-white/70 to-fuchsia-500/10 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-linear-to-br dark:from-cyan-500/10 dark:via-zinc-950/70 dark:to-fuchsia-500/10">
                <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-300">
                  <BriefcaseBusiness size={18} />
                  <p className="text-sm font-medium uppercase tracking-[0.3em]">
                    Learning journey
                  </p>
                </div>
                <div className="mt-8 space-y-5 border-l border-zinc-300/70 pl-6 dark:border-zinc-700/80">
                  {timeline.map((item, index) => (
                    <div key={item} className="relative">
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {index + 1}. {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                    GitHub
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                    Open source, public work, and steady iteration.
                  </h2>
                </div>
                <a
                  href="https://github.com/"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  <GithubIcon size={16} /> Explore GitHub
                </a>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {githubHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70"
                  >
                    <p className="text-2xl font-semibold text-zinc-950 dark:text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
                <div className="flex items-center gap-3 text-cyan-500">
                  <LaptopMinimal size={18} />
                  <p className="text-sm font-medium uppercase tracking-[0.35em]">
                    Developer Terminal
                  </p>
                </div>
                <div className="mt-6 rounded-[1.6rem] border border-zinc-200/70 bg-zinc-950 p-6 text-zinc-100 dark:border-zinc-800">
                  <div className="mb-4 flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="space-y-3 text-sm leading-7 text-zinc-300">
                    <p className="text-cyan-400">
                      &gt; {currentTerminal.label}
                    </p>
                    <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300">
                      {currentTerminal.value}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
                <div className="flex items-center gap-3 text-cyan-500">
                  <ScanSearch size={18} />
                  <p className="text-sm font-medium uppercase tracking-[0.35em]">
                    Try commands
                  </p>
                </div>
                <form onSubmit={handleCommand} className="mt-6 space-y-5">
                  <label
                    className="block text-sm text-zinc-600 dark:text-zinc-400"
                    htmlFor="terminal-input"
                  >
                    Type a command and press Enter.
                  </label>
                  <div className="rounded-2xl border border-zinc-300/80 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
                    <input
                      id="terminal-input"
                      value={terminalInput}
                      onChange={(event) => setTerminalInput(event.target.value)}
                      className="w-full bg-transparent text-sm outline-none text-zinc-950 dark:text-white"
                      placeholder="whoami"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-3">
                    {commands.map((item) => (
                      <div
                        key={item.command}
                        className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {item.command}
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                          run
                        </span>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6 rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
                <SectionHeading
                  eyebrow="Contact"
                  title="Let’s build something useful."
                  description="I am open to collaborations, internships, and thoughtful product ideas."
                />
                <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/70 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="flex items-center gap-3"
                    >
                      <Mail size={16} /> {contactEmail}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                      aria-label="Copy email address"
                    >
                      <Copy size={16} className="cursor-pointer" />
                    </button>
                  </div>
                  <a
                    href="https://github.com/"
                    className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <GithubIcon size={16} /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/"
                    className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <LinkedinIcon size={16} /> LinkedIn
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 px-4 py-3 dark:border-zinc-800">
                    <MapPin size={16} /> Nepal
                  </div>
                </div>
              </div>
              <div className="rounded-4xl border border-zinc-200/80 bg-white/70 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.06)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/70">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mb-2 block">Name</span>
                      <input
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-cyan-400 dark:border-zinc-700 dark:bg-zinc-900"
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className="text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mb-2 block">Email</span>
                      <input
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-cyan-400 dark:border-zinc-700 dark:bg-zinc-900"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>
                  <label className="block text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="mb-2 block">Message</span>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      className="min-h-36 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none transition focus:border-cyan-400 dark:border-zinc-700 dark:bg-zinc-900"
                      placeholder="Tell me about your idea or project."
                      required
                    />
                  </label>
                  {contactFeedback && (
                    <p
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        contactStatus === "success"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300"
                          : "border-rose-400/30 bg-rose-400/10 text-rose-600 dark:text-rose-300"
                      }`}
                    >
                      {contactFeedback}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    {contactStatus === "sending"
                      ? "Sending..."
                      : "Send message"}
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-zinc-200/80 px-6 py-8 text-center text-sm text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
            <p>Building one product at a time.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-zinc-950 dark:hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </footer>

        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onSelect={(target) => {
            setPaletteOpen(false);
            if (target === "email") {
              navigator.clipboard?.writeText(contactEmail);
            } else {
              document
                .getElementById(target)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />
        <BackToTop visible={backToTopVisible} />
      </div>
    </div>
  );
};

export default App;
