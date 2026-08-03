import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ScalesIcon, MessageIcon, FolderIcon,
  BriefcaseIcon, UserIcon, LogOutIcon,
  GridIcon, ChevronDownIcon, SparkleIcon,
  InfoIcon,
} from './Icons';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, isLawyer, logout, updateUserProfile } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const displayName = user?.full_name || user?.username || user?.email?.split('@')[0] || 'User';
  const firstName   = displayName.split(' ')[0];
  const initial     = displayName[0]?.toUpperCase() || 'U';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => setDropOpen(false), [location]);

  const handleLogout = () => { logout(); navigate('/auth'); };

  const handleOpenProfile = (e) => {
    e.stopPropagation();
    setEditName(displayName);
    setShowProfileModal(true);
    setDropOpen(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setSavingProfile(true);
    try {
      await updateUserProfile({ full_name: editName.trim() });
      setShowProfileModal(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSavingProfile(false);
    }
  };

  const customerLinks = [
    { to: '/workspace', label: 'AI Workspace', icon: <BriefcaseIcon size={16} /> },
    { to: '/lexai',     label: 'LexAI Chat',   icon: <SparkleIcon size={16} /> },
    { to: '/cases',     label: 'My Cases',     icon: <FolderIcon size={16} /> },
    { to: '/inbox',     label: 'Inbox',        icon: <MessageIcon size={16} /> },
    { to: '/info',      label: 'Platform Info',icon: <InfoIcon size={16} /> },
    { to: '/about',     label: 'About Team',   icon: <UserIcon size={16} /> },
  ];

  const lawyerLinks = [
    { to: '/feed',   label: 'Feed',           icon: <GridIcon size={16} /> },
    { to: '/lexai',  label: 'LexAI Chat',     icon: <SparkleIcon size={16} /> },
    { to: '/cases',  label: 'Case Inquiries', icon: <BriefcaseIcon size={16} /> },
    { to: '/inbox',  label: 'Inbox',          icon: <MessageIcon size={16} /> },
    { to: '/info',   label: 'Platform Info',  icon: <InfoIcon size={16} /> },
    { to: '/about',  label: 'About Team',     icon: <UserIcon size={16} /> },
  ];

  const links = isLawyer ? lawyerLinks : customerLinks;

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        {/* Brand */}
        <div
          className={styles.brand}
          onClick={() => navigate(isLawyer ? '/feed' : '/workspace')}
        >
          <div className={styles.brandIconWrap}>
            <ScalesIcon size={20} color="#FBBF24" />
            <div className={styles.brandIconGlow} />
          </div>
          <span className={styles.brandName}>LexAI</span>
          <span className={styles.brandTag}>Legal Intelligence</span>
        </div>

        {/* Nav links */}
        <div className={styles.links}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.linkActive}`
                  : styles.link
              }
            >
              <span className={styles.linkIcon}>{l.icon}</span>
              {l.label}
              <span className={styles.linkUnderline} />
            </NavLink>
          ))}
        </div>

        {/* Right — Profile */}
        <div
          className={styles.profile}
          onClick={() => setDropOpen((v) => !v)}
        >
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {initial}
            </div>
            <div className={styles.avatarRing} />
          </div>
          <div className={styles.profileText}>
            <span className={styles.userName}>
              {firstName}
            </span>
            <span className={styles.userRole}>
              {isLawyer ? 'Advocate' : 'Client'}
            </span>
          </div>
          <span className={`${styles.chevron} ${dropOpen ? styles.chevronOpen : ''}`}>
            <ChevronDownIcon size={14} color="var(--text-muted)" />
          </span>

          {dropOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropHeader}>
                <div className={styles.dropName}>{displayName}</div>
                <div className={styles.dropRole}>
                  {isLawyer ? '⚖️ Verified Advocate' : '👤 Client'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {user?.email}
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '0.5rem 0' }} />
              <button className={styles.dropItem} onClick={handleOpenProfile}>
                <UserIcon size={15} color="var(--text-secondary)" />
                My Profile
              </button>
              <button className={`${styles.dropItem} ${styles.dropItemDanger}`} onClick={handleLogout}>
                <LogOutIcon size={15} color="var(--red)" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* User Profile Modal */}
      {showProfileModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setShowProfileModal(false)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: '420px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--amber), var(--amber-dark))',
                  color: '#0B0F19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {initial}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{displayName}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--amber)' }}>
                  {isLawyer ? '⚖️ Advocate Profile' : '👤 Client Profile'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="glass-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter full name..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email (Firestore UID connected)</label>
                <input
                  className="glass-input"
                  value={user?.email || ''}
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  className="glass-input"
                  value={isLawyer ? 'Advocate / Lawyer' : 'Client / User'}
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowProfileModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-amber btn-sm"
                  disabled={savingProfile}
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
