import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  ScalesIcon, BrainCircuitIcon, ShieldCheckIcon, SparkleIcon,
  BriefcaseIcon, ArrowRightIcon, UserIcon, InfoIcon
} from '../components/Icons';
import styles from './AboutPage.module.css';

// Developer Profile Photos
import aldrinImg from '../assets/info/Owners/Aldrin.jpg';
import anushkaImg from '../assets/info/Owners/Anushka.jpg';
import ayushImg from '../assets/info/Owners/Ayush.jpg';
import nyasaImg from '../assets/info/Owners/Nyasa.jpg';
import vartikaImg from '../assets/info/Owners/Vartika.jpg';

const DEVELOPERS = [
  {
    id: 'aldrin',
    name: 'Aldrin Joan Pandian W',
    role: 'Full-Stack & Legal AI Lead',
    university: 'VIT Bhopal University',
    avatar: aldrinImg,
    tagline: 'Versatile Full-Stack & Mobile Developer specializing in AI-driven cross-platform applications.',
    skills: ['React.js', 'Flutter', 'FastAPI', 'Django', 'Python', 'Java', 'Android', 'CEH v12', 'Ethical Hacking'],
    github: 'https://github.com/Aldrin-Joan',
    linkedin: 'https://www.linkedin.com/in/aldrin-joan-pandian-w-08215028a/',
    certifications: ['Certified Ethical Hacker (CEH v12)', 'AI Engineering Certification'],
    internships: ['amasQIS.ai — Frontend & ML Model Training Intern', 'ApexPlanet Software — Full-Stack Web Intern'],
    projects: [
      {
        title: 'LexAI Legal Assistant',
        desc: 'Cross-platform Legal AI platform with multilingual voice interaction, legal clause analysis, and real-time document insights built using React, Flutter, and FastAPI.'
      },
      {
        title: 'RehabEase Physiotherapy App',
        desc: 'Core developer building mobile UI and pose motion-tracking for guided rehabilitation exercises.'
      },
      {
        title: 'Deep Learning Medical Models',
        desc: 'Knee osteoarthritis detection, heart disease prediction models, and CNN sign language translation system.'
      }
    ],
    fullBio: `Aldrin Joan Pandian W is a versatile Computer Science student at VIT Bhopal University with strong skills in Java, C++, Python, Android Development, Flutter, and web technologies such as React.js. He has actively contributed to several impactful projects, including a cross-platform Legal AI Assistant built using React, Flutter, Django, and FastAPI, integrating multilingual voice interaction, legal clause analysis, and real-time document insights. Aldrin is also a core developer for RehabEase, where he builds the mobile interface and integrates motion-tracking features for guided rehabilitation exercises. His technical experience further includes deep learning–based knee osteoarthritis detection, heart disease prediction models, and a CNN-based sign language translation system. He has strengthened his practical exposure through internships at amasQIS.ai and ApexPlanet Software, working on frontend development, predictive maintenance model training, and full-stack web applications. Aldrin holds certifications in Ethical Hacking (CEH v12) and AI Engineering, and continues to explore machine learning, mobile development, and backend systems.`
  },
  {
    id: 'ayush',
    name: 'Ayush Agarwal',
    role: 'AI & System Architecture Lead',
    university: 'VIT Bhopal University (CGPA 8.60)',
    avatar: ayushImg,
    tagline: 'Deep Learning & ML engineer dedicated to scalable AI models, computer vision, and NLP summarization.',
    skills: ['PyTorch', 'TensorFlow', 'OpenCV', 'Transformers', 'C++', 'Python', 'DSA', 'Generative AI'],
    certifications: ['Linpack Club Active Member', 'MATLABverse Nextwave Hackathon Event Anchor'],
    projects: [
      {
        title: 'AI Video Manipulation Detection',
        desc: 'Deep learning system detecting deepfakes and manipulated video frames using PyTorch, OpenCV, and spatial-temporal transformers.'
      },
      {
        title: 'Medical Chat Summarization & Risk Scoring',
        desc: 'NLP tool utilizing Transformer models for patient transcript summarization and automated clinical risk scoring.'
      }
    ],
    fullBio: `Ayush Agarwal is a dedicated and hardworking student from Ranchi, Jharkhand, currently pursuing his B.Tech in Computer Science and Engineering at VIT Bhopal University. With strong technical skills in C, C++, Python, and Data Structures & Algorithms, he has developed a deep interest in software development and artificial intelligence. Ayush has actively worked on multiple academic and technical projects, including an AI-based Video Manipulation Detection System and a Medical Chat Summarization and Risk Scoring Tool, where he used frameworks such as PyTorch, TensorFlow, OpenCV, and Transformers. His work reflects a strong foundation in machine learning, model development, and full-stack integration. Ayush is an enthusiastic member of the Linpack Club at VIT Bhopal, where he collaborates on MATLAB- and AI-based projects and regularly participates in workshops and group discussions to strengthen his analytical and problem-solving abilities. He has also served as an event anchor for the MATLABverse Nextwave Hackathon, showcasing excellent communication, confidence, and public engagement skills. His academic performance, with a CGPA of 8.60, demonstrates his consistency and discipline.`
  },
  {
    id: 'nyasa',
    name: 'Nyasa Singh',
    role: 'ML Healthcare & Research Lead',
    university: 'VIT Bhopal University',
    avatar: nyasaImg,
    tagline: 'Machine learning practitioner researching diagnostic analytics, computer vision pose estimation, and sustainability.',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Streamlit', 'Python', 'Healthcare Analytics'],
    certifications: ['Healthcare Diagnostic AI Research', 'Sustainability & Real-time Analytics'],
    projects: [
      {
        title: 'RehabEase Physiotherapy Assistant',
        desc: 'Intelligent pose estimation and deep learning system for guided physical therapy and movement precision.'
      },
      {
        title: 'Predictive Disease Detection System',
        desc: 'Diagnostic multi-disease predictor leveraging SVM, Random Forest, and Logistic Regression algorithms.'
      },
      {
        title: 'AI Carbon Footprint Tracker',
        desc: 'Real-time analytics portal tracking environmental metrics and carbon emission insights.'
      }
    ],
    fullBio: `Nyasa Singh is a committed Computer Science student at VIT Bhopal University with strong foundations in C, C++, Python, Machine Learning, and Web Development. She has developed impactful AI-driven projects such as RehabEase, an intelligent physiotherapy assistant using deep learning and pose estimation; a Predictive Disease Detection System using ML models like SVM, Logistic Regression, and Random Forest; and an AI-powered Carbon Footprint Tracker designed for real-time analytics and sustainability insights. She is also involved in ongoing research on predictive analytics in healthcare, focusing on diagnostic accuracy and model performance. Nyasa is proficient in frameworks such as TensorFlow, PyTorch, Scikit-learn, OpenCV, and Streamlit, and actively contributes to coding platforms and collaborative technical work.`
  },
  {
    id: 'anushka',
    name: 'Anushka Sarviya',
    role: 'Full-Stack & NLP Developer',
    university: 'VIT Bhopal University',
    avatar: anushkaImg,
    tagline: 'Software engineer passionate about NLP summarization, client-server architectures, and full-stack systems.',
    skills: ['Python', 'Java', 'NLTK', 'Socket Programming', 'HTML/CSS/JS', 'MySQL', 'Matplotlib'],
    certifications: ['Deep Learning & Generative AI (MANIT Bhopal)', 'Python Essentials (VIT Bhopal)'],
    projects: [
      {
        title: 'Python NLTK Text Summarizer',
        desc: 'Automated natural language processing tool summarizing lengthy text passages using tokenization and frequency weighting.'
      },
      {
        title: 'Client-Server Socket Chat Application',
        desc: 'Real-time messaging platform implementing TCP socket communication between multi-threaded client and server scripts.'
      }
    ],
    fullBio: `Anushka Sarviya is a dedicated Computer Science and Engineering student at VIT Bhopal University with strong technical skills in C, C++, Python, Java, and full-stack fundamentals including HTML, CSS, JavaScript, and MySQL. She has worked on practical applications such as a Python-based Text Summarizer using NLTK and a Client–Server Chat Application built with socket programming, reflecting her interest in problem-solving, core programming, and application development. Anushka has also explored data science tools like NumPy, Matplotlib, and Tkinter, and has completed certifications in Deep Learning and Generative AI from MANIT Bhopal and Python Essentials from VIT. She continues to strengthen her coding skills through platforms such as HackerRank, LeetCode, and CodeChef.`
  },
  {
    id: 'vartika',
    name: 'Vartika Vashishtha',
    role: 'Computer Vision & Systems Developer',
    university: 'VIT Bhopal University',
    avatar: vartikaImg,
    tagline: 'Systems and vision developer building aerial satellite image analysis tools and socket networking apps.',
    skills: ['OpenCV', 'TensorFlow', 'Python', 'Java', 'C++', 'Socket Communication', 'DBMS', 'NumPy'],
    certifications: ['Satellite Image ML Research', 'HackerRank & LeetCode Coding Badges'],
    projects: [
      {
        title: 'Satellite Animal Detection System',
        desc: 'Computer vision framework analyzing aerial satellite imagery to count and identify wildlife species using OpenCV and ML.'
      },
      {
        title: 'Multi-threaded Socket Chat Server',
        desc: 'Network application demonstrating low-level socket programming and concurrent client-server management.'
      }
    ],
    fullBio: `Vartika Vashishtha is a dedicated Computer Science and Engineering student at VIT Bhopal University with strong technical skills in C, C++, Python, Java, and full-stack fundamentals including HTML, CSS, JavaScript, and MySQL. She has practical experience with data science tools such as NumPy, Tkinter, and TensorFlow, supported by coursework in Data Structures, Database Management Systems, Computer Architecture, and Operating Systems. Vartika has developed a Python Chat Application using socket communication with separate server–client scripts, demonstrating her understanding of networking and system-level programming. She is currently working on a Satellite-based Animal Detection System using Python, OpenCV, and machine learning techniques to identify and count animals from aerial images.`
  }
];

