import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AIPath3D from "./AIPath3D.jsx";
import ReactMarkdown from "react-markdown";
import { FileText} from "lucide-react";

import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  TerminalSquare,
  Database,
  Brain,
  Boxes,
  Cloud,
  ShieldCheck,
  Wrench,
  Sparkles,
  ExternalLink,
} from "lucide-react";

/** =========================
 *  EDIT THESE LINKS ONCE
 *  ========================= */
const PROFILE = {
  name: "Harsha Prasad",
  title: "AI/ML + Backend + Cloud Systems Engineer",
  phone: "+1 (682) 392-5330",
  email: "hbprasad0110@gmail.com",
  linkedin: "https://www.linkedin.com/in/harsha-prasad-3188a512a/",
  github: "https://github.com/hbprasad0110-rgb",
  pills: [
    "AI / ML • Backend Development",
    "Data Engineering • Database Systems",
    "Cloud Computing • Scalable Architecture"

  ],
  highlights: [
    "Python • PyTorch • TensorFlow • NLP",
    "FastAPI/Flask • Node.js/TypeScript • REST APIs","",
    "PostgreSQL • MySQL • MongoDB • Redis • SQL (Indexing)",
    "AWS/Azure • Docker • Kubernetes • CI/CD • GitHub Actions",
    "Microservices • Distributed Systems • JWT/RBAC • OAuth",
    "Tableau • Power BI • ETL • Data Cleaning/Validation",
  ],
};

const SKILLS = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Deep Learning (CNNs)",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "NLP",
      "Feature Engineering",
      "Image Processing",
      "Pandas / NumPy",
      "ETL & Data Quality",
      "Model Evaluation",
    ],
  },

  {
    icon: Database,
    title: "Databases & Data Systems",
    items: [
      "SQL (Advanced Queries, Indexing, Optimization)",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Data Modeling",
      "Query Optimization",
    ],
  },

  {
    icon: Boxes,
    title: "Backend & Web Engineering",
    items: [
      "Python",
      "Node.js",
      "TypeScript / JavaScript",
      "Flask / FastAPI",
      "REST APIs",
      "Microservices",
      "React.js",
      "Angular",
      "API Design",
    ],
  },

  {
    icon: Cloud,
    title: "Cloud, DevOps & Operating Systems",
    items: [
      "AWS (EC2, S3)",
      "Azure",
      "Google Cloud Platform (GCP)",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Git / GitHub",
      "Linux / Unix",
      "Ubuntu",
      "RedHat",
      "Windows",
    ],
  },

  {
    icon: ShieldCheck,
    title: "Architecture, Security & Quality",
    items: [
      "Microservices Architecture",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Kafka",
      "JWT / RBAC",
      "Secure APIs",
      "Static Code Analysis",
      "Reliability Practices",
    ],
  },

  {
    icon: Wrench,
    title: "Tools & Analytics",
    items: [
      "Jupyter Notebook",
      "Tableau",
      "Power BI",
      "Visual Studio",
      "Android Studio",
      "JIRA",
    ],
  },
];


