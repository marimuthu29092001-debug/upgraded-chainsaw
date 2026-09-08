import React, { useState } from 'react';
import { dashboardTemplates, templateCategories } from '../data/templatesData';
import { 
  IconSparkles, 
  IconArrowRight, 
  IconCheck, 
  IconX, 
  IconDownload,
  IconBarChart,
  IconLayers
} from './Icons';

export default function TemplatesShowcase({ onUseTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState('All Templates');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = dashboardTemplates.filter(tmpl => {
    if (selectedCategory === 'All Templates') return true;
    return tmpl.category === selectedCategory;
  });

  return (
    <section id="templates" className="templates-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag reveal-left">
            <IconSparkles size={14} />
            <span>Wix-Style Template Gallery</span>
          </span>
          <h2 className="reveal-left delay-1">
            Kickstart with <span className="gradient-text">Ready-To-Deploy Templates</span>
          </h2>
          <p className="reveal-right delay-2">
            Do not start from a blank screen. Choose from battle-tested dashboard architectures 
            used by thousands of high-growth SaaS, e-commerce, and enterprise companies.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="template-categories-bar reveal-left delay-1">
          {templateCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="templates-grid">
          {filteredTemplates.map((tmpl, idx) => {
            const animClass = idx % 3 === 0 ? 'reveal-left' : idx % 3 === 1 ? 'reveal-scale' : 'reveal-right';
            const delayClass = `delay-${(idx % 3) + 1}`;
            return (
            <div key={tmpl.id} className={`template-card glass-card ${animClass} ${delayClass}`}>
              {/* Card Banner */}
              <div className="template-banner" style={{ background: tmpl.colorGradient }}>
                <span className="banner-icon">{tmpl.icon}</span>
                <div className="banner-badges">
                  <span className="badge-pill light">{tmpl.tag}</span>
                  <span className="badge-pill dark">★ {tmpl.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="template-card-body">
                <div className="template-meta-top">
                  <span className="badge badge-indigo">{tmpl.badge}</span>
                  <span className="users-count">{tmpl.usersCount} teams using this</span>
                </div>

                <h3 className="template-card-title">{tmpl.title}</h3>
                <p className="template-card-desc">{tmpl.description}</p>

                <div className="template-metrics-tags">
                  {tmpl.metrics.map((m, idx) => (
                    <span key={idx} className="metric-tag">
                      <IconCheck size={12} className="text-emerald" />
                      {m}
                    </span>
                  ))}
                </div>

                <div className="template-card-footer">
                  <button 
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="btn btn-secondary btn-sm w-full"
                  >
                    Preview Template Architecture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Template Preview Modal */}
      {previewTemplate && (
        <div className="modal-backdrop" onClick={() => setPreviewTemplate(null)}>
          <div className="template-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="tmpl-modal-header" style={{ background: previewTemplate.colorGradient }}>
              <div className="tmpl-modal-title-wrap">
                <span className="modal-icon-lg">{previewTemplate.icon}</span>
                <div>
                  <div className="tmpl-badge-row">
                    <span className="badge-pill light">{previewTemplate.category}</span>
                    <span className="badge-pill dark">Rating: {previewTemplate.rating} / 5.0</span>
                  </div>
                  <h3 className="tmpl-modal-title">{previewTemplate.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="tmpl-close-btn"
                aria-label="Close"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="tmpl-modal-body">
              <p className="tmpl-modal-desc">{previewTemplate.description}</p>

              <div className="tmpl-grid-blueprint">
                <div className="blueprint-header">
                  <IconLayers size={14} />
                  <span>Interactive Blueprint Layout: <strong>{previewTemplate.layout}</strong></span>
                </div>

                <div className="blueprint-stage">
                  <div className="blueprint-row">
                    {previewTemplate.metrics.map((m, i) => (
                      <div key={i} className="blueprint-widget">
                        <span className="widget-label">{m}</span>
                        <div className="widget-bar"></div>
                      </div>
                    ))}
                  </div>

                  <div className="blueprint-chart-box">
                    <div className="blueprint-chart-line"></div>
                    <div className="blueprint-chart-grid">
                      <span></span><span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tmpl-included-specs">
                <div className="spec-item">
                  <span className="spec-num">1-Click</span>
                  <span className="spec-lbl">Instant Setup</span>
                </div>
                <div className="spec-item">
                  <span className="spec-num">Real-time</span>
                  <span className="spec-lbl">WebSocket Feed</span>
                </div>
                <div className="spec-item">
                  <span className="spec-num">100%</span>
                  <span className="spec-lbl">Customizable</span>
                </div>
              </div>
            </div>

            <div className="tmpl-modal-footer">
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="btn btn-ghost"
              >
                Close Preview
              </button>
              <button 
                onClick={() => {
                  const t = previewTemplate;
                  setPreviewTemplate(null);
                  if (onUseTemplate) onUseTemplate(t);
                }}
                className="btn btn-primary"
              >
                <IconSparkles size={16} />
                <span>Use This Template in Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .templates-section {
          padding: 80px 0;
          position: relative;
        }

        .template-categories-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .cat-pill-btn {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.5rem 1.1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .cat-pill-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }

        .cat-pill-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .template-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .template-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-glow);
        }

        .template-banner {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          position: relative;
        }

        .banner-icon {
          font-size: 2.25rem;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .banner-badges {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          align-items: flex-end;
        }

        .badge-pill {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .badge-pill.light {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          backdrop-filter: blur(4px);
        }

        .badge-pill.dark {
          background: rgba(0, 0, 0, 0.35);
          color: #ffffff;
          backdrop-filter: blur(4px);
        }

        .template-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .template-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .users-count {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .template-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .template-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .template-metrics-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .metric-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.74rem;
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .template-card-footer {
          margin-top: auto;
        }

        /* Modal Preview */
        .template-modal-card {
          width: 100%;
          max-width: 720px;
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
        }

        .tmpl-modal-header {
          padding: 1.75rem 2rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          color: #ffffff;
        }

        .tmpl-modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modal-icon-lg {
          font-size: 2.75rem;
        }

        .tmpl-badge-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .tmpl-modal-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
        }

        .tmpl-close-btn {
          background: rgba(0, 0, 0, 0.3);
          border: none;
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .tmpl-modal-body {
          padding: 1.75rem 2rem;
        }

        .tmpl-modal-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .tmpl-grid-blueprint {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
        }

        .blueprint-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .blueprint-stage {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .blueprint-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .blueprint-widget {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
        }

        .widget-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 0.4rem;
        }

        .widget-bar {
          height: 6px;
          background: var(--accent-primary);
          border-radius: 3px;
        }

        .blueprint-chart-box {
          height: 110px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          position: relative;
          overflow: hidden;
          padding: 1rem;
        }

        .blueprint-chart-line {
          position: absolute;
          bottom: 25px;
          left: 10px;
          right: 10px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #6366f1, #a855f7);
          border-radius: 2px;
        }

        .blueprint-chart-grid {
          display: flex;
          justify-content: space-between;
          height: 100%;
        }

        .blueprint-chart-grid span {
          width: 1px;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
        }

        .tmpl-included-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          text-align: center;
        }

        .spec-item {
          background: rgba(255, 255, 255, 0.02);
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .spec-num {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent-secondary);
        }

        .spec-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .tmpl-modal-footer {
          padding: 1.25rem 2rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          background: rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 1024px) {
          .templates-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .templates-grid {
            grid-template-columns: 1fr;
          }
          .blueprint-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
