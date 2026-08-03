import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  ScalesIcon, BrainCircuitIcon, ShieldCheckIcon, SparkleIcon,
  BriefcaseIcon, FolderIcon, MessageIcon, ArrowRightIcon,
  ChevronDownIcon, LockIcon, UserIcon, GridIcon
} from '../components/Icons';
import styles from './InfoPage.module.css';

// Visual assets
import heroImg from '../assets/info/hero.png';
import techImg from '../assets/info/tech_stack.png';

export default function InfoPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const techStack = [
    {
      category: 'Frontend Web App',
      icon: '⚡',
      badge: 'React 18 + Vite',
      desc: 'High-performance SPA built with React 18, Vite, React Router 6, custom glassmorphism design system, and HTML5 Canvas interactive particle animation engine.',
      items: ['React 18', 'Vite', 'Vanilla Glass CSS', 'Canvas Particle Engine', 'Axios']
    },
    {
      category: 'Mobile Workspace',
      icon: '📱',
      badge: 'Flutter SDK',
      desc: 'Cross-platform mobile application providing legal clients and verified advocates with real-time consultation and localized mobile UX on iOS & Android.',
      items: ['Flutter', 'Dart', 'Mobile WebSockets', 'Native Camera & Audio', 'Secure Storage']
    },
    {
      category: 'Backend Core API',
      icon: '🐍',
      badge: 'FastAPI + Python',
      desc: 'Asynchronous Python backend orchestrating RESTful endpoints, real-time WebSockets, auth middleware, and heavy machine learning workloads.',
      items: ['FastAPI', 'Uvicorn', 'WebSockets', 'AsyncIO Workers', 'Pydantic v2']
    },
    {
      category: 'AI & Hybrid Retrieval',
      icon: '🧠',
      badge: 'FAISS + Sparse + Graph',
      desc: 'State-of-the-art RAG architecture combining Dense vector search via FAISS & Sentence-Transformers, Sparse keyword matching (BM25), and Knowledge Graph queries.',
      items: ['FAISS Vector DB', 'Sentence Transformers', 'BM25 Sparse', 'Knowledge Graph', 'LLM Prompt Engine']
    },
    {
      category: 'Voice & Media Processing',
      icon: '🎙️',
      badge: 'Whisper Pipeline',
      desc: 'Speech-to-text pipeline supporting hands-free voice consultation capture, automated legal transcription, and audio snippet processing.',
      items: ['Whisper STT', 'FFmpeg Engine', 'Audio Resampling', 'Voice Activity Detection']
    },
    {
      category: 'Cloud & Infrastructure',
      icon: '☁️',
      badge: 'Cloud Run + Firebase',
      desc: 'Containerized production backend deployed on Google Cloud Run with 4GB RAM for dense FAISS indices, coupled with Firebase Hosting and Firestore.',
      items: ['Google Cloud Run', 'Firebase Hosting', 'Google Auth', 'Firestore DB', 'Docker Containerization']
    }
  ];

  const features = [
    {
      title: 'Guided Legal AI Chat',
      desc: 'Context-aware conversational assistance trained on Indian statutes, case laws, and legal procedures.',
      icon: BrainCircuitIcon,
      color: '#3B82F6'
    },
    {
      title: 'Verified Advocate Directory',
      desc: 'Direct connection between legal seekers and Bar Council-verified advocates with specialized practice tags.',
      icon: ShieldCheckIcon,
      color: '#22C55E'
    },
    {
      title: 'Real-time Consultation & Inbox',
      desc: 'Instant peer-to-peer and client-to-lawyer messaging powered by WebSockets and secure Firebase state.',
      icon: MessageIcon,
      color: '#FBBF24'
    },
    {
      title: 'Document Upload & Analysis',
      desc: 'Upload legal briefs, contracts, or notices for automated extraction, summaries, and key point analysis.',
      icon: FolderIcon,
      color: '#EC4899'
    }
  ];

  return (
    <div className={styles.page}>
      {/* If user is logged in, show normal navbar */}
      {user ? (
        <Navbar />
      ) : (
        /* Public header for unauthenticated visitors */
        <header className={styles.publicHeader}>
          <div className={styles.brand} onClick={() => navigate('/auth')}>
            <div className={styles.brandIconWrap}>
              <ScalesIcon size={22} color="#FBBF24" />
              <div className={styles.brandIconGlow} />
            </div>
            <span className={styles.brandName}>LexAI</span>
            <span className={styles.brandTag}>Platform Info</span>
          </div>

          <div className={styles.publicNavRight}>
            <Link to="/about" className={styles.navLinkSubtle}>
              <UserIcon size={14} />
              Meet the Team
            </Link>
            <Link to="/auth" className={styles.authBtn}>
              Sign In / Register
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </header>
      )}

      {/* Main container */}
      <main className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroBadge}>
            <SparkleIcon size={14} color="#FBBF24" />
            <span>Platform Overview & Architecture</span>
          </div>

          <h1 className={styles.heroTitle}>
            LexAI — Next-Gen <span className={styles.gradientText}>Legal Intelligence</span>
          </h1>

          <p className={styles.heroSubtitle}>
            LexAI is an AI-powered legal technology platform designed to seamlessly connect citizens with legal guidance, verified advocates, and modern automated workflows across Web, Mobile, and Cloud AI services.
          </p>

          <div className={styles.heroCtaGroup}>
            {!user && (
              <button className={styles.primaryCta} onClick={() => navigate('/auth')}>
                Get Started Now <ArrowRightIcon size={16} />
              </button>
            )}
            <a href="#tech-stack" className={styles.secondaryCta}>
              Explore Tech Stack ↓
            </a>
          </div>

          {/* Hero Banner Image */}
          <div className={styles.heroImageCard}>
            <img src={heroImg} alt="LexAI Platform Overview" className={styles.heroImage} />
            <div className={styles.imageOverlayGlow} />
          </div>
        </section>

        {/* SYSTEM ARCHITECTURE FLOW */}
        <section className={styles.architectureSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>System Architecture</h2>
            <p className={styles.sectionSub}>Monorepo layout supporting decoupled frontends, FastAPI service layer, and hybrid AI retrieval.</p>
          </div>

          <div className={styles.archGrid}>
            <div className={styles.archCard}>
              <div className={styles.archStep}>01</div>
              <h3>Client Layer</h3>
              <p>React/Vite Web Workspace & Flutter Cross-Platform Mobile Client</p>
              <div className={styles.archPill}>REST / WebSockets</div>
            </div>

            <div className={styles.archArrow}>→</div>

            <div className={`${styles.archCard} ${styles.archCardHighlight}`}>
              <div className={styles.archStep}>02</div>
              <h3>FastAPI Backend</h3>
              <p>Asynchronous Python Service Layer hosted on Google Cloud Run</p>
              <div className={styles.archPill}>Service Orchestration</div>
            </div>

            <div className={styles.archArrow}>→</div>

            <div className={styles.archCard}>
              <div className={styles.archStep}>03</div>
              <h3>Hybrid Retrieval Engine</h3>
              <p>FAISS Dense Indexing + BM25 Sparse Search + Graph Context</p>
              <div className={styles.archPill}>RAG & LLM Execution</div>
            </div>
          </div>
        </section>

        {/* TECH STACK SHOWCASE */}
        <section id="tech-stack" className={styles.techSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Technology Stack</h2>
            <p className={styles.sectionSub}>Powered by modern open-source technologies, AI frameworks, and cloud infrastructure.</p>
          </div>

          <div className={styles.techBannerWrap}>
            <img src={techImg} alt="LexAI Tech Stack Diagram" className={styles.techBannerImage} />
            <div className={styles.techBannerGlow} />
          </div>

          <div className={styles.techGrid}>
            {techStack.map((tech) => (
              <div key={tech.category} className={styles.techCard}>
                <div className={styles.techTop}>
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span className={styles.techBadge}>{tech.badge}</span>
                </div>

                <h3 className={styles.techCategory}>{tech.category}</h3>
                <p className={styles.techDesc}>{tech.desc}</p>

                <div className={styles.techItems}>
                  {tech.items.map((item) => (
                    <span key={item} className={styles.techTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE CAPABILITIES GRID */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Core Capabilities</h2>
            <p className={styles.sectionSub}>End-to-end features serving legal seekers and legal professionals.</p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div key={feat.title} className={styles.featureCard}>
                  <div className={styles.featureIconWrap} style={{ borderColor: feat.color }}>
                    <IconComp size={24} color={feat.color} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER CALLOUT */}
        <section className={styles.footerCallout}>
          <h2>Ready to experience LexAI?</h2>
          <p>Join the next-generation legal technology workspace today.</p>
          {!user ? (
            <button className={styles.primaryCta} onClick={() => navigate('/auth')}>
              Launch Web Workspace <ArrowRightIcon size={16} />
            </button>
          ) : (
            <button className={styles.primaryCta} onClick={() => navigate('/workspace')}>
              Back to Workspace <ArrowRightIcon size={16} />
            </button>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 LexAI — Legal Intelligence Platform. Built with React, Flutter, and FastAPI.</p>
      </footer>
    </div>
  );
}
