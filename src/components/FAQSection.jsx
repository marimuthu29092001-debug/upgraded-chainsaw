import React, { useState } from 'react';
import { faqs } from '../data/faqData';
import { IconChevronDown, IconSparkles } from './Icons';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag reveal-left">
            <IconSparkles size={14} />
            <span>Got Questions?</span>
          </span>
          <h2 className="reveal-left delay-1">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="reveal-right delay-2">
            Everything you need to know about Stackly's query engine, data security, 
            automated reporting cadences, and developer APIs.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const animClass = idx % 2 === 0 ? 'reveal-left' : 'reveal-right';
            const delayClass = `delay-${(idx % 3) + 1}`;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-card ${animClass} ${delayClass} ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question">{faq.question}</h3>
                  <div className={`faq-chevron ${isOpen ? 'rotate' : ''}`}>
                    <IconChevronDown size={20} />
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer-row">
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 80px 0;
          position: relative;
        }

        .faq-accordion-list {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 1.35rem 1.75rem;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .faq-item:hover {
          border-color: var(--border-medium);
        }

        .faq-item.open {
          border-color: var(--border-glow);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.12);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-question {
          font-size: 1.08rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .faq-chevron {
          color: var(--text-muted);
          transition: transform 0.25s ease, color var(--transition-fast);
          flex-shrink: 0;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
          color: var(--accent-secondary);
        }

        .faq-answer-row {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          animation: fadeIn 0.25s ease;
        }

        .faq-answer {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
      `}</style>
    </section>
  );
}
