import React, { useState } from 'react';
import { pricingPlans } from '../data/faqData';
import { IconCheck, IconSparkles, IconArrowRight } from './Icons';

export default function PricingPlans({ onSelectPlan }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag reveal-left">
            <IconSparkles size={14} />
            <span>Transparent Pricing</span>
          </span>
          <h2 className="reveal-left delay-1">
            Simple Plans for <span className="gradient-text">Hypergrowth Teams</span>
          </h2>
          <p className="reveal-right delay-2">
            Start free for 14 days. Scale as your queries and team expand. No hidden per-seat fees or data egress traps.
          </p>

          {/* Billing Switch */}
          <div className="billing-switch-wrap reveal-up delay-2">
            <span className={`billing-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
            <button 
              className={`billing-toggle ${isAnnual ? 'annual' : ''}`}
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Toggle billing period"
            >
              <span className="toggle-pill"></span>
            </button>
            <span className={`billing-label ${isAnnual ? 'active' : ''}`}>
              Annual <span className="discount-pill">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {pricingPlans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const animClass = idx === 0 ? 'reveal-left delay-1' : idx === 1 ? 'reveal-scale delay-2' : 'reveal-right delay-3';
            return (
              <div 
                key={idx} 
                className={`pricing-card glass-card ${animClass} ${plan.isPopular ? 'popular' : ''}`}
              >
                {plan.isPopular && (
                  <div className="popular-badge-ribbon">
                    <IconSparkles size={13} />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="card-top-head">
                  <span className="plan-name">{plan.name}</span>
                  {!plan.isPopular && <span className="badge badge-indigo">{plan.badge}</span>}
                </div>

                <div className="price-row">
                  <span className="currency">$</span>
                  <span className="price-figure">{price}</span>
                  <span className="price-period">/ month</span>
                </div>
                <div className="billed-note">
                  {isAnnual ? 'Billed annually ($' + (price * 12) + '/yr)' : 'Billed monthly'}
                </div>

                <p className="plan-desc">{plan.description}</p>

                <div className="plan-features-list">
                  <span className="features-title">WHAT'S INCLUDED:</span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="feature-item">
                      <div className="feat-check">
                        <IconCheck size={13} />
                      </div>
                      <span className="feat-text">{feat}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onSelectPlan && onSelectPlan(plan.name)}
                  className={`btn ${plan.isPopular ? 'btn-primary' : 'btn-secondary'} w-full`}
                >
                  <span>{plan.ctaText}</span>
                  <IconArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pricing-section {
          padding: 80px 0;
          position: relative;
        }

        .billing-switch-wrap {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 0.4rem 1.2rem;
          border-radius: var(--radius-full);
        }

        .billing-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .billing-label.active {
          color: var(--text-primary);
        }

        .billing-toggle {
          width: 44px;
          height: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: 12px;
          padding: 2px;
          cursor: pointer;
          position: relative;
        }

        .billing-toggle.annual {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .toggle-pill {
          display: block;
          width: 18px;
          height: 18px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform var(--transition-fast);
        }

        .billing-toggle.annual .toggle-pill {
          transform: translateX(20px);
        }

        .discount-pill {
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          margin-left: 0.4rem;
        }

        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .pricing-card {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          position: relative;
          background: var(--bg-surface);
        }

        .pricing-card.popular {
          border-color: var(--accent-primary);
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.25);
          transform: scale(1.03);
          z-index: 5;
        }

        .popular-badge-ribbon {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--gradient-brand);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 1rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          letter-spacing: 0.04em;
        }

        .card-top-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .plan-name {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          line-height: 1;
          margin-bottom: 0.35rem;
        }

        .currency {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .price-figure {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .price-period {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .billed-note {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .plan-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.75rem;
          min-height: 48px;
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2.25rem;
          flex: 1;
        }

        .features-title {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .feat-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feat-text {
          font-size: 0.86rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
            max-width: 540px;
            margin: 1.5rem auto 0 auto;
          }
          .pricing-card.popular {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