const PROJECTS = [
  {
    name: "AI Analytics Copilot — NL → SQL Insights",
    desc: "NLP-driven analytics assistant that automates query generation and insight summaries on structured data.",
    tags: ["Python", "NLP", "ML", "Analytics", "SQL"],
    link: "https://github.com/hbprasad0110-rgb/AI-Analytics-Copilot",
    accent: "from-emerald-500/25 to-cyan-500/10",
  },

  {
    name: "Movie Genre Prediction from Plot Summaries",
    desc: "Text preprocessing + TF-IDF + multi-label classification pipeline with evaluation metrics.",
    tags: ["NLP", "TF-IDF", "Classification", "Python"],
    link: "https://github.com/hbprasad0110-rgb/Movie-Genre-Prediction-from-Plot-Summaries",
    accent: "from-pink-500/20 to-orange-500/10",
  },

  {
    name: "Forever & Beyond — Wedding Management DBMS",
    desc: "Relational DBMS design with ER modeling, normalization, indexing, and analytics validation using Python.",
    tags: ["SQL", "DB Design", "Indexing", "Optimization"],
    link: "https://github.com/hbprasad0110-rgb/Forever-Beyond-Wedding-Management-Database-System",
    accent: "from-indigo-500/25 to-fuchsia-500/10",
  },
  {
    name: "Water Retention Neural Model",
    desc: "Neural-network-based regression model to predict soil water retention using scientific data preprocessing and deep learning.",
    tags: ["Deep Learning", "PyTorch", "Regression", "Research", "Python"],
    link: "https://github.com/hbprasad0110-rgb/water-retention-neural-model",
    accent: "from-teal-500/25 to-emerald-500/10",
  },
  {
    name: "Chat Application",
    desc: "Real-time chat system demonstrating backend communication and modern web architecture.",
    tags: ["Node.js", "Realtime", "Web", "Backend"],
    link: "https://github.com/hbprasad0110-rgb/chat-application",
    accent: "from-cyan-500/25 to-indigo-500/10",
  },

  {
    name: "Pizza Delivery System",
    desc: "Full-stack application handling ordering flow, backend logic, and database interactions.",
    tags: ["Full Stack", "Database", "Backend", "Web"],
    link: "https://github.com/hbprasad0110-rgb/PizzaDeliverySystem",
    accent: "from-yellow-500/25 to-orange-500/10",
  },

];


const PATH_MILESTONES = [
  { year: "2018", title: "Foundations", text: "Core engineering mindset + problem solving + clean code.", skills: ["Python", "OOP", "Git", "DSA", "Debugging", "REST Basics"] },
  { year: "2020", title: "Backend + Databases", text: "Built APIs and optimized data systems for performance.", skills: ["SQL", "PostgreSQL", "MySQL", "Redis", "API Design", "Node.js"] },
  { year: "2022", title: "Cloud + DevOps", text: "Shipping production services with automation and reliability.", skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "Monitoring"] },
  { year: "2025", title: "AI / ML Builder", text: "End-to-end ML/NLP pipelines and analytics systems.", skills: ["scikit-learn", "TensorFlow", "PyTorch", "NLP", "Pandas", "ETL"] },
  { year: "Next", title: "AI Systems", text: "MLOps + RAG + scalable AI services with open-source tools.", skills: ["FastAPI/Flask", "MLOps", "RAG", "Vector DB", "Evaluation", "Drift"] },
];

const MLOPS_STEPS = [
  { title: "Data", desc: "Ingest, validate, version datasets", icon: Database },
  { title: "Train", desc: "Train ML/NLP models with reproducibility", icon: Brain },
  { title: "Evaluate", desc: "Metrics, drift checks, bias checks", icon: ShieldCheck },
  { title: "Deploy", desc: "API packaging + Docker + CI/CD", icon: Boxes },
  { title: "Monitor", desc: "Latency, errors, drift, retraining triggers", icon: Cloud },
];

// const MODEL_CARDS = [
//   {
//     name: "NLP Multi-Label Classifier",
//     task: "Movie genre classification from plot summaries",
//     metrics: [
//       { k: "F1 (micro)", v: "0.82 (example)" },
//       { k: "F1 (macro)", v: "0.74 (example)" },
//       { k: "Latency", v: "~25ms/request (local)" },
//     ],
//     dataset: "Open datasets (Kaggle / public corpora)",
//     details: "Pipeline: cleaning → TF-IDF → multi-label classifier. Includes evaluation + reproducibility notes.",
//     limitations: "May struggle with short plots; performance depends on label imbalance.",
//     responsible_use: "Decision-support only; monitor drift for new content distributions.",
//   },
// ];

// const DEMO_COMMANDS_MD = `
// ### Try these commands
// - \`help\`
// - \`skills\`
// - \`projects\`
// - \`predict\`  (calls local API)
// - \`contact\`
// `;

/** =========================
 *  UI HELPERS
 *  ========================= */
function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="mt-2 max-w-3xl text-white/70">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

