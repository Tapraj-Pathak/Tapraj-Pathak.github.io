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
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with React, Node.js,Express js, MongoDB, and Tailwind CSS showcasing my projects, skills, and contact information.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    status: "Live",
    github: "https://github.com/Tapraj-Pathak/Tapraj-Pathak.github.io",
    demo: "/",
    accent: "from-cyan-500/30 to-slate-600/20",
  },
  {
    title: "Chat Application",
    description: "A real-time chat application built with React and Socket.IO.",
    stack: ["React", "Socket.IO", "Node.js", "MongoDB"],
    status: "Live soon",
    github: "https://github.com/Tapraj-Pathak/Chat-App",
    demo: "#",
    accent: "from-rose-500/30 to-orange-400/20",
  },
  {
    title: "Smart Saauji",
    description: "Turn-key inventory and insights app for small retailers. ",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    status: "In Progress",
    github: "https://github.com/Tapraj-Pathak/Smart-saauji",
    demo: "#",
    accent: "from-violet-500/30 to-fuchsia-400/20",
  },
  {
    title: "Queue Zero",
    description: "A real-time queue management system for hospitals.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    status: "Live soon",
    github: "https://github.com/Tapraj-Pathak/Queue-Zero",
    demo: "#",
    accent: "from-emerald-500/30 to-cyan-400/20",
  },
  {
    title: "Kyc Verification System",
    description: "A secure and efficient system for verifying user identities.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenCV",
      "Tailwind CSS",
    ],
    status: "Live soon",
    github: "https://github.com/Tapraj-Pathak/Kyc-Verification-System",
    demo: "#",
    accent: "from-amber-500/30 to-rose-400/20",
  },
];

export const timeline = [
  "2010 - 2022: Schooling at Sadhana Path Academy",
  "2022 - 2024: 11th and 12th at National Academy of Science and Technology",
  "2025 - Present: BE Computer at National College of Engineering, affiliated to Tribhuvan University",
];

export const hackathons = [
  {
    title: "CodeFest 2026",
    detail:
      "Nepal largest hackathon, organized by CodeFest. Built a hardware and software solution for confedenciality.",
    icon: Blocks,
  },
  {
    title: "Havard Health Hackathon 2026",
    detail:
      "Solved a real-world problem related to healthcare using innovative technology solutions.",
    icon: Blocks,
  },
  {
    title: "Nepal Startup Innovation Hackathon 2026",
    detail:
      "Created a mobile app that utilized machine learning algorithms to provide ambulance services in real-time, improving emergency response times.",
    icon: Blocks,
  },
  {
    title: "Code for Change 2025",
    detail:
      "Developed a web application that streamlined the process of connecting local businesses with potential customers.",
    icon: Blocks,
  },
];

export const githubHighlights = [
  { label: "Contributions", value: "5+" },
  { label: "Repositories", value: "10+" },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Tapraj-Pathak",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/tapraj-pathak-22677a348/",
    icon: LinkedinIcon,
  },
  { label: "X", href: "https://x.com/PathakTapraj", icon: XIcon },
];

export const commands = [
  { command: "whoami", description: "Show identity and location" },
  { command: "skills", description: "List core technical strengths" },
  { command: "projects", description: "Open featured products" },
  { command: "education", description: "Show academic background" },
  { command: "contact", description: "Reveal contact details" },
];
