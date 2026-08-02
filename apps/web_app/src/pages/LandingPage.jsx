import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

/* ---- Development Team Members ---- */
const TEAM_MEMBERS = [
  {
    id: 1,
    initial: 'AA',
    name: 'Ayush Agarwal',
    isLead: true,
    leadBadge: 'Team Lead & Core Architect',
    role: 'AI Software Engineer & Full-Stack AI Developer',
    bio: 'Designed and developed production-grade AI systems powering LexAI, including the Hybrid RAG retrieval pipeline, FastAPI backend, cloud deployment, and AI workflow orchestration. Passionate about building scalable AI applications that solve real-world problems through intelligent automation.',
    github: 'https://github.com/Ayush99392003',
    linkedin: 'https://www.linkedin.com/in/ayush20039939',
    portfolio: 'https://portfolio-bkco-1u0gliofd-ayush99392003s-projects.vercel.app/',
    email: 'ayush20039939@gmail.com',
    contributions: ['AI/ML & Hybrid RAG', 'FastAPI & Cloud', 'Full-Stack & Agents'],
  },
  {
    id: 2,
    initial: 'NS',
    name: 'Nyasa Singh',
    isLead: false,
    role: 'AI Engineer & NLP Developer',
    bio: 'AI Engineer focused on building intelligent legal technologies using NLP, speech recognition, retrieval-augmented systems, and knowledge graphs for faster and more accurate legal assistance.',
    github: 'https://github.com/Nyasa11',
    linkedin: 'https://www.linkedin.com/in/nyasa-singh-29260a229/',
    portfolio: null,
    email: 'nyasasingh11@gmail.com',
    contributions: ['AI & NLP', 'Speech Recognition', 'Knowledge Graphs'],
  },
  {
    id: 3,
    initial: 'VV',
    name: 'Vartika Vashishtha',
    isLead: false,
    role: 'Frontend & Flutter Developer',
    bio: 'Frontend and Flutter Developer contributing to LexAI, an AI-powered LegalTech platform, building responsive mobile and web interfaces for intelligent legal assistance.',
    github: 'https://github.com/Vartika1612',
    linkedin: 'https://www.linkedin.com/in/vartika-vashishtha-721704330/',
    portfolio: null,
    email: 'vartikavashishtha48@gmail.com',
    contributions: ['Chatbot UI & Auth', 'Dashboards', 'Flutter Mobile App'],
  },
  {
    id: 4,
    initial: 'AJ',
    name: 'Aldrin Joan Pandian W',
    isLead: false,
    role: 'AI & Multi-Agent Systems Engineer',
    bio: 'AI Engineer specializing in Natural Language Processing, Machine Learning, Generative AI (LLM fine-tuning), Multi-Agent Systems, LangChain/LangGraph, and full-stack mobile & web development.',
    github: 'https://github.com/Aldrin-Joan',
    linkedin: 'http://www.linkedin.com/in/aldrin-joan-pandian-w-08215028a',
    portfolio: null,
    email: 'aldrinjoan6@gmail.com',
    contributions: ['Generative AI & LLMs', 'Multi-Agent Systems', 'LangGraph & FastMCP'],
  },
  {
    id: 5,
    initial: 'AS',
    name: 'Anushka Sarviya',
    isLead: false,
    role: 'AI & Backend Developer',
    bio: 'AI and Backend Developer contributing to LexAI, building intelligent retrieval-augmented systems, backend APIs, and document intelligence solutions to provide accurate legal assistance through LLMs and semantic search.',
    github: 'https://github.com/AnushkaSarviya',
    linkedin: 'https://www.linkedin.com/in/anushkasarviya/',
    portfolio: null,
    email: 'anushkasarviya@gmail.com',
    contributions: ['Retrieval RAG & APIs', 'Semantic Search', 'Document Intelligence'],
  },
];

const CLIENT_FEATURES = [
  {
    icon: '⚖️',
    title: 'AI Legal Research',
    desc: 'Instant answers grounded in 50K+ Supreme Court judgements, IPC, CrPC, and Constitutional statutes.',
  },
  {
    icon: '🛡️',
    title: 'Verified Advocate Network',
    desc: 'Connect directly with Bar Council-verified advocates filtered by domain and expertise.',
  },
  {
    icon: '📊',
    title: 'Live Case Timeline',
    desc: 'Track your consultation request from submission through advice delivery in real-time.',
  },
  {
    icon: '🔒',
    title: 'Encrypted Document Vault',
    desc: 'Your legal documents and conversations are protected with AES-256 encryption.',
  },
];

