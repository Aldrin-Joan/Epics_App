import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import {
  collection, query, where, getDocs, doc, setDoc, updateDoc
} from 'firebase/firestore';
import { db } from '../api/firebase';
import styles from './CasesPage.module.css';

// ---------------------------------------------------------------------------
// Stage metadata
// ---------------------------------------------------------------------------

const STAGE_LABELS = {
  submitted: 'Request Sent',
  accepted: 'Accepted by Advocate',
  in_review: 'Case File Review',
  advice_drafted: 'Legal Advice Ready',
  completed: 'Completed',
  declined: 'Declined',
};

const STAGE_COLORS = {
  submitted: 'badge-amber',
  accepted: 'badge-blue',
  in_review: 'badge-blue',
  advice_drafted: 'badge-purple',
  completed: 'badge-green',
  declined: 'badge-red',
};

const TIMELINE_STAGES = [
  'submitted',
  'accepted',
  'in_review',
  'advice_drafted',
  'completed',
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ClientTimeline({ c }) {
  const stageIdx = TIMELINE_STAGES.indexOf(c.current_stage);
  return (
    <div className={styles.caseCard}>
      <div className={styles.caseCardHeader}>
        <div>
          <div className={styles.caseTitle}>Case #{c.id?.slice(0, 8) || 'Doc'}</div>
          <div className={styles.caseLawyer}>👨‍⚖️ {c.lawyer_name}</div>
          <p className={styles.caseSummary}>{c.summary}</p>
        </div>
        <span className={`badge ${STAGE_COLORS[c.status] || 'badge-amber'}`}>
          {STAGE_LABELS[c.status] || c.status}
        </span>
      </div>

      {c.status !== 'declined' && (
        <div className={styles.timeline}>
          {TIMELINE_STAGES.map((stage, i) => (
            <React.Fragment key={stage}>
              <div className={styles.timelineItem}>
                <div
                  className={`${styles.timelineNode} ${
                    i < stageIdx
                      ? styles.nodeComplete
                      : i === stageIdx
                      ? styles.nodeActive
                      : styles.nodePending
                  }`}
                >
                  {i < stageIdx ? '✓' : i + 1}
                </div>
                <div className={styles.nodeLabel}>{STAGE_LABELS[stage]}</div>
              </div>
              {i < TIMELINE_STAGES.length - 2 && (
                <div
                  className={`${styles.timelineLine} ${
                    i < stageIdx ? styles.lineComplete : ''
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className={styles.caseDate}>
        Filed: {new Date(c.created_at || Date.now()).toLocaleDateString()}
      </div>
    </div>
  );
}

function LawyerInquiryCard({ inq, onAccept, onDecline, onStageChange }) {
  const [localStatus, setLocalStatus] = useState(inq.status);
  const [stage, setStage]             = useState(inq.current_stage || 'submitted');
  const [dismissed, setDismissed]     = useState(false);

  if (dismissed) return null;

  return (
    <div className={styles.caseCard}>
      <div className={styles.caseCardHeader}>
        <div>
          <div className={styles.caseTitle}>👤 {inq.client_name}</div>
          <p className={styles.caseSummary}>{inq.summary}</p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {new Date(inq.created_at || Date.now()).toLocaleDateString()}
          </div>
        </div>
        <span className={`badge ${STAGE_COLORS[localStatus] || 'badge-amber'}`}>
          {STAGE_LABELS[localStatus] || localStatus}
        </span>
      </div>

      {localStatus === 'submitted' && (
        <div className={styles.actionRow}>
          <button
            id={`accept-${inq.id}`}
            className="btn btn-success btn-sm"
            onClick={async () => {
              await onAccept(inq.id);
              setLocalStatus('accepted');
              setStage('accepted');
            }}
          >
            ✓ Accept Request
          </button>
          <button
            id={`decline-${inq.id}`}
            className="btn btn-danger btn-sm"
            onClick={async () => {
              await onDecline(inq.id);
              setDismissed(true);
            }}
          >
            ✕ Decline
          </button>
        </div>
      )}

      {localStatus === 'accepted' && (
        <div className={styles.stageRow}>
          <label className="form-label">Update Stage:</label>
          <select
            className={styles.stageSelect}
            value={stage}
            onChange={async (e) => {
              const s = e.target.value;
              setStage(s);
              await onStageChange(inq.id, s);
              if (s === 'completed') setLocalStatus('completed');
            }}
          >
            <option value="accepted">Accepted</option>
            <option value="in_review">Mark as In Review</option>
            <option value="advice_drafted">Upload Advice Brief</option>
            <option value="completed">Mark Completed</option>
          </select>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CasesPage() {
  const { user, isLawyer } = useAuth();
  const toast = useToast();

  const [cases, setCases]           = useState([]);
  const [lawyers, setLawyers]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [domainFilter, setDomainFilter] = useState('');

  /** Fetch cases directly from Firestore. */
  const loadCases = useCallback(async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const field = isLawyer ? 'lawyer_id' : 'client_id';
      const q = query(collection(db, 'cases'), where(field, '==', user.uid));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      setCases(list);
    } catch (err) {
      console.error('Firestore loadCases error:', err);
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, [user, isLawyer]);

  /** Fetch verified advocates list from Firestore. */
  const loadLawyers = useCallback(async () => {
    if (isLawyer) return;
    try {
      const q = query(collection(db, 'users'), where('is_lawyer', '==', true));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setLawyers(list);
    } catch (err) {
      console.error('Firestore loadLawyers error:', err);
      setLawyers([]);
    }
  }, [isLawyer]);

  useEffect(() => {
    loadCases();
    loadLawyers();
  }, [loadCases, loadLawyers]);

  // --- Actions ---

  const handleAccept = async (caseId) => {
    try {
      await updateDoc(doc(db, 'cases', caseId), {
        status: 'accepted',
        current_stage: 'accepted',
        updated_at: new Date().toISOString(),
      });
      toast('Case accepted in Firestore!', 'success');
      loadCases();
    } catch (err) {
      console.error('Error accepting case in Firestore:', err);
      toast('Failed to accept case.', 'error');
    }
  };

  const handleDecline = async (caseId) => {
    try {
      await updateDoc(doc(db, 'cases', caseId), {
        status: 'declined',
        current_stage: 'declined',
        updated_at: new Date().toISOString(),
      });
      toast('Case declined.', 'info');
      loadCases();
    } catch (err) {
      console.error('Error declining case in Firestore:', err);
      toast('Failed to decline case.', 'error');
    }
  };

  const handleStageChange = async (caseId, stage) => {
    try {
      await updateDoc(doc(db, 'cases', caseId), {
        current_stage: stage,
        status: stage === 'completed' ? 'completed' : 'accepted',
        updated_at: new Date().toISOString(),
      });
      toast(`Stage updated to "${STAGE_LABELS[stage] || stage}"`, 'success');
      loadCases();
    } catch (err) {
      console.error('Error updating case stage in Firestore:', err);
      toast('Failed to update stage.', 'error');
    }
  };

  // --- Consult shortcut (client sidebar) ---
  const handleRequestConsult = async (lawyer) => {
    if (!user?.uid) return;
    const name = lawyer.full_name || lawyer.name || lawyer.username || 'Advocate';
    const summary = prompt(`Briefly describe your situation for ${name}:`);
    if (!summary || summary.trim().length < 5) {
      toast('Please provide a query summary.', 'error');
      return;
    }
    try {
      const caseRef = doc(collection(db, 'cases'));
      await setDoc(caseRef, {
        client_id: user.uid,
        client_name: user.full_name || user.username || user.email?.split('@')[0] || 'Client',
        lawyer_id: lawyer.id,
        lawyer_name: name,
        summary: summary.trim(),
        status: 'submitted',
        current_stage: 'submitted',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      toast(`Consultation case requested with ${name}!`, 'success');
      loadCases();
    } catch (err) {
      console.error('Error creating case in Firestore:', err);
      toast('Failed to submit consultation request in Firestore.', 'error');
    }
  };

  const filteredLawyers = lawyers.filter((l) => {
    if (!domainFilter.trim()) return true;
    const term = domainFilter.toLowerCase();
    const name = (l.full_name || l.name || '').toLowerCase();
    const domains = (l.practice_domains || l.domains || []).join(' ').toLowerCase();
    return name.includes(term) || domains.includes(term);
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.layout}>

        {/* ===== MAIN CONTENT ===== */}
        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              {isLawyer ? '📋 Case Inquiries' : '⚖️ My Cases'}
            </h1>
            <p className={styles.pageSub}>
              {isLawyer
                ? 'Manage incoming consultation requests and track active case progress.'
                : 'Track your consultation requests and case progress with verified advocates.'}
            </p>
          </div>

          {loading ? (
            <div style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>
              Loading cases…
            </div>
          ) : cases.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>
              {isLawyer
                ? 'No pending inquiries.'
                : 'You have no active cases. Use the sidebar to request a consult.'}
            </div>
          ) : (
            <div className={styles.caseList}>
              {isLawyer
                ? cases.map((c) => (
                    <LawyerInquiryCard
                      key={c.id}
                      inq={c}
                      onAccept={handleAccept}
                      onDecline={handleDecline}
                      onStageChange={handleStageChange}
                    />
                  ))
                : cases.map((c) => <ClientTimeline key={c.id} c={c} />)}
            </div>
          )}
        </main>

        {/* ===== SIDEBAR: LAWYER DIRECTORY (client only) ===== */}
        {!isLawyer && (
          <aside className={styles.directory}>
            <div className={styles.dirHeader}>🛡️ Find Advocates</div>
            <input
              className="glass-input"
              placeholder="Filter by domain…"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <div className={styles.lawyerGrid}>
              {filteredLawyers.map((l) => {
                const name = l.full_name || l.name || l.username || 'Advocate';
                const nameParts = name.split(' ');
                const avatarChar = (nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : name[0] || 'A').toUpperCase();
                const domainsList = l.practice_domains || l.domains || (l.specialization ? [l.specialization] : ['General Law']);
                const expText = l.years_of_experience ? `${l.years_of_experience} yrs exp` : (l.exp ? `${l.exp} yrs exp` : '5+ yrs exp');

                return (
                  <div key={l.id} className={styles.lawyerCard}>
                    <div className={styles.lawyerTop}>
                      <div className={styles.lawyerAvatar}>
                        {avatarChar}
                        {l.online && <span className={styles.onlineDot} />}
                      </div>
                      <div>
                        <div className={styles.lawyerName}>{name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {expText}
                        </div>
                      </div>
                    </div>
                    <div className={styles.lawyerDomains}>
                      {domainsList.map((d) => (
                        <span key={d} className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <button
                      id={`consult-${l.id}`}
                      className="btn btn-amber btn-sm btn-full"
                      style={{ marginTop: '0.75rem' }}
                      onClick={() => handleRequestConsult(l)}
                    >
                      Request Consult
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
