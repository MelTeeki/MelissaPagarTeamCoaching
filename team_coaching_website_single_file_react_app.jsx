import React, { useMemo, useState, useEffect } from "react";

/**
 * Team Coaching Website – Single‑File React App
 * - TailwindCSS classes for styling (no external CSS needed here)
 * - Lightweight client-side routing via state (no external router)
 * - Pages:
 *    1) Home (UVP, Teams Served, Pain Points, Outcomes)
 *    2) What Team Coaching Looks Like
 *    3) Tools (Team Building, Training, Consulting, Mentoring, Facilitation, Coaching)
 *    4) ICF Team Coaching Competencies
 *    5) Teams vs Groups
 * - Clean, modern, accessible UI with semantic HTML
 */

const NAV = [
  { key: "home", label: "Home" },
  { key: "looks", label: "What Coaching Looks Like" },
  { key: "tools", label: "Tools" },
  { key: "assess", label: "Assessments" },
  { key: "icf", label: "ICF Competencies" },
  { key: "compare", label: "Teams vs Groups" },
];

const BRAND = {
  name: "Melissa Pagar Team Coaching",
  colors: {
    primary: "#7a2131", // burgundy
    accent: "#c7a34b", // soft gold
    dark: "#0f0f10",
    light: "#faf8f7",
  },
  fonts: {
    head: "'Playfair Display', ui-serif, Georgia, serif",
    body: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
  },
};

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium shadow-sm">
    {children}
  </span>
);

const LogoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="MP monogram" className="shrink-0">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={BRAND.colors.accent} />
        <stop offset="100%" stopColor="#e9d6a3" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill={BRAND.colors.primary} />
    <path d="M20 42V22h6l6 8 6-8h6v20h-6V31l-6 8-6-8v11z" fill="url(#g)" />
  </svg>
);

