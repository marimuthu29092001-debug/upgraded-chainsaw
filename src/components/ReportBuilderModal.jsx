import React, { useState } from 'react';
import { 
  IconX, 
  IconSparkles, 
  IconDatabase, 
  IconFileText, 
  IconDownload, 
  IconCheck, 
  IconShare, 
  IconRefresh 
} from './Icons';
import { dataSources } from '../data/mockAnalytics';

export default function ReportBuilderModal({ isOpen, onClose, onReportCreated }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('Executive Monthly ARR & Cohort Intelligence');
  const [selectedSource, setSelectedSource] = useState('snowflake');
  const [metricType, setMetricType] = useState('revenue');
  const [cadence, setCadence] = useState('Monthly');
  const [format, setFormat] = useState('PDF');
  const [enableAI, setEnableAI] = useState(true);
  
  // Generating state
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenStep('Connecting to data warehouse connector...');

    setTimeout(() => {
      setGenStep('Running distributed ClickHouse SQL aggregations...');
    }, 800);

    setTimeout(() => {
      setGenStep('Synthesizing AI executive takeaways & anomaly notes...');
    }, 1600);

    setTimeout(() => {
      setIsGenerating(false);
      const newRep = {
        id: `rep-${Math.floor(100 + Math.random() * 900)}`,
        title: title || 'Custom Analytics Report',
        source: dataSources.find(s => s.id === selectedSource)?.name || 'Multi-source',
        cadence: cadence,
        status: 'Ready',
        generatedAt: 'Just now',
        fileSize: format === 'PDF' ? '3.8 MB' : '1.4 MB',
        format: format,
        downloads: 1
      };
      setGeneratedReport(newRep);
      if (onReportCreated) onReportCreated(newRep);
    }, 2400);
  };

  const handleDownloadGenerated = () => {
    // Generate text/csv or summary
    const content = `STACKLY EXECUTIVE ANALYTICS REPORT\n` +
      `Title: ${generatedReport.title}\n` +
      `Source: ${generatedReport.source}\n` +
      `Cadence: ${generatedReport.cadence}\n` +
      `Format: ${generatedReport.format}\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `AI Summary: Revenue expanded +24.8% period-over-period with zero anomalous drop-offs.\n` +
      `Status: Verified by Stackly ClickHouse Engine (99.98% SLA)`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedReport.title.toLowerCase().replace(/\s+/g, '_')}.${generatedReport.format.toLowerCase() === 'pdf' ? 'txt' : 'csv'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-tag">
              <IconSparkles size={14} />
              <span>Stackly Studio Report Builder</span>
            </span>
            <h2 className="modal-title">Create Custom Analytics Report</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {!generatedReport ? (
            <div className="builder-form-grid">
              {/* Left Form Controls */}
              <div className="form-column">
                {/* Field 1: Title */}
                <div className="form-group">
                  <label className="form-label">Report Title</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Q4 Growth & Funnel Performance"
                  />
                </div>

                {/* Field 2: Data Source */}
                <div className="form-group">
                  <label className="form-label">Primary Data Source</label>
                  <div className="source-options-grid">
                    {dataSources.map((ds) => (
                      <div 
                        key={ds.id} 
                        className={`source-chip ${selectedSource === ds.id ? 'active' : ''}`}
                        onClick={() => setSelectedSource(ds.id)}
                      >
                        <span className="source-emoji">{ds.icon}</span>
                        <span className="source-chip-name">{ds.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Field 3: Metric Dimension */}
                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-label">Core Metric</label>
                    <select 
                      className="form-select"
                      value={metricType}
                      onChange={(e) => setMetricType(e.target.value)}
                    >
                      <option value="revenue">Gross Revenue & ARR</option>
                      <option value="churn">Cohort Retention & Churn</option>
                      <option value="funnel">Conversion Funnel & Drop-off</option>
                      <option value="ltv">LTV vs CAC Multipliers</option>
                      <option value="latency">API & Query Telemetry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Cadence</label>
                    <select 
                      className="form-select"
                      value={cadence}
                      onChange={(e) => setCadence(e.target.value)}
                    >
                      <option value="Daily">Daily Automated Sync</option>
                      <option value="Weekly">Weekly Digest</option>
                      <option value="Monthly">Monthly Board Brief</option>
                      <option value="One-Time">One-Time Snapshot</option>
                    </select>
                  </div>
                </div>

                {/* Field 4: Output Format */}
                <div className="form-group">
                  <label className="form-label">Export Format</label>
                  <div className="format-toggle-row">
                    {['PDF', 'CSV', 'JSON', 'Slack Digest'].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setFormat(fmt)}
                        className={`fmt-btn ${format === fmt ? 'active' : ''}`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 5: AI Insights Toggle */}
                <div className="ai-toggle-box" onClick={() => setEnableAI(!enableAI)}>
                  <div className="ai-toggle-left">
                    <IconSparkles size={18} className="text-indigo" />
                    <div>
                      <div className="ai-toggle-title">AI Executive Narrative Synthesis</div>
                      <div className="ai-toggle-desc">Automatically detect statistical anomalies & write board takeaways.</div>
                    </div>
                  </div>
                  <div className={`switch-toggle ${enableAI ? 'on' : ''}`}>
                    <div className="switch-handle"></div>
                  </div>
                </div>
              </div>

              {/* Right Live Preview Card */}
              <div className="preview-column">
                <div className="preview-label">Live Output Preview</div>
                <div className="preview-sheet glass-card">
                  <div className="sheet-watermark">STACKLY INTELLIGENCE</div>
                  <div className="sheet-badge-row">
                    <span className="badge badge-indigo">{format} Deliverable</span>
                    <span className="badge badge-success">{cadence}</span>
                  </div>

                  <h3 className="sheet-title">{title || 'Untitled Report'}</h3>
                  <div className="sheet-meta">
                    <span>Source: <strong>{dataSources.find(s => s.id === selectedSource)?.name}</strong></span>
                    <span>•</span>
                    <span>Metric: <strong>{metricType.toUpperCase()}</strong></span>
                  </div>

                  <div className="sheet-mock-chart">
                    <div className="mock-bar" style={{ height: '40%' }}></div>
                    <div className="mock-bar" style={{ height: '65%' }}></div>
                    <div className="mock-bar" style={{ height: '55%' }}></div>
                    <div className="mock-bar" style={{ height: '85%' }}></div>
                    <div className="mock-bar" style={{ height: '70%' }}></div>
                    <div className="mock-bar" style={{ height: '95%' }}></div>
                  </div>

                  {enableAI && (
                    <div className="sheet-ai-memo">
                      <div className="ai-memo-head">
                        <IconSparkles size={13} />
                        <span>AI Executive Takeaway</span>
                      </div>
                      <p>
                        Strong net momentum observed. ARR run rate projected to reach $2.4M with enterprise expansion exceeding target by 18.2%.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Success View */
            <div className="success-view">
              <div className="success-icon-wrap">
                <IconCheck size={36} />
              </div>
              <h3 className="success-title">Report Generated Successfully!</h3>
              <p className="success-desc">
                Your report <strong>"{generatedReport.title}"</strong> has been processed via ClickHouse 
                and is ready for instant download or team broadcast.
              </p>

              <div className="success-card glass-card">
                <div className="success-meta-row">
                  <div>
                    <span className="meta-lbl">Report ID</span>
                    <span className="meta-val">{generatedReport.id}</span>
                  </div>
                  <div>
                    <span className="meta-lbl">Data Source</span>
                    <span className="meta-val">{generatedReport.source}</span>
                  </div>
                  <div>
                    <span className="meta-lbl">Format & Size</span>
                    <span className="meta-val">{generatedReport.format} • {generatedReport.fileSize}</span>
                  </div>
                  <div>
                    <span className="meta-lbl">Status</span>
                    <span className="badge badge-success">Verified & Ready</span>
                  </div>
                </div>
              </div>

              <div className="success-actions-row">
                <button onClick={handleDownloadGenerated} className="btn btn-primary btn-lg">
                  <IconDownload size={18} />
                  <span>Download {generatedReport.format}</span>
                </button>
                <button onClick={() => setGeneratedReport(null)} className="btn btn-secondary btn-lg">
                  <IconRefresh size={18} />
                  <span>Create Another</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!generatedReport && (
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={onClose} disabled={isGenerating}>
              Cancel
            </button>
            <button 
              className="btn btn-primary btn-lg" 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner"></span>
                  <span>{genStep}</span>
                </>
              ) : (
                <>
                  <IconSparkles size={18} />
                  <span>Synthesize & Generate Report</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 7, 14, 0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          width: 100%;
          max-width: 860px;
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #818cf8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
        }

        .modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .modal-close-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          color: var(--text-muted);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
        }

        .modal-body {
          padding: 1.75rem;
          overflow-y: auto;
          flex: 1;
        }

        .builder-form-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 1.75rem;
        }

        .form-column {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-input, .form-select {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          padding: 0.7rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.88rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-input:focus, .form-select:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .source-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .source-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.75rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .source-chip:hover {
          border-color: var(--border-medium);
        }

        .source-chip.active {
          border-color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.12);
        }

        .source-chip-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .format-toggle-row {
          display: flex;
          gap: 0.5rem;
        }

        .fmt-btn {
          flex: 1;
          padding: 0.5rem 0.6rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .fmt-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
        }

        .ai-toggle-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: var(--radius-md);
          cursor: pointer;
        }

        .ai-toggle-left {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .text-indigo {
          color: #818cf8;
          margin-top: 2px;
        }

        .ai-toggle-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .ai-toggle-desc {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .switch-toggle {
          width: 38px;
          height: 20px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 2px;
          transition: background 0.2s;
        }

        .switch-toggle.on {
          background: var(--accent-primary);
        }

        .switch-handle {
          width: 16px;
          height: 16px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 0.2s;
        }

        .switch-toggle.on .switch-handle {
          transform: translateX(18px);
        }

        /* Preview Column */
        .preview-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .preview-sheet {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          position: relative;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sheet-watermark {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 0.65rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
          letter-spacing: 0.08em;
          opacity: 0.6;
        }

        .sheet-badge-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .sheet-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }

        .sheet-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .sheet-mock-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 80px;
          background: rgba(255, 255, 255, 0.02);
          padding: 8px;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .mock-bar {
          flex: 1;
          background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
          border-radius: 4px;
        }

        .sheet-ai-memo {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.25);
          padding: 0.75rem;
          border-radius: var(--radius-md);
        }

        .ai-memo-head {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: #818cf8;
          margin-bottom: 0.25rem;
        }

        .sheet-ai-memo p {
          font-size: 0.74rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Success View */
        .success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
        }

        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 2px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.25);
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .success-desc {
          color: var(--text-secondary);
          max-width: 540px;
          font-size: 0.95rem;
          margin-bottom: 1.75rem;
        }

        .success-card {
          width: 100%;
          max-width: 580px;
          padding: 1.25rem;
          margin-bottom: 1.75rem;
          background: var(--bg-card);
        }

        .success-meta-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          text-align: left;
        }

        .meta-lbl {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }

        .meta-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .success-actions-row {
          display: flex;
          gap: 1rem;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.25rem 1.75rem;
          border-top: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.15);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @media (max-width: 768px) {
          .builder-form-grid {
            grid-template-columns: 1fr;
          }
          .preview-column {
            display: none;
          }
          .success-meta-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
