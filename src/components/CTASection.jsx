import React from 'react';
import { IconSparkles, IconArrowRight, IconShieldCheck, IconCheck } from './Icons';

export default function CTASection({ onOpenReportModal }) {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card glass-card">
          <div className="cta-bg-glow"></div>
          
          <span className="section-tag reveal-left">
            <IconSparkles size={14} />
            <span>Start Exploring In Seconds</span>
          </span>

          <h2 className="cta-headline reveal-left delay-1">
            Ready to Build Powerful Reports & <br />
            <span className="gradient-text">Master Real-Time Analytics?</span>
          </h2>

          <p className="cta-sub reveal-right delay-2">
            Join over 14,000 forward-thinking teams using Stackly to monitor ARR, 
            automate board decks, and deliver mission-critical BI telemetry without friction.
          </p>

          <div className="cta-buttons-group reveal-up delay-3">
            <button 
              onClick={onOpenReportModal}
              className="btn btn-primary btn-lg cta-glow-btn"
            >
              <IconSparkles size={18} />
              <span>Launch Live Report Studio</span>
            </button>
            <a href="#live-dashboard" className="btn btn-secondary btn-lg">
              <span>Test-Drive Interactive Dashboard</span>
              <IconArrowRight size={18} />
            </a>
          </div>

          <div className="cta-perks-row reveal-up delay-4">
            <div className="perk-item">
              <IconCheck size={16} className="text-emerald" />
              <span>14-day free trial</span>
            </div>
            <div className="perk-item">
              <IconCheck size={16} className="text-emerald" />
              <span>Zero setup fees</span>
            </div>
            <div className="perk-item">
              <IconShieldCheck size={16} className="text-emerald" />
              <span>Enterprise SOC-2 Type II</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-banner-section {
          padding: 80px 0 100px 0;
          position: relative;
        }

        .cta-banner-card {
          padding: 4.5rem 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 50px rgba(99, 102, 241, 0.2);
        }

        .cta-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-headline {
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          line-height: 1.15;
          max-width: 820px;
        }

        .cta-sub {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 640px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .cta-buttons-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cta-glow-btn {
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.5);
        }

        .cta-perks-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          justify-content: center;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        @media (max-width: 768px) {
          .cta-banner-card {
            padding: 3rem 1.5rem;
          }
          .cta-perks-row {
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