function Seo({ title, description, image }) {
  const fullTitle = title ? `${title} • ${BRAND.name}` : BRAND.name;
  const desc = description ||
    "Practical, ethical team coaching for high‑trust, high‑performance teams—grounded in ICF competencies.";
  const img = image || "https://dummyimage.com/1200x630/7a2131/c7a34b&text=Melissa+Pagar+Team+Coaching";

  useEffect(() => {
    document.title = fullTitle;
    const ensure = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}='${name}']`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    ensure("description", desc);
    ensure("og:title", fullTitle, "property");
    ensure("og:description", desc, "property");
    ensure("og:type", "website", "property");
    ensure("og:image", img, "property");
    ensure("twitter:card", "summary_large_image");
    ensure("twitter:title", fullTitle);
    ensure("twitter:description", desc);
    ensure("twitter:image", img);
  }, [fullTitle, desc, img]);
  return null;
}

const SectionCard = ({ title, subtitle, children, icon }) => (
  <section className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
    <div className="mb-4 flex items-start gap-3">
      {icon ? <div className="text-xl">{icon}</div> : null}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
        )}
      </div>
    </div>
    <div className="prose prose-zinc max-w-none text-zinc-800">{children}</div>
  </section>
);

const List = ({ items }) => (
  <ul className="grid list-disc gap-2 pl-5 sm:grid-cols-2">
    {items.map((it, idx) => (
      <li key={idx} className="marker:text-zinc-400">{it}</li>
    ))}
  </ul>
);

const Accordion = ({ groups }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {groups.map((g, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-2xl border bg-white/70 shadow-sm">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold">{g.title}</span>
              <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 px-5 pb-5">
                <div className="prose prose-zinc max-w-none">
                  {g.intro && <p className="text-zinc-700">{g.intro}</p>}
                  {g.items && (
                    <ul className="list-disc pl-5">
                      {g.items.map((x, xi) => (
                        <li key={xi} className="mb-1">{x}</li>
                      ))}
                    </ul>
                  )}
                  {g.cta && (
                    <div className="mt-4">
                      <a href="#contact" className="inline-flex items-center rounded-xl border bg-black px-4 py-2 font-medium text-white hover:bg-zinc-800">
                        {g.cta}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function HomePage() {
  const teamsServed = [
    "Executive & senior leadership teams",
    "Cross-functional product squads",
    "Program/portfolio leadership teams",
    "Operational & service delivery teams",
    "Project launch / transformation teams",
    "Public sector & mission-driven teams",
  ];

  const painPoints = [
    "Unclear purpose, priorities, or roles",
    "Low psychological safety; limited candor",
    "Siloed decision-making and rework",
    "Unproductive conflict or passive agreement",
    "Meetings without outcomes or follow-through",
    "Stalled initiatives; slow time-to-value",
  ];

  const outcomes = [
    "Shared purpose, strategy, and decision rights",
    "High trust and healthy, constructive conflict",
    "Crisp operating rhythms & meeting hygiene",
    "Clear accountabilities and team agreements",
    "Faster, better decisions with visible ownership",
    "Measured progress tied to business impact",
  ];

  return (
    <div className="space-y-8">
      <SectionCard
        title="Team Coaching that Turns Potential into Performance"
        subtitle="Evidence-informed. Human-centered. Outcome-driven."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <p>
              I partner with intact teams to improve how they think, relate, and execute—so the business moves faster and people 
              thrive. Through a blend of {" "}
              <strong>team coaching, facilitation, and targeted capability-building</strong>, we address the real work in real time.
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill>Psychological Safety</Pill>
              <Pill>Decision Quality</Pill>
              <Pill>Alignment</Pill>
              <Pill>Execution</Pill>
              <Pill>Accountability</Pill>
            </div>
            <div className="pt-2">
              <a href="#contact" className="inline-flex items-center rounded-xl px-5 py-3 font-medium text-white shadow hover:opacity-95" style={{ backgroundColor: BRAND.colors.primary }}>Book a Discovery Call</a>
            </div>
          </div>
          <aside className="rounded-2xl border bg-zinc-50 p-5">
            <h4 className="mb-2 text-sm font-semibold tracking-wide text-zinc-600">
              Unique Value Proposition
            </h4>
            <p className="text-zinc-800">
              <strong>We coach the system, not just the individuals.</strong> Your team learns to diagnose itself, make better 
              commitments, and sustain performance improvements—long after the engagement ends.
            </p>
          </aside>
        </div>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Teams I Work With">
          <List items={teamsServed} />
        </SectionCard>
        <SectionCard title="Typical Problems I Help Solve (Pain Points)">
          <List items={painPoints} />
        </SectionCard>
      </div>

      <SectionCard title="Outcomes You Can Expect">
        <List items={outcomes} />
      </SectionCard>

      <SectionCard title="Engagement Flow" subtitle="A clear path from scoping to sustained change">
        <ol className="grid gap-4 pl-5 [counter-reset:step]">
          {[
            {
              h: "Discovery & Contracting",
              p: "Clarify purpose, stakeholders, scope, success criteria, and ethical boundaries.",
            },
            {
              h: "Diagnostics & Goal Setting",
              p: "Lightweight assessments + interviews; co-create team goals & working agreements.",
            },
            {
              h: "Live Team Coaching",
              p: "Coach during real work—decision forums, planning, retros—so new habits stick.",
            },
            {
              h: "Targeted Capability Building",
              p: "Micro-trainings on essentials (e.g., decision rights, feedback, conflict).",
            },
            {
              h: "Measure & Sustain",
              p: "Pulse metrics, behavior checks, and embed rituals; transition to self-coaching.",
            },
          ].map((step, i) => (
            <li key={i} className="relative rounded-xl border bg-white/70 p-4 shadow-sm">
              <span className="absolute -left-3 -top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white shadow">
                {i + 1}
              </span>
              <h5 className="mb-1 font-semibold">{step.h}</h5>
              <p className="text-sm text-zinc-700">{step.p}</p>
            </li>
          ))}
        </ol>
      </SectionCard>

      <ContactBlock />
    </div>
  );
}

function LooksLikePage() {
  const sampleAgenda = [
    { time: "0:00–0:10", item: "Opening, purpose, and check-in" },
    { time: "0:10–0:25", item: "Review of working agreements & progress on goals" },
    { time: "0:25–1:05", item: "Coach the real work (e.g., decision, conflict, planning)" },
    { time: "1:05–1:20", item: "Micro-teach (e.g., feedback, decision rights)" },
    { time: "1:20–1:30", item: "Commitments, measures, and close" },
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="What Team Coaching Looks Like" subtitle="Real conversations, real work, real outcomes—guided with intention and ethics">
        <p>
          A typical session blends observation, inquiry, and timely interventions while the team works on its real priorities. 
          We use data (agreements, roles, decisions, dynamics) to help the team see itself and choose better ways of working.
        </p>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Example 90‑Minute Session">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2">Time</th>
                <th className="py-2">Focus</th>
              </tr>
            </thead>
            <tbody>
              {sampleAgenda.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 align-top font-medium">{r.time}</td>
                  <td className="py-2 align-top">{r.item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
        <SectionCard title="Coaching Moves You’ll Experience">
          <List
            items={[
              "Contracting in the moment: naming purpose and outcomes",
              "Surfacing patterns: who speaks, how decisions land, where energy drops",
              "Inviting differing perspectives; building psychological safety",
              "Making work visible: roles, decision rights, interdependencies",
              "Testing commitments and clarifying next steps",
            ]}
          />
        </SectionCard>
      </div>

      <SectionCard title="Cadence & Duration">
        <p>
          Most engagements run <strong>8–16 weeks</strong> with bi‑weekly sessions, inter-session nudges, and pulse measures. 
          We customize frequency for your context and business rhythm.
        </p>
      </SectionCard>

      <ContactBlock />
    </div>
  );
}

function ToolsPage() {
  const groups = [
    {
      title: "Team Building Activities",
      intro:
        "Energizers and connection rituals that strengthen trust and identity—without the trust fall cringe.",
      items: [
        "Values mapping and team chartering",
        "Story circles for origin & purpose",
        "Strengths constellation (visual map of superpowers)",
        "Appreciation round + specific feedback prompts",
      ],
      cta: "Request a Sample Agenda",
    },
    {
      title: "Team Training Activities",
      intro:
        "Targeted micro‑workshops to build shared skills that unlock performance.",
      items: [
        "Decision rights & operating rhythms",
        "Constructive conflict & feedback loops",
        "Prioritization and portfolio flow",
        "Meeting hygiene and facilitation basics",
      ],
      cta: "See the Micro‑Workshop List",
    },
    {
      title: "Team Consulting",
      intro:
        "When you need a faster diagnostic or artifacts: we design operating models, role clarity, and 
        decision frameworks with your leaders—then help the team adopt them.",
      items: [
        "Org and role mapping",
        "Decision frameworks (e.g., RAPID, RACI variants)",
        "Team operating rhythm design",
      ],
      cta: "Discuss a Diagnostic Sprint",
    },
    {
      title: "Team Mentoring",
      intro:
        "Advising team leads on leading the system (not just individuals).",
      items: [
        "Leader shadowing and debrief",
        "1:1 support for tough conversations",
        "On‑the‑job practice plans",
      ],
      cta: "Add Leader Mentoring",
    },
    {
      title: "Team Facilitation",
      intro:
        "Neutral process leadership for high‑stakes sessions (strategy, planning, retrospectives).",
      items: [
        "Strategy offsites and OKR alignment",
        "Quarterly planning & prioritization",
        "Retrospectives and after‑action reviews",
      ],
      cta: "Book a Facilitated Session",
    },
    {
      title: "Team Coaching",
      intro:
        "The core of our work: sustained, systemic coaching as the team tackles its real work.",
      items: [
        "Contracting and shared goals",
        "Observe → reflect → experiment cycles",
        "Pulse measures and behavior checks",
        "Sustainment plan and transition to self‑coaching",
      ],
      cta: "Start Team Coaching",
    },
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="Tools & Modalities" subtitle="We meet the team where it is—then choose the lightest‑weight intervention that moves performance">
        <p>
          We blend coaching with facilitation and capability building. Below are the core modalities and example activities. 
          We’ll co‑design the right mix for your team’s goals, maturity, and constraints.
        </p>
      </SectionCard>

      <Accordion groups={groups} />

      <ContactBlock />
    </div>
  );
}

function AssessmentsPage() {
  const approaches = [
    {
      name: "Lightweight Pulse (No-Cost)",
      bullets: [
        "5–8 item survey on trust, clarity, and execution",
        "Run bi‑weekly to spot trends; share results transparently",
        "Co‑create experiments based on what the data suggests",
      ],
    },
    {
      name: "360° Team Maturity Snapshot",
      bullets: [
        "Short interview set with leader, sponsor, and 3–5 members",
        "Maps strengths/gaps across purpose, roles, decision rights, ways of working",
        "Produces a one‑page heatmap to prioritize focus areas",
      ],
    },
    {
      name: "Validated Instruments (On Request)",
      bullets: [
        "Use established tools when helpful and appropriate",
        "Combine with observation of real meetings for context",
        "Always contract for ethics, consent, and data usage",
      ],
    },
  ];

  const samplePulse = [
    "We have a clear, shared purpose that guides our priorities.",
    "Decision rights are explicit; we know who decides and how.",
    "We speak candidly about risks and concerns.",
    "Meetings produce clear outcomes, owners, and timelines.",
    "We follow through on commitments and review results.",
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="Assessments" subtitle="Right‑sized data that informs action—not binders of reports that sit on shelves">
        <p>
          We use assessment as a <strong>means</strong> to accelerate change, not an end. Our approach blends quick pulses, focused
          interviews, and (when useful) validated instruments. We prioritize transparency, informed consent, and practical
          insights that teams can act on immediately.
        </p>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-3">
        {approaches.map((a, i) => (
          <SectionCard key={i} title={a.name}>
            <ul className="list-disc pl-5">
              {a.bullets.map((b, bi) => (
                <li key={bi} className="mb-1">{b}</li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Sample Pulse Items" subtitle="Use 5–8 items, same scale weekly/bi‑weekly; discuss results together">
        <ul className="list-disc pl-5">
          {samplePulse.map((q, i) => (
            <li key={i} className="mb-1">{q}</li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Data Ethics & Psychological Safety">
          <ul className="list-disc pl-5">
            <li>Contract for purpose, scope, confidentiality, and data access.</li>
            <li>Use team‑level reporting; avoid member ranking or blame.</li>
            <li>Share results with the full team and co‑decide next steps.</li>
          </ul>
        </SectionCard>
        <SectionCard title="Deliverables You’ll Receive">
          <ul className="list-disc pl-5">
            <li>One‑page heatmap of strengths and focus areas.</li>
            <li>Top 3 hypotheses + suggested experiments.</li>
            <li>Baseline → pulse tracker for visible progress.</li>
          </ul>
        </SectionCard>
      </div>

      <ContactBlock />
    </div>
  );
}

function ICFPage() {
  const competencies = [
    {
      name: "Demonstrates Ethical Practice (Team Context)",
      points: [
        "Maintains confidentiality and clarifies boundaries with the full team",
        "Contracts for roles, sponsorship, and shared responsibility",
      ],
    },
    {
      name: "Embodies a Coaching Mindset",
      points: [
        "Maintains presence and curiosity with the whole system",
        "Reflects and adapts based on system feedback and data",
      ],
    },
    {
      name: "Establishes and Maintains Agreements (Team)",
      points: [
        "Co‑creates team goals, norms, and working agreements",
        "Contracts in‑the‑moment as needs shift",
      ],
    },
    {
      name: "Cultivates Trust and Safety (Team)",
      points: [
        "Builds psychological safety for candor, dissent, and learning",
        "Honors diverse voices and shared accountability",
      ],
    },
    {
      name: "Maintains Presence (Team System)",
      points: [
        "Tracks patterns, energy, and dynamics across members",
        "Balances support and challenge for the whole",
      ],
    },
    {
      name: "Listens Actively (Across the System)",
      points: [
        "Surfaces beliefs, assumptions, and meaning‑making",
        "Listens for interdependencies, not just individuals",
      ],
    },
    {
      name: "Evokes Awareness (Team)",
      points: [
        "Uses data and reflection to help the team see itself",
        "Facilitates insight that leads to collective action",
      ],
    },
    {
      name: "Facilitates Client Growth (Team)",
      points: [
        "Supports experimentation and new habits between sessions",
        "Links behavior change to business outcomes",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="ICF Team Coaching Competencies" subtitle="Aligned with ICF Core Competencies, interpreted for a team‑as‑client context">
        <p>
          Team coaching builds on the ICF Core Competencies with specific attention to the team as a living system. Below are the 
          competency areas we emphasize and how they show up in practice.
        </p>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        {competencies.map((c, i) => (
          <SectionCard key={i} title={c.name}>
            <ul className="list-disc pl-5">
              {c.points.map((p, pi) => (
                <li key={pi} className="mb-1">{p}</li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>

      <ContactBlock />
    </div>
  );
}

function ComparePage() {
  const rows = [
    {
      dim: "Primary Purpose",
      team: "Deliver shared outcomes that require interdependence",
      group: "Coordinate individuals who may share information but own separate goals",
    },
    {
      dim: "Identity",
      team: "Clear, shared identity and purpose",
      group: "Loose affiliation; identity is individual‑centric",
    },
    {
      dim: "Decision Making",
      team: "Collective decisions with explicit decision rights",
      group: "Individual decisions; coordination when needed",
    },
    {
      dim: "Accountability",
      team: "Mutual accountability for collective results",
      group: "Individual accountability for personal outputs",
    },
    {
      dim: "Ways of Working",
      team: "Team agreements, operating rhythm, and roles",
      group: "Ad hoc norms; meeting‑by‑meeting",
    },
    {
      dim: "Coaching Focus",
      team: "The system (relationships, patterns, structures)",
      group: "Skills or topics of individuals in a cohort",
    },
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="Teams vs Groups" subtitle="Why team coaching is different—and when to use it">
        <p>
          Teams and groups aren’t the same. Team coaching treats the team as the client: success means better collective thinking, 
          relating, and execution. Use this table to clarify which you have and what support fits.
        </p>
      </SectionCard>

      <div className="overflow-hidden rounded-2xl border bg-white/70 p-4 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500">
              <th className="py-2">Dimension</th>
              <th className="py-2">Team</th>
              <th className="py-2">Group</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="py-3 align-top font-medium">{r.dim}</td>
                <td className="py-3 align-top">{r.team}</td>
                <td className="py-3 align-top">{r.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ContactBlock />
    </div>
  );
}

function ContactBlock() {
  const [form, setForm] = useState({ name: "", email: "", company: "", size: "", message: "" });
  const [status, setStatus] = useState("idle");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    // Placeholder submit – swap with your endpoint (Formspree/Typeform/Google Forms)
    try {
      setStatus("submitting");
      await new Promise((res) => setTimeout(res, 600));
      setStatus("success");
      setForm({ name: "", email: "", company: "", size: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="contact" className="rounded-2xl border p-6 shadow-sm" style={{ background: `linear-gradient(135deg, ${BRAND.colors.light}, #ffffff)` }}>
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <div>
          <h4 className="text-xl font-semibold" style={{ color: BRAND.colors.primary, fontFamily: BRAND.fonts.head }}>
            Ready to explore team coaching?
          </h4>
          <p className="mt-1 text-sm text-zinc-700" style={{ fontFamily: BRAND.fonts.body }}>
            Book a 25‑minute discovery call or send a note. We’ll align on goals, context, and a right‑sized first step.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center rounded-xl px-5 py-3 font-medium text-white hover:opacity-95" style={{ backgroundColor: BRAND.colors.primary }}>
              Book a Call
            </a>
            <a href="#" className="inline-flex items-center rounded-xl border px-5 py-3 font-medium hover:bg-zinc-50" style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }} style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}>
              Download One‑Pager
            </a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-zinc-600">Name*</label>
              <input name="name" value={form.name} onChange={onChange} className="w-full rounded-xl border px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm text-zinc-600">Email*
              </label>
              <input type="email" name="email" value={form.email} onChange={onChange} className="w-full rounded-xl border px-3 py-2" required />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-zinc-600">Company</label>
              <input name="company" value={form.company} onChange={onChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600">Team size</label>
              <input name="size" value={form.size} onChange={onChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600">Message*</label>
            <textarea name="message" value={form.message} onChange={onChange} rows={4} className="w-full rounded-xl border px-3 py-2" required />
          </div>
          <button type="submit" className="w-full rounded-xl px-4 py-2 font-semibold text-white" style={{ backgroundColor: BRAND.colors.primary }} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && <p className="text-sm" style={{ color: BRAND.colors.primary }}>Thanks! I’ll reply shortly.</p>}
          {status === "error" && <p className="text-sm text-red-600">Please complete required fields or try again.</p>}
        </form>
      </div>
    </div>
  );
}

