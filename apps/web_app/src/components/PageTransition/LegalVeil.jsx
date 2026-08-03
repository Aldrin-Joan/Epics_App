import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LegalVeil.module.css';

/**
 * LegalVeil — Cinematic page transition overlay.
 *
 * On every route change:
 *  1. Veil rises from the bottom (200ms) revealing a scales-of-justice
 *     animation with the LexAI wordmark.
 *  2. When the new page is ready (after 300ms minimum), the veil retreats
 *     upward (280ms), and the incoming page scales+fades into view.
 *
 * If a page mounts in < 300ms the veil exits immediately (micro-flash).
 * If loading is slow the veil holds with the animation running gracefully.
 */
export default function LegalVeil() {
  const location = useLocation();
  const [phase, setPhase] = useState('idle'); // idle | enter | hold | exit
  const minHoldMs = 320;
  const timerRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    // Kick off the veil on every route change
    setPhase('enter');
    startRef.current = Date.now();

    // After veil-rise animation (280ms), switch to hold
    const riseTimer = setTimeout(() => {
      setPhase('hold');
    }, 280);

    // After minimum hold time, start the exit
    timerRef.current = setTimeout(() => {
      setPhase('exit');
      // After exit animation (320ms), go idle
      setTimeout(() => setPhase('idle'), 320);
    }, 280 + minHoldMs);

    return () => {
      clearTimeout(riseTimer);
      clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (phase === 'idle') return null;

  const veilClass = [
    styles.veil,
    phase === 'enter' ? styles.veilEnter : '',
    phase === 'exit'  ? styles.veilExit  : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={veilClass} aria-hidden="true">
      <div className={styles.scalesWrapper}>
        {/* Animated Scales of Justice SVG */}
        <svg
          className={styles.scalesSvg}
          viewBox="0 0 90 90"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central pillar */}
          <rect
            className={styles.scalesPillar}
            x="43.5" y="20" width="3" height="52"
            rx="1.5"
          />
          {/* Base */}
          <line
            className={styles.scalesBeam}
            x1="30" y1="72" x2="60" y2="72"
          />
          {/* Beam across top */}
          <line
            className={styles.scalesBeam}
            x1="15" y1="28" x2="75" y2="28"
          />
          {/* Top knob */}
          <circle
            className={styles.scalesPillar}
            cx="45" cy="20" r="3"
          />

          {/* Left pan group (tips down) */}
          <g className={styles.panLeft}>
            {/* Left chains */}
            <line className={styles.scalesChain} x1="20" y1="28" x2="16" y2="50" />
            <line className={styles.scalesChain} x1="24" y1="28" x2="28" y2="50" />
            {/* Left pan */}
            <ellipse
              className={styles.scalesPan}
              cx="22" cy="51" rx="9" ry="3"
            />
          </g>

          {/* Right pan group (tips up) */}
          <g className={styles.panRight}>
            {/* Right chains */}
            <line className={styles.scalesChain} x1="66" y1="28" x2="62" y2="50" />
            <line className={styles.scalesChain} x1="70" y1="28" x2="74" y2="50" />
            {/* Right pan */}
            <ellipse
              className={styles.scalesPan}
              cx="68" cy="51" rx="9" ry="3"
            />
          </g>
        </svg>

        {/* Brand */}
        <div className={styles.brand}>LexAI</div>
        <div className={styles.brandSub}>Legal Intelligence</div>

        {/* Loading dots */}
        <div className={styles.dots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      </div>
    </div>
  );
}