export default function AboutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDev, setSelectedDev] = useState(null);

  return (
    <div className={styles.page}>
      {/* Top Navigation */}
      {user ? (
        <Navbar />
      ) : (
        <header className={styles.publicHeader}>
          <div className={styles.brand} onClick={() => navigate('/auth')}>
            <div className={styles.brandIconWrap}>
              <ScalesIcon size={22} color="#FBBF24" />
              <div className={styles.brandIconGlow} />
            </div>
            <span className={styles.brandName}>LexAI</span>
            <span className={styles.brandTag}>Engineering Team</span>
          </div>

          <div className={styles.publicNavRight}>
            <Link to="/info" className={styles.navLinkSubtle}>
              <InfoIcon size={14} />
              Platform & Tech Stack
            </Link>
            <Link to="/auth" className={styles.authBtn}>
              Sign In / Register
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroBadge}>
            <SparkleIcon size={14} color="#FBBF24" />
            <span>Developers & Innovators</span>
          </div>

          <h1 className={styles.heroTitle}>
            Meet the Minds Behind <span className={styles.gradientText}>LexAI</span>
          </h1>

          <p className={styles.heroSubtitle}>
            LexAI is crafted by an ambitious team of Computer Science engineers and AI researchers from <strong>VIT Bhopal University</strong>, uniting machine learning, cross-platform engineering, and modern full-stack system architecture.
          </p>

          <div className={styles.toggleNavWrap}>
            <Link to="/info" className={styles.toggleNavBtn}>
              <InfoIcon size={16} /> View Platform & Architecture
            </Link>
            <span className={`${styles.toggleNavBtn} ${styles.toggleNavActive}`}>
              <UserIcon size={16} /> Meet the Engineering Team
            </span>
          </div>
        </section>

        {/* DEVELOPERS GRID */}
        <section className={styles.teamGrid}>
          {DEVELOPERS.map((dev) => (
            <div key={dev.id} className={styles.devCard}>
              <div className={styles.avatarWrap}>
                <img src={dev.avatar} alt={dev.name} className={styles.avatarImg} />
                <div className={styles.avatarRing} />
              </div>

              <div className={styles.devHeader}>
                <h2 className={styles.devName}>{dev.name}</h2>
                <div className={styles.devRole}>{dev.role}</div>
                <div className={styles.devUni}>🎓 {dev.university}</div>
              </div>

              <p className={styles.devTagline}>{dev.tagline}</p>

              {/* Skills pills */}
              <div className={styles.skillTags}>
                {dev.skills.slice(0, 6).map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
                {dev.skills.length > 6 && (
                  <span className={styles.skillMoreTag}>+{dev.skills.length - 6} more</span>
                )}
              </div>

              {/* Social / External links if available */}
              {(dev.github || dev.linkedin) && (
                <div className={styles.socialRow}>
                  {dev.github && (
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {dev.linkedin && (
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              )}

              <button
                className={styles.viewBioBtn}
                onClick={() => setSelectedDev(dev)}
              >
                View Full Bio & Projects <ArrowRightIcon size={14} />
              </button>
            </div>
          ))}
        </section>

        {/* FOOTER CALLOUT */}
        <section className={styles.footerCallout}>
          <h2>Driven by Engineering Excellence</h2>
          <p>Built as part of the legal intelligence platform initiative at VIT Bhopal University.</p>
          <button className={styles.primaryCta} onClick={() => navigate('/info')}>
            Explore LexAI Architecture & Tech Stack <ArrowRightIcon size={16} />
          </button>
        </section>
      </main>

      {/* DETAIL MODAL */}
      {selectedDev && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedDev(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setSelectedDev(null)}>
              ✕
            </button>

            <div className={styles.modalHeader}>
              <img src={selectedDev.avatar} alt={selectedDev.name} className={styles.modalAvatar} />
              <div>
                <h2 className={styles.modalName}>{selectedDev.name}</h2>
                <div className={styles.modalRole}>{selectedDev.role}</div>
                <div className={styles.modalUni}>🎓 {selectedDev.university}</div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <h3>About</h3>
              <p className={styles.modalBio}>{selectedDev.fullBio}</p>

              <h3>Key Technical Projects</h3>
              <div className={styles.modalProjects}>
                {selectedDev.projects.map((p) => (
                  <div key={p.title} className={styles.modalProjectCard}>
                    <div className={styles.modalProjectTitle}>⚡ {p.title}</div>
                    <div className={styles.modalProjectDesc}>{p.desc}</div>
                  </div>
                ))}
              </div>

              {selectedDev.internships && (
                <>
                  <h3>Practical Experience & Internships</h3>
                  <ul className={styles.modalList}>
                    {selectedDev.internships.map((intern) => (
                      <li key={intern}>{intern}</li>
                    ))}
                  </ul>
                </>
              )}

              {selectedDev.certifications && (
                <>
                  <h3>Certifications & Badges</h3>
                  <div className={styles.modalCertTags}>
                    {selectedDev.certifications.map((cert) => (
                      <span key={cert} className={styles.modalCertTag}>
                        🏆 {cert}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>© 2026 LexAI — Engineering Team. Built with React, Flutter, and FastAPI.</p>
      </footer>
    </div>
  );
}
