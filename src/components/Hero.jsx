import React, { useState } from 'react';
import { 
  IconSparkles, 
  IconArrowRight, 
  IconTrendingUp, 
  IconZap, 
  IconBarChart, 
  IconShieldCheck,
  IconCheck
} from './Icons';

export default function Hero({ onOpenReportModal }) {
  const [heroTimeframe, setHeroTimeframe] = useState('30d');

  // Interactive mini-chart dataset for hero
  const heroMetrics = {
    '7d': { arr: '$384.2K', growth: '+14.2%', queries: '1.2M', points: [20, 35, 30, 55, 45, 65, 85] },
    '30d': { arr: '$1.84M', growth: '+28.6%', queries: '6.8M', points: [15, 25, 40, 35, 60, 75, 95] },
    '90d': { arr: '$5.92M', growth: '+42.1%', queries: '22.4M', points: [25, 30, 48, 52, 70, 82, 100] }
  };

  const current = heroMetrics[heroTimeframe];

  // SVG Area path generator
  const getSvgPath = (points) => {
    const width = 500;
    const height = 150;
    const dx = width / (points.length - 1);
    const coords = points.map((p, i) => [i * dx, height - (p / 100) * height * 0.85]);
    
    let path = `M ${coords[0][0]} ${coords[0][1]}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      const cx = (prev[0] + curr[0]) / 2;
      path += ` C ${cx} ${prev[1]}, ${cx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
    }
    const area = `${path} L ${width} ${height} L 0 ${height} Z`;
    return { line: path, area, coords };
  };

  const { line, area, coords } = getSvgPath(current.points);

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Top Eyebrow Tag */}
        <div className="hero-eyebrow reveal-left">
          <span className="eyebrow-pill">
            <IconSparkles size={14} className="sparkle-spin" />
            <span>Next-Gen BI Engine 3.0</span>
          </span>
          <span className="eyebrow-text">
            Turn fragmented data into actionable executive intelligence
          </span>
        </div>

        {/* Main Wix-Inspired Bold Headline */}
        <h1 className="hero-headline reveal-left delay-1">
          Design Intelligent Reports. <br />
          <span className="gradient-text">Master Real-Time Analytics.</span>
        </h1>

        <p className="hero-subline reveal-right delay-2">
          Stackly delivers the power of an enterprise BI studio with the visual elegance 
          of a modern creative canvas. Connect 50+ data sources, build live dashboards, 
          and automate AI-synthesized executive digests in minutes.
        </p>

        {/* Hero CTA Group */}
        <div className="hero-cta-group reveal-left delay-3">
          <a href="#live-dashboard" className="btn btn-primary btn-lg hero-btn-glow">
            <span>Explore Live Dashboard</span>
            <IconArrowRight size={18} />
          </a>
          <button 
            onClick={onOpenReportModal} 
            className="btn btn-secondary btn-lg hero-btn-builder"
          >
            <IconSparkles size={18} />
            <span>Instant Report Builder</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="hero-trust-row reveal-right delay-4">
          <div className="trust-item">
            <IconCheck size={16} className="text-emerald" />
            <span>14-Day Free Access</span>
          </div>
          <div className="trust-item">
            <IconCheck size={16} className="text-emerald" />
            <span>No Credit Card Required</span>
          </div>
          <div className="trust-item">
            <IconShieldCheck size={16} className="text-emerald" />
            <span>SOC-2 Type II Certified</span>
          </div>
          <div className="trust-item">
            <IconZap size={16} className="text-emerald" />
            <span>12ms Query Latency</span>
          </div>
        </div>

        {/* Wix-Style Interactive Hero Preview Stage */}
        <div className="hero-stage-wrapper">
          {/* Floating Widget Left */}
          <div className="floating-metric-card float-left glass-card reveal-left delay-2 animate-float">
            <div className="float-card-header">
              <span className="float-icon-wrap icon-indigo">
                <IconTrendingUp size={16} />
              </span>
              <span className="float-card-title">Net Revenue Run Rate</span>
            </div>
            <div className="float-card-val">{current.arr}</div>
            <div className="float-card-meta">
              <span className="badge badge-success">{current.growth}</span>
              <span className="float-meta-text">vs previous period</span>
            </div>
          </div>

          {/* Floating Widget Right */}
          <div className="floating-metric-card float-right glass-card reveal-right delay-2 animate-float-delay">
            <div className="float-card-header">
              <span className="float-icon-wrap icon-cyan">
                <IconZap size={16} />
              </span>
              <span className="float-card-title">AI Predictive Alert</span>
            </div>
            <div className="float-alert-text">
              "Customer retention spiked <strong>+18.4%</strong> in enterprise cohorts."
            </div>
            <div className="float-card-meta">
              <span className="badge badge-indigo">Auto-Synthesized</span>
              <span className="float-meta-text">4m ago</span>
            </div>
          </div>

          {/* Center Stage Preview Canvas */}
          <div className="hero-preview-canvas glass-card reveal-scale delay-1">
            {/* Canvas Header Bar */}
            <div className="canvas-header">
              <div className="canvas-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="canvas-title-bar">
                <IconBarChart size={14} />
                <span>Stackly Studio — Executive Overview Canvas</span>
              </div>
              <div className="canvas-time-toggles">
                {['7d', '30d', '90d'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setHeroTimeframe(t)}
                    className={`time-pill-btn ${heroTimeframe === t ? 'active' : ''}`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Body */}
            <div className="canvas-body">
              <div className="canvas-kpis">
                <div className="canvas-kpi-item">
                  <span className="canvas-kpi-label">Annual Run Rate</span>
                  <div className="canvas-kpi-num">{current.arr}</div>
                  <span className="badge badge-success">{current.growth}</span>
                </div>
                <div className="canvas-kpi-item">
                  <span className="canvas-kpi-label">ClickHouse Queries</span>
                  <div className="canvas-kpi-num">{current.queries}</div>
                  <span className="badge badge-cyan">⚡ 12ms avg</span>
                </div>
                <div className="canvas-kpi-item">
                  <span className="canvas-kpi-label">AI Status</span>
                  <div className="canvas-kpi-num text-emerald">Optimal</div>
                  <span className="badge badge-indigo">99.98% SLA</span>
                </div>
              </div>

              {/* Interactive SVG Chart */}
              <div className="canvas-chart-area">
                <svg viewBox="0 0 500 150" className="hero-svg-chart" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path d={area} fill="url(#heroAreaGrad)" />
                  {/* Smooth line */}
                  <path d={line} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                  {/* Interactive Nodes */}
                  {coords.map(([x, y], idx) => (
                    <g key={idx} className="chart-node-group">
                      <circle cx={x} cy={y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  ))}
                </svg>
              </div>

              <div className="canvas-footer-stats">
                <span className="pulse-indicator"></span>
                <span>Live Data Sync: Connected to <strong>Snowflake & Stripe</strong> (Streaming 12,480 events/sec)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 130px;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818cf8;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.02em;
        }

        .sparkle-spin {
          animation: pulse-soft 2s infinite ease-in-out;
        }

        .eyebrow-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .hero-headline {
          font-size: clamp(2.5rem, 5.2vw, 4.25rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          max-width: 950px;
          margin-bottom: 1.5rem;
          line-height: 1.12;
        }

        .hero-subline {
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 780px;
          margin-bottom: 2.25rem;
          line-height: 1.65;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-btn-glow {
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
        }

        .hero-btn-glow:hover {
          box-shadow: 0 0 45px rgba(99, 102, 241, 0.65);
        }

        .hero-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.75rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .text-emerald {
          color: var(--accent-emerald);
        }

        /* Hero Stage & Floating Badges */
        .hero-stage-wrapper {
          width: 100%;
          max-width: 1060px;
          position: relative;
          margin: 0 auto;
        }

        .floating-metric-card {
          position: absolute;
          padding: 1.1rem 1.4rem;
          z-index: 10;
          width: 250px;
          text-align: left;
        }

        .float-left {
          left: -40px;
          top: 35px;
        }

        .float-right {
          right: -40px;
          bottom: 40px;
        }

        .float-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .float-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-indigo {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
        }

        .icon-cyan {
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }

        .float-card-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .float-card-val {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 0.35rem;
        }

        .float-alert-text {
          font-size: 0.82rem;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .float-card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .float-meta-text {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        /* Center Canvas */
        .hero-preview-canvas {
          background: var(--bg-surface-glass);
          border: 1px solid var(--border-glow);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(99, 102, 241, 0.15);
          overflow: hidden;
        }

        .canvas-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          background: rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid var(--border-subtle);
        }

        .canvas-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .canvas-title-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .canvas-time-toggles {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px;
          border-radius: var(--radius-sm);
          gap: 4px;
        }

        .time-pill-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .time-pill-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
        }

        .canvas-body {
          padding: 1.75rem;
        }

        .canvas-kpis {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          text-align: left;
        }

        .canvas-kpi-item {
          background: var(--bg-card);
          padding: 1rem 1.2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .canvas-kpi-label {
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }

        .canvas-kpi-num {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .canvas-chart-area {
          height: 160px;
          width: 100%;
          position: relative;
          margin-bottom: 1rem;
        }

        .hero-svg-chart {
          width: 100%;
          height: 100%;
          display: block;
        }

        .canvas-footer-stats {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.85rem;
          justify-content: flex-start;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse-soft 1.5s infinite;
        }

        @media (max-width: 1024px) {
          .floating-metric-card {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .canvas-kpis {
            grid-template-columns: 1fr;
          }
          .canvas-title-bar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