function downloadResume() {
  const a = document.createElement("a");
  a.href = RESUME_URL;
  a.download = "Harsha_Prasad_Resume.pdf";
  a.click();
}

function Nav() {
  const items = [
    { label: "Home", href: "#top" },
    { label: "Skills", href: "#skills" },
    { label: "MLOps", href: "#mlops" },
    { label: "Projects", href: "#projects" },
    // { label: "Live Demo", href: "#demo" },
    // { label: "Model Cards", href: "#model-cards" },
    { label: "Growth Path", href: "#path" },
    { label: "Contact", href: "#contact" },
  ];

return (
  <div className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
      <a href="#top" className="flex items-center gap-2 text-white/90">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Sparkles size={16} />
        </span>
      </a>

      <div className="hidden gap-2 md:flex">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="rounded-full px-3 py-1 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
          >
            {it.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {/* ✅ Resume dropdown (fixed hover) */}
        <div className="relative group">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10 transition"
            aria-label="Resume"
            title="Resume"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* dropdown */}
          <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
            <div className="w-44 rounded-2xl bg-black/85 backdrop-blur ring-1 ring-white/10 p-2 shadow-lg">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              >
                Open <ExternalLink size={16} className="text-white/60" />
              </a>

              <button
                type="button"
                onClick={downloadResume}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              >
                Download <ArrowRight size={16} className="text-white/60" />
              </button>
            </div>
          </div>
        </div>

        {/* GitHub */}
        <a
          className="rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10 transition"
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github size={16} />
        </a>

        {/* LinkedIn */}
        <a
          className="rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10 transition"
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
      </div>
    </div>
  </div>
);

}

/** =========================
 *  WORKING CHATBOT (TYPE + ENTER WORKS)
 *  ========================= */
function RecruiterChatBot() {
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        `Hi 👋 I’m Harsha’s AI assistant.\n` +
        `Ask me about: Resume, Projects, Skills, Contact.\n\n` +
        `Type “projects” or click a button below.`,
    },
  ]);