const ADVOCATE_FEATURES = [
  {
    icon: '📥',
    title: 'Targeted Inquiries',
    desc: 'Receive consultation requests from verified clients matched to your practice domains.',
  },
  {
    icon: '🤖',
    title: 'AI Brief Engine',
    desc: 'Generate case briefs, precedent citations, and statute summaries in seconds with LexAI.',
  },
  {
    icon: '📋',
    title: 'Stage Management',
    desc: 'Manage case workflow from review through advice delivery with a clean dashboard.',
  },
  {
    icon: '💬',
    title: 'Direct Encrypted Inbox',
    desc: 'Communicate securely with clients and peers via the end-to-end encrypted inbox.',
  },
];

const HOW_STEPS = [
  {
    step: '01',
    emoji: '🔍',
    title: 'Ask Your Legal Question',
    desc: 'Search using natural language. LexAI instantly retrieves relevant statutes, case law, and precedents.',
  },
  {
    step: '02',
    emoji: '🤝',
    title: 'Connect with an Advocate',
    desc: 'Find and consult a verified advocate for your specific domain and get professional legal advice.',
  },
  {
    step: '03',
    emoji: '📈',
    title: 'Track Your Case',
    desc: 'Monitor every stage of your consultation — from submission to final legal advice delivery.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef([]);

  /* ---- Navbar scroll effect ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Scroll-reveal (IntersectionObserver) ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* ====================================================
          TOP NAVBAR
          ==================================================== */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navBrand}>
          <span className={styles.navLogo}>⚖️</span>
          <span className={styles.navWordmark}>LexAI</span>
        </div>

        <ul className={styles.navLinks}>
          <li><a href="#features">Features</a></li>
          <li><a href="#clients">For Clients</a></li>
          <li><a href="#advocates">For Advocates</a></li>
          <li><a href="#team">Team</a></li>
        </ul>

        <div className={styles.navActions}>
          <button
            className={styles.btnGhost}
            onClick={() => navigate('/auth')}
          >
            Sign In
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate('/auth')}
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* ====================================================
          HERO SECTION
          ==================================================== */}
      <section className={styles.hero} id="home">
        <div className={styles.heroBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>

        <div className={styles.heroInner}>
          {/* Left — Text */}
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>
              <span>⚡</span> Powered by Hybrid RAG · Indian Legal Intelligence
            </div>

            <h1 className={styles.heroTitle}>
              AI-Powered Legal{' '}
              <span className={styles.heroTitleGold}>Intelligence</span>
              {' '}for Every Indian
            </h1>

            <p className={styles.heroSub}>
              Grounded in 25,000+ legal PDF documents, IPC, CrPC, and the
              Constitution. Instant AI legal research. Connect with advocates. One platform.
            </p>

            <div className={styles.heroCtas}>
              <button
                className={styles.ctaPrimary}
                onClick={() => navigate('/auth')}
              >
                ⚖️ Start Legal Research
              </button>
              <button
                className={styles.ctaSecondary}
                onClick={() => navigate('/lawyer-auth')}
              >
                I'm an Advocate →
              </button>
            </div>

            <div className={styles.statStrip}>
              <div className={styles.stat}>
                <span className={styles.statNum}>25K+</span>
                <span className={styles.statLabel}>Legal PDFs Indexed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>&lt;1s</span>
                <span className={styles.statLabel}>RAG Response</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>256-bit</span>
                <span className={styles.statLabel}>Encryption</span>
              </div>
            </div>
          </div>

          {/* Right — Floating Scales Graphic */}
          <div className={styles.heroRight}>
            <div className={styles.heroGraphic}>
              <div className={styles.heroGraphicRing} />
              <div className={styles.heroGraphicRing2} />
              <svg
                className={styles.heroScalesSvg}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pillar */}
                <rect x="97" y="40" width="6" height="130" rx="3" fill="#FBBF24" opacity="0.9" />
                {/* Base */}
                <rect x="60" y="168" width="80" height="5" rx="2.5" fill="#FBBF24" opacity="0.7" />
                {/* Beam */}
                <rect x="20" y="60" width="160" height="4" rx="2" fill="#FBBF24" opacity="0.85" />
                {/* Top ornament */}
                <circle cx="100" cy="42" r="7" fill="#FBBF24" opacity="0.9" />

                {/* Left pan group */}
                <g style={{ animation: 'hero-tip-left 3s ease-in-out infinite', transformOrigin: '45px 82px' }}>
                  <line x1="35" y1="62" x2="28" y2="105" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <line x1="55" y1="62" x2="62" y2="105" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <ellipse cx="45" cy="107" rx="22" ry="6" stroke="#FBBF24" strokeWidth="2.5" fill="rgba(251,191,36,0.08)" />
                </g>

                {/* Right pan group */}
                <g style={{ animation: 'hero-tip-right 3s ease-in-out infinite', transformOrigin: '155px 82px' }}>
                  <line x1="145" y1="62" x2="138" y2="105" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <line x1="165" y1="62" x2="172" y2="105" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <ellipse cx="155" cy="107" rx="22" ry="6" stroke="#FBBF24" strokeWidth="2.5" fill="rgba(251,191,36,0.08)" />
                </g>

                {/* Glow circles */}
                <circle cx="100" cy="100" r="88" stroke="rgba(251,191,36,0.05)" strokeWidth="1" />
                <circle cx="100" cy="100" r="70" stroke="rgba(251,191,36,0.04)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Hero pan animations injected via style tag */}
      <style>{`
        @keyframes hero-tip-left {
          0%,100% { transform: translateY(0); }
          40%      { transform: translateY(14px); }
          70%      { transform: translateY(-4px); }
        }
        @keyframes hero-tip-right {
          0%,100% { transform: translateY(0); }
          40%      { transform: translateY(-14px); }
          70%      { transform: translateY(4px); }
        }
      `}</style>

      {/* ====================================================
          STATS STRIP
          ==================================================== */}
      <div className={styles.statsSection} id="features">
        <div className={styles.statsInner}>
          {[
            { num: '25,000+', label: 'Legal PDF Documents Indexed' },
            { num: 'Hybrid',  label: 'RAG + Statute Search Engine' },
            { num: '<1s',     label: 'Average AI Response Time' },
            { num: 'AES-256', label: 'Encryption for All Documents' },
          ].map((s) => (
            <div key={s.num} className={`${styles.statCard} ${styles.reveal}`}>
              <div className={styles.statCardNum}>{s.num}</div>
              <div className={styles.statCardLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          DUAL VALUE PROPOSITION
          ==================================================== */}
      <section className={styles.section} id="clients">
        <div className={styles.sectionInner}>
          <div className={`${styles.reveal}`}>
            <div className={styles.sectionEyebrow}>⚡ Built For Everyone</div>
            <h2 className={styles.sectionTitle}>
              One Platform. Two Powerful Sides.
            </h2>
            <p className={styles.sectionSub}>
              Whether you need legal clarity or professional case management —
              LexAI delivers precision at every step.
            </p>
          </div>

          <div className={styles.dualGrid}>
            {/* For Clients */}
            <div
              className={`${styles.dualPanel} ${styles.reveal}`}
              id="clients"
            >
              <div className={styles.dualPanelLabel}>👤 For Legal Seekers</div>
              <div className={styles.dualPanelTitle}>
                Instant Legal Clarity, On Demand
              </div>
              <ul className={styles.featureList}>
                {CLIENT_FEATURES.map((f) => (
                  <li key={f.title} className={styles.featureItem}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    <div className={styles.featureText}>
                      <span className={styles.featureTitle}>{f.title}</span>
                      <span className={styles.featureDesc}>{f.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className={styles.ctaPrimary}
                style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
                onClick={() => navigate('/auth')}
              >
                Start Free Research →
              </button>
            </div>

            {/* For Advocates */}
            <div
              className={`${styles.dualPanel} ${styles.reveal}`}
              id="advocates"
            >
              <div className={styles.dualPanelLabel}>⚖️ For Advocates</div>
              <div className={styles.dualPanelTitle}>
                Supercharge Your Legal Practice
              </div>
              <ul className={styles.featureList}>
                {ADVOCATE_FEATURES.map((f) => (
                  <li key={f.title} className={styles.featureItem}>
                    <span className={styles.featureIcon}>{f.icon}</span>
                    <div className={styles.featureText}>
                      <span className={styles.featureTitle}>{f.title}</span>
                      <span className={styles.featureDesc}>{f.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className={styles.ctaSecondary}
                style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
                onClick={() => navigate('/lawyer-auth')}
              >
                Join as Advocate →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          HOW IT WORKS
          ==================================================== */}
      <section className={styles.section} style={{ paddingTop: '2rem' }}>
        <div className={styles.sectionInner}>
          <div className={`${styles.reveal}`}>
            <div className={styles.sectionEyebrow}>🔄 Workflow</div>
            <h2 className={styles.sectionTitle}>How LexAI Works</h2>
            <p className={styles.sectionSub}>
              From question to qualified advice in three seamless steps.
            </p>
          </div>

          <div className={styles.howGrid}>
            {HOW_STEPS.map((s, i) => (
              <div
                key={s.step}
                className={`${styles.howCard} ${styles.reveal}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className={styles.howStep}>{s.step}</div>
                <span className={styles.howEmoji}>{s.emoji}</span>
                <div className={styles.howTitle}>{s.title}</div>
                <p className={styles.howDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          DEVELOPMENT TEAM
          ==================================================== */}
      <section className={styles.teamSection} id="team">
        <div className={styles.sectionInner}>
          <div className={`${styles.reveal}`}>
            <div className={styles.sectionEyebrow}>👨‍💻 The Builders</div>
            <h2 className={styles.sectionTitle}>
              Meet the Development Team
            </h2>
            <p className={styles.sectionSub}>
              Engineers and legal technologists powering LexAI's AI retrieval, backend services, and multi-platform legal intelligence workspace.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.id}
                className={`${styles.flipCard} ${member.isLead ? styles.leadFlipCard : ''} ${styles.reveal}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={styles.flipInner}>
                  {/* Front */}
                  <div className={`${styles.flipFront} ${member.isLead ? styles.leadFront : ''}`}>
                    {member.isLead && (
                      <div className={styles.leadTag}>⭐ Team Lead & Core Architect</div>
                    )}
                    <div className={`${styles.teamAvatar} ${member.isLead ? styles.leadAvatar : ''}`}>
                      {member.initial}
                    </div>
                    <div className={styles.teamName}>{member.name}</div>
                    <div className={styles.teamRole}>{member.role}</div>

                    {member.contributions && (
                      <div className={styles.tagChips}>
                        {member.contributions.map((chip, idx) => (
                          <span key={idx} className={styles.tagChip}>{chip}</span>
                        ))}
                      </div>
                    )}

                    <div className={styles.teamHoverHint}>hover for bio & links</div>
                  </div>

                  {/* Back */}
                  <div className={`${styles.flipBack} ${member.isLead ? styles.leadBack : ''}`}>
                    <div className={styles.teamName}>{member.name}</div>
                    <div className={styles.teamRole}>{member.role}</div>
                    <p className={styles.teamBio}>{member.bio}</p>
                    <div className={styles.teamLinks}>
                      {member.github && (
                        <a
                          href={member.github}
                          className={styles.teamLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🐙 GitHub
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className={styles.teamLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          💼 LinkedIn
                        </a>
                      )}
                      {member.portfolio && (
                        <a
                          href={member.portfolio}
                          className={styles.teamLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🌐 Portfolio
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className={styles.teamLink}
                        >
                          ✉️ Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          FOOTER
          ==================================================== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>⚖️ LexAI Legal Intelligence</div>
          <div className={styles.footerLinks}>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#team">Team</a>
            <a href="/auth">Sign In</a>
          </div>
          <div className={styles.footerCopy}>
            © {new Date().getFullYear()} LexAI. All rights reserved.
          </div>
        </div>
        <div className={styles.footerDisclaimer}>
          LexAI is an AI-assisted legal research platform and does not constitute legal advice.
          All advocate profiles are independently verified. LexAI complies with Bar Council of
          India guidelines regarding legal information dissemination. For official legal advice,
          consult a qualified advocate registered with the Bar Council of India.
        </div>
      </footer>
    </div>
  );
}
