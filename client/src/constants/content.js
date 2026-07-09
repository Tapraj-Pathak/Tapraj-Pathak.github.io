import {
  BrainCircuit,
  Database,
  Blocks,
  Rocket,
  Sparkles,
  Globe2,
  Code2,
  Workflow,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "../components/BrandIcons.jsx";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export const skills = [
  {
    title: "Languages",
    items: ["JavaScript", "Python", "C++"],
    icon: Code2,
  },
  {
    title: "Frontend",
    items: ["React", "HTML", "CSS", "Tailwind CSS"],
    icon: Globe2,
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JWT Authentication",
    ],
    icon: Database,
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Linux", "VS Code", "Socket.IO", "Postman"],
    icon: Workflow,
  },
  {
    title: "Currently Learning",
    items: ["Solidity", "Ethereum", "Smart Contracts", "AI/ML"],
    icon: BrainCircuit,
  },
];

export const projects = [
  {
    title: "Mock Project",
    description:
      "A temporary placeholder project entry while real case studies are being prepared.",
    stack: ["React", "Node.js"],
    status: "Coming soon",
    github: "#",
    demo: "#",
    accent: "from-slate-500/30 to-slate-600/20",
  },
];

export const timeline = [
  "Building out portfolio content",
  "Preparing more polished project stories",
  "Shaping future ideas and experiments",
];

export const hackathons = [
  {
    title: "Upcoming Hackathon",
    detail: "A placeholder entry for upcoming hackathon plans.",
    icon: Sparkles,
  },
];

export const githubHighlights = [
  { label: "Pinned repos", value: "8+" },
  { label: "Contributions", value: "300+" },
  { label: "Focus", value: "AI / Web3" },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: LinkedinIcon },
  { label: "X", href: "https://x.com/", icon: XIcon },
];

export const commands = [
  { command: "whoami", description: "Show identity and location" },
  { command: "skills", description: "List core technical strengths" },
  { command: "projects", description: "Open featured products" },
  { command: "education", description: "Show academic background" },
  { command: "contact", description: "Reveal contact details" },
  { command: "currently", description: "Show current focus" },
];
