import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import avatar from "@/assets/avatar.png";
import pNeural from "@/assets/project-neural.jpg";
import pChat from "@/assets/project-chatbot.jpg";
import pVision from "@/assets/project-vision.jpg";
import pData from "@/assets/project-data.jpg";
import SkillSphere from "@/components/SkillSphere";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Brain,
  Code2,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  BookOpen,
  Trophy,
  Link2,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    title: "Neural Search Engine",
    desc: "Semantic search over 1M+ docs using vector embeddings and RAG pipelines.",
    tags: ["PYTHON", "LANGCHAIN", "PINECONE"],
    img: pNeural,
  },
  {
    title: "Conversational Agent",
    desc: "Multi-turn chatbot with tool use, memory and function calling.",
    tags: ["OPENAI", "REACT", "NODE"],
    img: pChat,
  },
  {
    title: "Vision Inspector",
    desc: "Real-time object detection for industrial QA running on edge devices.",
    tags: ["PYTORCH", "YOLO", "CV"],
    img: pVision,
  },
  {
    title: "Forecast Studio",
    desc: "Time-series forecasting platform with explainable model insights.",
    tags: ["XGBOOST", "FASTAPI", "REACT"],
    img: pData,
  },
];

function BookCallDialog({ children }: { children: ReactNode }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startWeekday = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const values: Array<Date | null> = [];

    for (let i = 0; i < startWeekday; i++) values.push(null);
    for (let day = 1; day <= totalDays; day++) {
      values.push(new Date(year, month, day));
    }

    return values;
  }, [currentMonth]);

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30"];

  const handleSubmitBooking = async () => {
    if (!selectedDate || !selectedSlot || !fullName || !email || !topic) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/book-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate.toISOString().split("T")[0],
          time: selectedSlot,
          fullName,
          email,
          topic,
        }),
      });

      if (response.ok) {
        alert("Booking confirmed! We'll contact you soon.");
        // Reset form
        setSelectedDate(null);
        setSelectedSlot(null);
        setFullName("");
        setEmail("");
        setTopic("");
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("realtopman2026@outlook.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleLinkedin = () => {
    window.open("https://linkedin.com/in/realtopman", "_blank", "noopener,noreferrer");
  };

  const handleGithub = () => {
    window.open("https://github.com/realtopman", "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] rounded-[28px] border border-border/70 bg-slate-950/95 shadow-2xl overflow-auto hide-scrollbar">
        <div className="flex h-full min-h-0 flex-col md:flex-row gap-0">
          {/* Left Sidebar */}
          <div className="w-full border-b border-border/70 bg-gradient-to-b from-slate-950 to-slate-950/80 p-4 md:p-5 text-white md:w-56 md:border-b-0 md:border-r md:min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary flex-shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/80">
                  30 min
                </p>
                <h3 className="text-sm font-semibold leading-tight">Book a call</h3>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="rounded-xl bg-gradient-to-br from-emerald-950/40 to-emerald-900/30 p-2.5 border border-emerald-500/30">
                <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-400">
                  ✓ We confirm your booking
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/60 p-2.5 border border-border/40">
                <p className="text-[9px] uppercase tracking-[0.2em]">🔗 Google Meet</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-auto p-5 md:p-6 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Let&apos;s bring your ideas to life
                </h2>
                <p className="text-xs text-muted-foreground">
                  Select a date and time to schedule our call.
                </p>
              </div>
              {/* Social buttons aligned to right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium transition ${
                    emailCopied
                      ? "border-green-500/50 bg-green-950/50 text-green-400"
                      : "border-border/60 bg-slate-800/60 text-muted-foreground hover:bg-slate-700 hover:text-white"
                  }`}
                  title="Copy email address"
                >
                  {emailCopied ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Mail className="h-3.5 w-3.5" />
                  )}
                  <span>{emailCopied ? "Copied!" : "Copy My Email"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleLinkedin}
                  className="inline-flex items-center justify-center rounded-full border border-border/60 bg-slate-800/60 p-2 text-muted-foreground transition hover:bg-slate-700 hover:text-white"
                  title="Open LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleGithub}
                  className="inline-flex items-center justify-center rounded-full border border-border/60 bg-slate-800/60 p-2 text-muted-foreground transition hover:bg-slate-700 hover:text-white"
                  title="Open GitHub"
                >
                  <Github className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Calendar & Time Grid */}
            <div className="mt-4 grid gap-4 md:gap-3 grid-cols-1 md:grid-cols-[1fr_0.9fr] flex-shrink-0">
              {/* Calendar */}
              <div className="rounded-[16px] border border-border/60 bg-slate-900/60 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
                  <span className="font-medium">{monthLabel}</span>
                  <div className="flex items-center gap-1 text-white/70">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                        )
                      }
                      className="rounded-lg border border-border/50 p-0.5 hover:bg-white/5 text-sm hover:text-white transition"
                      aria-label="Previous month"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                        )
                      }
                      className="rounded-lg border border-border/50 p-0.5 hover:bg-white/5 text-sm hover:text-white transition"
                      aria-label="Next month"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 mb-2 font-medium">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5 text-xs">
                  {days.map((date, index) => {
                    const isEmpty = !date;
                    const isPast = date ? date < todayStart : false;
                    const isSelected = date
                      ? selectedDate?.toDateString() === date.toDateString()
                      : false;
                    return (
                      <button
                        key={index}
                        disabled={isEmpty || isPast}
                        onClick={() => {
                          if (date && !isPast) {
                            setSelectedDate(date);
                            setSelectedSlot(null);
                          }
                        }}
                        className={`rounded-md py-1.5 font-medium transition duration-200 ${
                          isEmpty
                            ? "cursor-default bg-transparent text-transparent"
                            : isSelected
                              ? "bg-gradient-to-br from-primary to-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                              : isPast
                                ? "cursor-not-allowed bg-slate-950/40 text-slate-600"
                                : "bg-slate-800/50 text-white/70 hover:bg-slate-700/60 hover:text-white"
                        }`}
                      >
                        {date?.getDate() ?? ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="rounded-[16px] border border-border/60 bg-slate-900/60 p-4 backdrop-blur-sm">
                <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-medium">
                  Select time
                </h3>
                <p className="text-xs text-muted-foreground/80 mb-3">
                  {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date first"}
                </p>
                <div className="space-y-1.5">
                  {selectedDate ? (
                    <div className="grid gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full rounded-[10px] border px-3 py-2 text-center text-xs font-medium transition duration-200 ${
                            selectedSlot === slot
                              ? "border-primary bg-primary/15 text-primary shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                              : "border-border/50 bg-slate-800/40 text-muted-foreground hover:border-primary/50 hover:bg-slate-700/60 hover:text-white"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[10px] border border-dashed border-border/40 bg-slate-950/40 p-4 text-center text-xs uppercase tracking-[0.15em] text-white/50">
                      📅 Pick a date
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="mt-5 flex-1 overflow-auto">
              <div className="grid gap-2.5 sm:grid-cols-2 mb-3">
                <label className="space-y-1.5 text-xs">
                  <span className="uppercase tracking-[0.15em] text-muted-foreground font-medium">
                    Full name
                  </span>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-border/60 bg-slate-800/50 px-3 py-2 text-xs text-white placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition"
                  />
                </label>
                <label className="space-y-1.5 text-xs">
                  <span className="uppercase tracking-[0.15em] text-muted-foreground font-medium">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-border/60 bg-slate-800/50 px-3 py-2 text-xs text-white placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition"
                  />
                </label>
              </div>

              <label className="space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.15em] text-muted-foreground font-medium">
                  Topic
                </span>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={2}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value.slice(0, 300))}
                  maxLength={300}
                  className="w-full rounded-lg border border-border/60 bg-slate-800/50 px-3 py-2 text-xs text-white placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 resize-none transition"
                />
              </label>

              <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
                  {topic.length}/300 characters
                </p>
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={
                    !selectedDate || !selectedSlot || !fullName || !email || !topic || isSubmitting
                  }
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 px-5 py-2 text-xs font-semibold text-white transition hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  {isSubmitting ? "⏳ Submitting..." : "✓ Confirm booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Nav() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(900px,92%)]">
      <nav className="flex items-center justify-between px-2 py-2 rounded-full border border-border/60 bg-card/70 backdrop-blur-xl">
        <div className="flex items-center gap-2 pl-3">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {["Home", "About", "Projects", "Skills", "Contact"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="px-3 py-1.5 rounded-full hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <BookCallDialog>
          <button className="text-sm px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
            Book a call
          </button>
        </BookCallDialog>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-16 text-center px-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-orb hero-orb--pink" />
        <div className="hero-orb hero-orb--cyan" />
        <div className="hero-orb hero-orb--emerald" />
      </div>
      <img
        src={avatar}
        alt="AI developer avatar"
        width={140}
        height={140}
        className="mx-auto rounded-full border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] ring-2 ring-cyan-400/10 animate-pulse"
      />
      <h1 className="mt-6 text-4xl md:text-5xl font-bold">
        Hi, I'm{' '}
        <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent shadow-[0_0_18px_rgba(168,85,247,0.35)] animate-pulse">
          Alex Carter
        </span>
      </h1>
      <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-400 blur-xl opacity-80" />
      <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-7">
        Fullstack AI Developer &mdash; Gene AI, n8n, RAG, AWS Bedrock, AI Voice Agents and AI SaaS developer with 8+ years building production-ready systems. I design AI agents, RAG pipelines, and voice bots that scale and deliver measurable ROI.
      </p>

      <div className="mt-10 max-w-xl mx-auto glow-card rounded-3xl p-6 text-left transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(59,130,246,0.25)]">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground mb-3">Let's explore how I can help your project ✨</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Roadmap', 'Pricing', 'Past results', 'Contact'].map((t) => (
              <button
                key={t}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary/60 border border-border hover:border-primary/50 transition"
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-background/50 border border-border px-4 py-3">
            <Brain className="w-4 h-4 text-primary" />
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Type your question…"
            />
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-emerald-400 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-fuchsia-500/20 transition duration-300 hover:scale-[1.04] hover:shadow-[0_0_26px_rgba(168,85,247,0.35)] animate-pulse">
              Ask →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-3">What I build</p>
          <h3 className="text-2xl font-semibold text-white mb-4">AI systems that work in production</h3>
          <p className="text-sm text-muted-foreground leading-7">
            I create real-world AI solutions for businesses, from voice bots and agents to RAG SaaS workflows.
          </p>
          <div className="mt-8 grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-slate-900/70 p-4 transition hover:border-primary/60 hover:bg-slate-800/80">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Design</p>
                <p className="text-sm text-white">Intelligent UX for AI workflows</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-slate-900/70 p-4 transition hover:border-cyan-400/60 hover:bg-slate-800/80">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Approach</p>
                <p className="text-sm text-white">Data-driven, production-ready AI</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="group rounded-3xl border border-border/70 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:border-primary/70">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 group-hover:bg-violet-500/15 transition">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">AI Agents</p>
                  <h4 className="text-lg font-semibold text-white">Agents & Voice Bots</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-6">
                CrewAI, AutoGen, Amazon Polly, Deepgram, and conversational workflows for powerful automation.
              </p>
            </div>
            <div className="group rounded-3xl border border-border/70 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:border-cyan-400/70">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-300 group-hover:bg-cyan-500/15 transition">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">RAG</p>
                  <h4 className="text-lg font-semibold text-white">Knowledge & Retrieval</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-6">
                LangChain, LlamaIndex, Pinecone, FAISS, ChromaDB — end-to-end retrieval and memory systems.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="group rounded-3xl border border-border/70 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:border-emerald-400/70">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-300 group-hover:bg-emerald-500/15 transition">
                  <Link2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Automation</p>
                  <h4 className="text-lg font-semibold text-white">SaaS & Workflows</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-6">
                n8n, Zapier, Make, and API-first integrations designed to automate real business work.
              </p>
            </div>
            <div className="group rounded-3xl border border-border/70 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:border-orange-400/70">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500/10 text-orange-300 group-hover:bg-orange-500/15 transition">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Scale</p>
                  <h4 className="text-lg font-semibold text-white">Cloud Deployment</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-6">
                AWS Bedrock, Lambda, Docker, Kubernetes and CI/CD pipelines for scalable AI delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 rounded-3xl border border-border/70 bg-slate-950/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-2">Profile highlights</p>
          <p className="text-sm text-muted-foreground leading-6">
            8+ years building AI-driven SaaS, voice agents, RAG systems, and cloud-scale products with a focus on ROI and reliability.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-900/70 px-4 py-3 text-sm text-white border border-border/60">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Domain</p>
            AI, SaaS, RAG, voice
          </div>
          <div className="rounded-2xl bg-slate-900/70 px-4 py-3 text-sm text-white border border-border/60">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Impact</p>
            Faster workflows, smarter automation
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.2em] text-muted-foreground">PORTFOLIO</p>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-3">
          A curated selection of AI projects that show my range and craft.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <article key={p.title} className="glow-card rounded-3xl p-5 hover:glow-card-hover group">
            <div className="flex items-start justify-between text-xs text-muted-foreground mb-3">
              <span>0{i + 1} — CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            <div className="rounded-2xl overflow-hidden border border-border">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={800}
                height={400}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] tracking-wider px-2 py-1 rounded-md bg-secondary/60 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="text-center mt-10">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          Explore all projects on GitHub <Github className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 py-16 text-center">
      <p className="text-xs tracking-[0.2em] text-muted-foreground">TECH STACK</p>
      <h2 className="text-4xl md:text-5xl font-bold mt-2">
        My <span className="text-gradient">Skills</span>
      </h2>
      <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
        The tools and technologies I use to bring AI products to life.
      </p>
      <div className="mt-10 flex justify-center scale-150">
        <SkillSphere />
      </div>
    </section>
  );
}

function Explore() {
  const cards = [
    {
      icon: BookOpen,
      label: "Writing",
      desc: "Notes on AI engineering, RAG and agents.",
      color: "text-primary",
    },
    {
      icon: Trophy,
      label: "Achievements",
      desc: "Talks, hackathons and publications.",
      color: "text-accent",
    },
    {
      icon: Link2,
      label: "Connect",
      desc: "Find me across the web and reach out.",
      color: "text-primary",
    },
  ];
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-center">
      <h2 className="text-4xl md:text-5xl font-bold">
        More to <span className="text-gradient">Explore</span>
      </h2>
      <p className="text-sm text-muted-foreground mt-3">
        Other corners of my work and ways to connect.
      </p>
      <div className="grid md:grid-cols-3 gap-5 mt-10 text-left">
        {cards.map((c) => (
          <div key={c.label} className="glow-card rounded-3xl p-6">
            <c.icon className={`w-6 h-6 ${c.color}`} />
            <h3 className="font-semibold mt-3">{c.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            <p className="text-sm text-primary mt-4">Explore →</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 py-16">
      <div className="glow-card rounded-3xl p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Let's build <span className="text-gradient">something intelligent</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
          Open to AI engineering roles, consulting, and ambitious collaborations.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            <Mail className="w-4 h-4" /> hello@example.com
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm hover:bg-secondary/60 transition"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm hover:bg-secondary/60 transition"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">
        © 2026 Alex Carter — Built with care.
      </p>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Explore />
      <Contact />
    </main>
  );
}
