import React, { useState } from 'react';
import { 
  IconLayers, 
  IconSparkles, 
  IconDatabase, 
  IconShare, 
  IconCheck, 
  IconZap, 
  IconTrendingUp,
  IconShieldCheck,
  IconBarChart
} from './Icons';

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState('canvas');

  const tabs = [
    {
      id: 'canvas',
      label: 'Visual Report Canvas',
      icon: <IconLayers size={18} />,
      title: 'Design Dashboards Without Limits',
      subtitle: 'A fluid, drag-and-drop workspace that pairs pixel perfection with live data feeds.',
      points: [
        'Over 35+ native visualization widgets (heatmaps, funnels, cohort matrix)',
        'Responsive breakpoints: optimize for executive mobile, tablet, and TV displays',
        'Custom corporate theming, color scales, and white-label subdomains',
        'Direct SQL query editor with instant syntax validation and schema hints'
      ],
      badge: 'Visual Design Freedom',
      highlightMetric: '35+ Interactive Widgets'
    },
    {
      id: 'ai',
      label: 'AI Predictive Engine',
      icon: <IconSparkles size={18} />,
      title: 'Automated Anomaly Detection & Forecasts',
      subtitle: 'Our BI neural engine surfaces what matters before you even notice the change.',
      points: [
        'Instant natural language executive commentary for board decks',
        'Statistical anomaly alerts delivered in real-time before revenue impact',
        'Next-quarter revenue and churn trajectory modeling with 95% confidence',
        'Root-cause analysis pinpointing exact churn cohorts and drop-off segments'
      ],
      badge: 'Powered by AI 3.0',
      highlightMetric: '95% Forecast Accuracy'
    },
    {
      id: 'connectors',
      label: '50+ Data Connectors',
      icon: <IconDatabase size={18} />,
      title: 'Zero ETL Pipelines. Plug and Play.',
      subtitle: 'Direct read-only connectors to your data lakes, warehouses, and transactional DBs.',
      points: [
        'Native 1-click connectors: PostgreSQL, Snowflake, BigQuery, Databricks',
        'Transactional billing integrations: Stripe, Recurly, Chargebee, Paddle',
        'Marketing attribution sync: GA4, Hubspot, Segment, TikTok & Meta Ads',
        'Sub-second query caching via distributed ClickHouse infrastructure'
      ],
      badge: 'Instant Connectivity',
      highlightMetric: '14ms Avg Query Latency'
    },
    {
      id: 'governance',
      label: 'Automated Delivery & Governance',
      icon: <IconShare size={18} />,
      title: 'Enterprise Security & Broadcast Channels',
      subtitle: 'Schedule automated digests to Slack channels and manage granular permissions.',
      points: [
        'Automated Slack, Teams, and Email PDF digest distribution',
        'Role-Based Access Control (RBAC) with column and row-level masking',
        'SOC-2 Type II, HIPAA, and GDPR compliant infrastructure',
        'Audit log telemetry tracking every report view and data export'
      ],
      badge: 'Enterprise Grade',
      highlightMetric: '99.99% Guaranteed SLA'
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag reveal-left">
            <IconLayers size={14} />
            <span>Wix-Inspired Visual Power</span>
          </span>
          <h2 className="reveal-left delay-1">
            Engineered for Precision. <br />
            <span className="gradient-text">Designed for Visual Impact.</span>
          </h2>
          <p className="reveal-right delay-2">
            Whether you are an executive presenting to the board or a data engineer 
            crafting complex attribution pipelines, Stackly gives you total creative control.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="feature-tabs-bar reveal-left delay-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`feature-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon-wrap">{tab.icon}</span>
              <span className="tab-btn-text">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Showcase */}
        <div className="feature-content-card glass-card">
          {/* Left Column: Details */}
          <div className="feature-info-col reveal-left delay-2">
            <span className="badge badge-indigo feature-badge">
              {currentTab.badge}
            </span>
            <h3 className="feature-title">{currentTab.title}</h3>
            <p className="feature-subtitle">{currentTab.subtitle}</p>

            <div className="feature-points-list">
              {currentTab.points.map((pt, idx) => (
                <div key={idx} className="feature-point-item">
                  <div className="point-check-icon">
                    <IconCheck size={14} />
                  </div>
                  <span className="point-text">{pt}</span>
                </div>
              ))}
            </div>

            <div className="feature-metric-pill">
              <IconZap size={16} className="text-emerald" />
              <span>Benchmark: <strong>{currentTab.highlightMetric}</strong></span>
            </div>
          </div>

          {/* Right Column: Visual Interactive Stage */}
          <div className="feature-visual-col reveal-right delay-2">
            <div className="visual-stage-frame">
              {activeTab === 'canvas' && (
                <div className="mockup-canvas-view">
                  <div className="mockup-topbar">
                    <div className="mockup-pill active">Canvas View</div>
                    <div className="mockup-pill">Mobile Responsive</div>
                    <div className="mockup-pill">Grid Lock</div>
                  </div>
                  <div className="mockup-grid-elements">
                    <div className="grid-elem elem-wide">
                      <div className="elem-hdr">
                        <span>ARR Growth & Cohort Retention</span>
                        <span className="badge badge-success">+34.8%</span>
                      </div>
                      <div className="mock-spark-bars">
                        {[40, 60, 50, 80, 70, 95, 85, 100].map((h, i) => (
                          <div key={i} className="spark-bar" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="grid-elem elem-half">
                      <div className="elem-hdr">
                        <span>Funnel Conversion</span>
                        <span className="badge badge-indigo">5.4%</span>
                      </div>
                      <div className="mock-funnel-step">
                        <div className="f-bar" style={{ width: '100%' }}></div>
                        <div className="f-bar" style={{ width: '65%' }}></div>
                        <div className="f-bar" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                    <div className="grid-elem elem-half">
                      <div className="elem-hdr">
                        <span>Active SQL Pipeline</span>
                        <span className="badge badge-cyan">Synced</span>
                      </div>
                      <div className="mock-code-box">
                        <code>SELECT cohort, SUM(arr) FROM stripe_events GROUP BY 1;</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="mockup-ai-view">
                  <div className="ai-alert-banner">
                    <IconSparkles size={18} className="text-indigo" />
                    <span>Neural Diagnostic: <strong>Positive Anomaly Detected</strong></span>
                  </div>
                  <div className="ai-narrative-card glass-card">
                    <h4 className="narrative-heading">Executive Board Summary</h4>
                    <p className="narrative-body">
                      "Net Revenue Retention rose by <strong>+5.2%</strong> this quarter, driven by strong enterprise upsells on the ClickHouse engine tier. Churn remained under <strong>0.8%</strong>, placing Stackly in the top 3% of global SaaS benchmarks."
                    </p>
                    <div className="ai-forecast-bar">
                      <div className="forecast-tag">Projected Q4 Exit ARR: <strong>$24.2M</strong> (Confidence: 96%)</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'connectors' && (
                <div className="mockup-connectors-view">
                  <div className="connectors-headline">
                    <IconDatabase size={16} />
                    <span>Active Distributed Connectors</span>
                  </div>
                  <div className="connectors-interactive-grid">
                    {[
                      { name: 'Snowflake DW', icon: '❄️', status: 'Streaming (0.2s)', ping: '12ms' },
                      { name: 'Stripe Billing', icon: '💳', status: 'Webhooks Verified', ping: '18ms' },
                      { name: 'PostgreSQL DB', icon: '🐘', status: 'Read Replica Live', ping: '8ms' },
                      { name: 'Google BigQuery', icon: '⚡', status: 'Query Cache 100%', ping: '15ms' },
                      { name: 'Google Analytics 4', icon: '📊', status: 'Events Synced', ping: '24ms' },
                      { name: 'Hubspot CRM', icon: '🎯', status: 'Deals Ingested', ping: '31ms' }
                    ].map((conn, idx) => (
                      <div key={idx} className="connector-card glass-card">
                        <div className="conn-top">
                          <span className="conn-icon">{conn.icon}</span>
                          <span className="conn-ping">{conn.ping}</span>
                        </div>
                        <div className="conn-name">{conn.name}</div>
                        <div className="conn-status">
                          <span className="dot-green"></span>
                          <span>{conn.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'governance' && (
                <div className="mockup-gov-view">
                  <div className="slack-preview-card glass-card">
                    <div className="slack-header">
                      <span className="slack-avatar">🤖</span>
                      <div>
                        <div className="slack-bot-name">Stackly Enterprise Bot <span className="slack-app-badge">APP</span></div>
                        <div className="slack-time">Today at 8:00 AM • Scheduled Broadcast</div>
                      </div>
                    </div>
                    <div className="slack-body">
                      <div className="slack-quote-bar"></div>
                      <div className="slack-content">
                        <strong>📊 Daily Executive Digest — Q3 Revenue Pulse</strong>
                        <p>Total New MRR Added: <strong>+$42,850</strong> | Churn Rate: <strong>0.4%</strong></p>
                        <div className="slack-dl-link">
                          📎 Attached: <span>Executive_Daily_Brief_2026-09-08.pdf (3.2 MB)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="soc2-compliance-badge">
                    <IconShieldCheck size={18} className="text-emerald" />
                    <span>End-to-End TLS 1.3 • SOC-2 Type II Certified • RBAC Enabled</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .features-section {
          padding: 80px 0;
          position: relative;
        }

        .feature-tabs-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .feature-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.4rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .feature-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }

        .feature-tab-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          border-color: var(--accent-primary);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
        }

        .feature-tab-btn.active .tab-icon-wrap {
          color: var(--accent-secondary);
        }

        .feature-content-card {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 3rem;
          padding: 3rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          align-items: center;
        }

        .feature-info-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .feature-badge {
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.85rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .feature-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.75rem;
          line-height: 1.6;
        }

        .feature-points-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }

        .feature-point-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .point-check-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .point-text {
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .feature-metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* Right Visual Stage */
        .feature-visual-col {
          position: relative;
        }

        .visual-stage-frame {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          min-height: 380px;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Mockup 1: Canvas */
        .mockup-canvas-view {
          width: 100%;
        }

        .mockup-topbar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
        }

        .mockup-pill {
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
        }

        .mockup-pill.active {
          color: var(--accent-secondary);
          background: rgba(56, 189, 248, 0.12);
        }

        .mockup-grid-elements {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .grid-elem {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .elem-wide {
          grid-column: 1 / -1;
        }

        .elem-hdr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .mock-spark-bars {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 60px;
        }

        .spark-bar {
          flex: 1;
          background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
          border-radius: 3px;
        }

        .mock-funnel-step {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0.5rem 0;
        }

        .f-bar {
          height: 8px;
          background: #6366f1;
          border-radius: 4px;
        }

        .mock-code-box {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: #38bdf8;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.6rem;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Mockup 2: AI */
        .mockup-ai-view {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ai-alert-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }

        .ai-narrative-card {
          padding: 1.5rem;
          background: var(--bg-surface);
        }

        .narrative-heading {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--accent-secondary);
        }

        .narrative-body {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .ai-forecast-bar {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          color: #10b981;
        }

        /* Mockup 3: Connectors */
        .mockup-connectors-view {
          width: 100%;
        }

        .connectors-headline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .connectors-interactive-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .connector-card {
          padding: 0.85rem;
          background: var(--bg-surface);
        }

        .conn-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .conn-icon {
          font-size: 1.25rem;
        }

        .conn-ping {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-secondary);
        }

        .conn-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .conn-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .dot-green {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
        }

        /* Mockup 4: Governance */
        .mockup-gov-view {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .slack-preview-card {
          background: #1e1e2d;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          border-radius: var(--radius-md);
        }

        .slack-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }

        .slack-avatar {
          font-size: 1.4rem;
        }

        .slack-bot-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .slack-app-badge {
          background: rgba(255, 255, 255, 0.2);
          font-size: 0.65rem;
          padding: 0.1rem 0.3rem;
          border-radius: 3px;
          margin-left: 0.3rem;
        }

        .slack-time {
          font-size: 0.72rem;
          color: #8e8ea0;
        }

        .slack-body {
          display: flex;
          gap: 0.75rem;
        }

        .slack-quote-bar {
          width: 3px;
          background: #6366f1;
          border-radius: 2px;
        }

        .slack-content {
          font-size: 0.82rem;
          color: #d1d5db;
          line-height: 1.5;
        }

        .slack-dl-link {
          margin-top: 0.4rem;
          color: #38bdf8;
          font-size: 0.78rem;
        }

        .soc2-compliance-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.65rem;
          border-radius: var(--radius-md);
        }

        @media (max-width: 1024px) {
          .feature-content-card {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