export default function TeamCoachingSite() {
  const [route, setRoute] = useState("home");

  const Page = useMemo(() => {
    switch (route) {
      case "home":
        return <HomePage />;
      case "looks":
        return <LooksLikePage />;
      case "tools":
        return <ToolsPage />;
      case "assess":
        return <AssessmentsPage />;
      case "icf":
        return <ICFPage />;
      case "compare":
        return <ComparePage />;
      default:
        return <HomePage />;
    }
  }, [route]);

  return (
    <>
      <Seo />
      <main className="min-h-screen text-zinc-900" style={{ background: `linear-gradient(135deg, #ffffff, ${BRAND.colors.light})` }}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur" style={{ borderColor: BRAND.colors.accent }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <div>
                <h1 className="text-base font-bold leading-tight" style={{ fontFamily: BRAND.fonts.head, color: BRAND.colors.primary }}>
                  {BRAND.name}
                </h1>
                <p className="text-xs" style={{ color: BRAND.colors.accent }}>From potential → performance</p>
              </div>
            </div>
            <nav className="hidden gap-1 md:flex">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setRoute(n.key)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 ${
                    route === n.key ? "text-white" : ""
                  }`}
                  style={route === n.key ? { backgroundColor: BRAND.colors.primary } : undefined}
                >
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="rounded-xl border bg-white px-2 py-2 text-sm"
                aria-label="Navigate site"
              >
                {NAV.map((n) => (
                  <option key={n.key} value={n.key}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="border-b" style={{ background: `linear-gradient(135deg, ${BRAND.colors.light}, #ffffff)` }}>
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: BRAND.fonts.head, color: BRAND.colors.primary }}>
                Build a high‑trust, high‑performing team—on purpose.
              </h2>
              <p className="mt-3 max-w-2xl" style={{ color: '#3f3f46', fontFamily: BRAND.fonts.body }}>
                Practical, ethical team coaching for leaders who want better decisions, faster execution, and a culture where people do 
                their best work together.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-xl px-5 py-3 font-medium text-white shadow hover:opacity-95" style={{ backgroundColor: BRAND.colors.primary }}
                >
                  Start a Conversation
                </a>
                <button
                  onClick={() => setRoute("looks")}
                  className="inline-flex items-center rounded-xl border px-5 py-3 font-medium hover:bg-zinc-50" style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
                >
                  See a Sample Session
                </button>
              </div>
            </div>
            <aside className="rounded-2xl border bg-white/70 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide" style={{ color: '#52525b' }}>Quick Links</h3>
              <div className="mt-3 grid gap-2">
                <button onClick={() => setRoute("tools")} className="rounded-xl border bg-white px-3 py-2 text-left hover:bg-zinc-50">
                  Explore Tools & Modalities
                </button>
                <button onClick={() => setRoute("assess")} className="rounded-xl border bg-white px-3 py-2 text-left hover:bg-zinc-50">
                  Assessments
                </button>
                <button onClick={() => setRoute("icf")} className="rounded-xl border bg-white px-3 py-2 text-left hover:bg-zinc-50">
                  ICF Team Coaching Competencies
                </button>
                <button onClick={() => setRoute("compare")} className="rounded-xl border bg-white px-3 py-2 text-left hover:bg-zinc-50">
                  Teams vs Groups (Comparison)
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-6xl px-4 py-10">
          {Page}
        </div>

        {/* Footer */}
        <footer className="border-t" style={{ backgroundColor: '#fff' }}>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm md:flex-row">
            <p className="text-zinc-600">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#contact" className="rounded-lg border px-3 py-1 hover:bg-zinc-50" style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}>Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