const [pendingResumeChoice, setPendingResumeChoice] = useState(false);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function addBot(text) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  }
  function addUser(text) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  function scrollTo(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

function openResume() {
  setPendingResumeChoice(true);
  addBot("📄 Would you like to open the resume in a new tab or download it?");
  addBot("Type: open  OR  download");
}

function showProjects() {
  addBot("Here are my featured projects:");
  PROJECTS.forEach((p, i) => addBot(`${i + 1}) ${p.name}\n${p.link}`));
  addBot('For details, type: p1 / p2 / p3 (example: "p1").');
  // scrollTo("#projects");
}


  function openResumeInTab() {
  window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  addBot("✅ Opening resume in a new tab.");
  setPendingResumeChoice(false);
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = RESUME_URL;
  link.download = "Harsha_Prasad_Resume.pdf";
  link.click();

  addBot("⬇️ Download started.");
  setPendingResumeChoice(false);
}

  function showSkills() {
    addBot("Top skills:");
    SKILLS.forEach((s) => {
      addBot(`• ${s.title}: ${s.items.slice(0, 5).join(", ")}${s.items.length > 5 ? "..." : ""}`);
    });
    // scrollTo("#skills");
  }

  function showContact() {
    addBot(`📩 Email: ${PROFILE.email}`);
    addBot(`📞 Phone: ${PROFILE.phone}`);
    addBot(`🔗 LinkedIn: ${PROFILE.linkedin}`);
    addBot(`💻 GitHub: ${PROFILE.github}`);
    // scrollTo("#contact");
  }

  function handleQuick(label) {
    addUser(label);
    if (label === "Resume") return openResume();
    if (label === "Projects") return showProjects();
    if (label === "Skills") return showSkills();
    if (label === "Contact") return showContact();
    if (label === "Start (guided)") {
      addBot("Quick menu: 1) Resume  2) Projects  3) Skills  4) Contact");
      addBot("Type 1 / 2 / 3 / 4");
      return;
    }
  }

function handleText(text) {
  const t = text.trim();
  if (!t) return;

  addUser(t);

  // ✅ Resume choice mode (open/download)
  if (pendingResumeChoice) {
    const lower = t.toLowerCase();
    if (lower.includes("open")) return openResumeInTab();
    if (lower.includes("download")) return downloadResume();
    addBot('Please type: "open" or "download".');
    return;
  }

  const lower = t.toLowerCase();

  // ✅ Guided menu shortcuts
  if (t === "1") return openResume();    // now asks open/download
  if (t === "2") return showProjects();
  if (t === "3") return showSkills();
  if (t === "4") return showContact();

  // ✅ Project detail shortcuts (avoid conflict with menu)
  // user types: p1 / p2 / p3 ...
  if (/^p\d+$/.test(lower)) {
    const idx = Number(lower.slice(1)) - 1;
    const p = PROJECTS[idx];
    if (p) {
      addBot(`✅ ${p.name}`);
      addBot(p.desc);
      addBot(`Tags: ${p.tags.join(", ")}`);
      addBot(`Repo: ${p.link}`);
      return;
    }
    addBot("That project number doesn't exist. Try p1, p2, p3...");
    return;
  }

  // ✅ Keyword routing
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("pdf"))
    return openResume();

  if (lower.includes("project")) return showProjects();
  if (lower.includes("skill")) return showSkills();
  if (lower.includes("contact") || lower.includes("email") || lower.includes("phone"))
    return showContact();

  if (lower.includes("linkedin")) {
    window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer");
    addBot("✅ Opening LinkedIn.");
    return;
  }

  if (lower.includes("github")) {
    window.open(PROFILE.github, "_blank", "noopener,noreferrer");
    addBot("✅ Opening GitHub.");
    return;
  }

  addBot('I can help with: resume, projects, skills, contact. Try typing one of those.');
}

  function onSubmit() {
    handleText(input);
    setInput("");
    // keep focus on input so typing continues
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const Bubble = ({ from, text }) => (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ring-1 ${
          from === "user"
            ? "bg-white text-black ring-white/10"
            : "bg-white/5 text-white/85 ring-white/10"
        }`}
      >
        {text}
      </div>
    </div>
  );

  const Btn = ({ label }) => (
    <button
      type="button"
      onClick={() => handleQuick(label)}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
    >
      {label}
    </button>
  );

  return (
    <div className="glass rounded-3xl p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <TerminalSquare size={16} />
          <span className="text-sm font-semibold">AI Recruiter Assistant</span>
        </div>
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
      </div>

      <div
        ref={listRef}
        className="h-56 overflow-auto rounded-2xl bg-black/40 p-3 ring-1 ring-white/10 space-y-2"
      >
        {messages.map((m, idx) => (
          <Bubble key={idx} from={m.from} text={m.text} />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Btn label="Start (guided)" />
        <Btn label="Resume" />
        <Btn label="Projects" />
        <Btn label="Skills" />
        <Btn label="Contact" />
      </div>

      {/* IMPORTANT: pointer events must be enabled */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-black/40 px-3 py-2 ring-1 ring-white/10 pointer-events-auto">
        <span className="text-white/60">💬</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          className="w-full bg-transparent text-sm text-white/85 outline-none placeholder:text-white/35"
          placeholder='Type: "projects" / "resume" / "skills" / "contact"'
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-black hover:opacity-90 transition"
        >
          Send
        </button>
      </div>

      <div className="mt-2 text-xs text-white/45">
        {/* Tip: put <span className="text-white/70">resume.pdf</span> in{" "} */}
        {/* <span className="text-white/70">/public</span> */}
      </div>
    </div>
  );
}

/** =========================
 *  HERO (FIXED overlays)
 *  ========================= */
function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      {/* ✅ FIX: background layers must NOT block clicks */}
      <div className="pointer-events-none absolute inset-0 gridfade opacity-80" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 left-10 h-[320px] w-[320px] rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-8 h-[280px] w-[280px] rounded-full bg-pink-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-7 shadow-soft"
        >
    

<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
  <div>
    <div className="flex flex-wrap items-center gap-2">
      {PROFILE.pills.map((p) => (
        <Pill key={p}>{p}</Pill>
      ))}
    </div>

    <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
      {PROFILE.name}
    </h1>
    <p className="mt-2 text-white/75">{PROFILE.title}</p>

    <p className="mt-5 max-w-2xl text-white/70">
      I build <b className="text-white/85">production-grade backend systems</b> and{" "}
      <b className="text-white/85">AI/ML-powered applications</b>—bringing together{" "}
      <b className="text-white/85">ML/NLP research, data engineering, databases</b>, and{" "}
      <b className="text-white/85">cloud-native infrastructure</b> to deliver scalable,
      reliable systems end-to-end.
    </p>

    {/* <div className="mt-6 flex flex-wrap gap-2">
      {PROFILE.highlights.map((h) => (
        <Pill key={h}>{h}</Pill>
      ))}
    </div> */}

    <div className="mt-7 flex flex-wrap gap-3">
      <a
        href="#projects"
        className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
      >
        View Projects <ArrowRight size={16} />
      </a>
      <a
        href="#path"
        className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
      >
        See Growth Path <Sparkles size={16} />
      </a>
    </div>
  </div>

  <div className="w-full md:w-[420px]">
    <RecruiterChatBot />
  </div>
</div>

        </motion.div>
      </div>
    </div>
  );
}

function AIGrowthPath() {
  return (
    <Section
      id="path"
      title="Growth Path (3D)"
      subtitle="A real 3D path with clickable milestones showing skills and software knowledge."
    >
      <AIPath3D milestones={PATH_MILESTONES} />
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills (AI + Python + DB + Cloud)" subtitle="Recruiter-friendly and production aligned.">
      <div className="grid gap-4 md:grid-cols-2">
        {SKILLS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="glass rounded-3xl p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Icon size={18} className="text-white/80" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-white/60">Core stack</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => <Pill key={it}>{it}</Pill>)}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function MLOpsStrip() {
  return (
    <Section id="mlops" title="MLOps Pipeline" subtitle="Data → Train → Evaluate → Deploy → Monitor">
      <div className="glass rounded-3xl p-6 shadow-soft">
        <div className="grid gap-3 md:grid-cols-5">
          {MLOPS_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-white/85">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-black/30 ring-1 ring-white/10">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-semibold">{s.title}</span>
                </div>
                <p className="mt-2 text-sm text-white/65">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="Click any repo to open GitHub.">
      <div className="grid gap-4 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <div key={p.name} className="glass rounded-3xl p-5 shadow-soft">
            <div className={`mb-4 h-24 rounded-2xl bg-gradient-to-br ${p.accent} ring-1 ring-white/10`} />
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="mt-2 text-sm text-white/70">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => <Pill key={t}>{t}</Pill>)}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <a
                href={p.link}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
                target="_blank"
                rel="noreferrer"
              >
                Repo <ExternalLink size={16} />
              </a>
              <span className="text-xs text-white/50">Open-source</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function LiveAIDemo() {
  const [text, setText] = useState("A family goes on an unexpected adventure with hidden secrets...");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function predict() {
    setErr("");
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", { text });
      setResult(res.data);
    } catch {
      setErr("Could not reach local API. Start backend on http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="demo" title="Live AI Demo (Open-source)" subtitle="Type input → call local API → show prediction.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-3xl p-6 shadow-soft">
          <div className="flex items-center gap-2 text-white/85">
            <Sparkles size={18} />
            <span className="text-sm font-semibold">Prediction Playground</span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-4 h-36 w-full resize-none rounded-2xl bg-black/35 p-3 text-sm text-white/85 ring-1 ring-white/10 outline-none"
          />

          <div className="mt-4 flex gap-2">
            <button
              onClick={predict}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Running..." : "Predict"} <ArrowRight size={16} />
            </button>

            <a
              href="#model-cards"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              View Model Cards <ExternalLink size={16} />
            </a>
          </div>

          {err && <p className="mt-3 text-sm text-red-300/90">{err}</p>}
        </div>

        <div className="glass rounded-3xl p-6 shadow-soft">
          <div className="flex items-center gap-2 text-white/85">
            <TerminalSquare size={18} />
            <span className="text-sm font-semibold">Demo Notes</span>
          </div>
{/* 
          <div className="mt-4 rounded-2xl bg-black/35 p-4 text-sm text-white/75 ring-1 ring-white/10">
            <ReactMarkdown>{DEMO_COMMANDS_MD}</ReactMarkdown>
            <p className="mt-3 text-white/60">Backend is local (FastAPI). Later you can deploy it.</p>
          </div> */}

          <div className="mt-4 rounded-2xl bg-black/35 p-4 ring-1 ring-white/10">
            <div className="text-sm font-semibold text-white/80">Result</div>
            <pre className="mt-2 overflow-auto text-xs text-white/75">
{result ? JSON.stringify(result, null, 2) : "Run Predict to see output here..."}
            </pre>
          </div>
        </div>
      </div>
    </Section>
  );
}

// function ModelCards() {
//   return (
//     <Section id="model-cards" title="Model Cards" subtitle="What the model does + metrics + limitations.">
//       <div className="grid gap-4 md:grid-cols-2">
//         {MODEL_CARDS.map((m) => (
//           <div key={m.name} className="glass rounded-3xl p-6 shadow-soft">
//             <h3 className="text-lg font-semibold text-white">{m.name}</h3>
//             <p className="mt-1 text-sm text-white/70">
//               <b className="text-white/85">Task:</b> {m.task}
//             </p>

//             <div className="mt-4 rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
//               <div className="text-sm font-semibold text-white/80">Metrics</div>
//               <div className="mt-2 grid gap-2">
//                 {m.metrics.map((x) => (
//                   <div key={x.k} className="flex items-center justify-between text-sm text-white/70">
//                     <span>{x.k}</span>
//                     <span className="text-white/85">{x.v}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-4 text-sm text-white/70">
//               <p><b className="text-white/85">Dataset:</b> {m.dataset}</p>
//               <p className="mt-2"><b className="text-white/85">Details:</b> {m.details}</p>
//               <p className="mt-2"><b className="text-white/85">Limitations:</b> {m.limitations}</p>
//               <p className="mt-2"><b className="text-white/85">Responsible use:</b> {m.responsible_use}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="One click for recruiters.">
      <div className="glass rounded-3xl p-6 shadow-soft">
        <div className="grid gap-3 md:grid-cols-2">
          <a className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition" href={`mailto:${PROFILE.email}`}>
            <div className="flex items-center gap-3 text-white/80">
              <Mail size={18} />
              <span className="text-sm font-semibold">{PROFILE.email}</span>
            </div>
            <ArrowRight size={16} className="text-white/50" />
          </a>

          <a className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition" href={`tel:${PROFILE.phone.replace(/[^0-9+]/g, "")}`}>
            <div className="flex items-center gap-3 text-white/80">
              <Phone size={18} />
              <span className="text-sm font-semibold">{PROFILE.phone}</span>
            </div>
            <ArrowRight size={16} className="text-white/50" />
          </a>

          <a className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            <div className="flex items-center gap-3 text-white/80">
              <Linkedin size={18} />
              <span className="text-sm font-semibold">LinkedIn</span>
            </div>
            <ArrowRight size={16} className="text-white/50" />
          </a>

          <a className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition" href={PROFILE.github} target="_blank" rel="noreferrer">
            <div className="flex items-center gap-3 text-white/80">
              <Github size={18} />
              <span className="text-sm font-semibold">GitHub</span>
            </div>
            <ArrowRight size={16} className="text-white/50" />
          </a>
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Skills />
      <MLOpsStrip />
      <Projects />
      {/* <LiveAIDemo /> */}
      {/* <ModelCards /> */}
      <AIGrowthPath />
      <Contact />

      <footer className="mx-auto max-w-6xl px-5 pb-14 text-sm text-white/45">
        <div className="glass rounded-3xl p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} {PROFILE.name} </span>
            {/* — React + Tailwind + Framer Motion */}
            <span className="text-white/35">“Growth is a path, not a point.”</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
