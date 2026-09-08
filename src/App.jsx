import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsCounter from './components/MetricsCounter';
import LiveDashboardStudio from './components/LiveDashboardStudio';
import FeatureShowcase from './components/FeatureShowcase';
import TemplatesShowcase from './components/TemplatesShowcase';
import PricingPlans from './components/PricingPlans';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ReportBuilderModal from './components/ReportBuilderModal';
import LoginPage from './components/LoginPage';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState('login'); // 'login' comes FIRST, then 'dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(null);

  // Sync theme with document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll-reveal animation observer ("scrole pannumpothu text lam side la iruthu varanum")
  useEffect(() => {
    const revealTargets = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');
    if (!revealTargets.length) return;

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));

    const triggerVisibleNow = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      revealTargets.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh - 30) {
          el.classList.add('revealed');
        }
      });
    };

    triggerVisibleNow();
    const t1 = setTimeout(triggerVisibleNow, 120);
    const t2 = setTimeout(triggerVisibleNow, 400);

    window.addEventListener('scroll', triggerVisibleNow, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      window.removeEventListener('scroll', triggerVisibleNow);
    };
  }, []);



  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const handleUseTemplate = (template) => {
    setIsReportModalOpen(true);
    showToast(`Template "${template.title}" loaded into Studio.`);
  };

  const handleSelectPlan = (planName) => {
    showToast(`14-Day Free Trial initiated for ${planName} Plan!`);
    setIsReportModalOpen(true);
  };

  return (
    <div className="stackly-app-root">
      {/* Fixed Skyscraper Parallax Background ("scrole pannu text scrole aganum") */}
      <div className="fixed-skyscraper-bg"></div>

      {currentView === 'login' ? (
        <LoginPage 
          onBackToDashboard={() => setCurrentView('dashboard')}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setCurrentView('dashboard');
            showToast(`Welcome back, ${user.name}! Session authenticated.`);
          }}
        />
      ) : (
        <>
          {/* Navigation */}
          <Navbar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onSignInClick={() => setCurrentView('login')}
            currentUser={currentUser}
            onLogOut={() => {
              setCurrentUser(null);
              setCurrentView('login');
              showToast('Logged out of Stackly.');
            }}
          />

          {/* Hero Section */}
          <main>
            <Hero onOpenReportModal={() => setIsReportModalOpen(true)} />

            {/* Enterprise Metrics & Brand Proof */}
            <MetricsCounter />

            {/* Interactive Live Dashboard Console */}
            <LiveDashboardStudio onOpenReportModal={() => setIsReportModalOpen(true)} />

            {/* Wix-Style Interactive Feature Showcase */}
            <FeatureShowcase />

            {/* 40+ Pre-built Templates Gallery */}
            <TemplatesShowcase onUseTemplate={handleUseTemplate} />

            {/* Transparent Pricing & ROI Calculator */}
            <PricingPlans onSelectPlan={handleSelectPlan} />

            {/* Frequently Asked Questions */}
            <FAQSection />

            {/* Conversion CTA Banner */}
            <CTASection onOpenReportModal={() => setIsReportModalOpen(true)} />
          </main>

          {/* Modern Mega Footer */}
          <Footer />
        </>
      )}

      {/* Custom Report Builder Modal */}
      <ReportBuilderModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)}
        onReportCreated={(newRep) => {
          showToast(`Report "${newRep.title}" ready!`);
        }}
      />

      {/* Global App Toast */}
      {activeToast && (
        <div className="global-app-toast glass-card">
          <span>{activeToast}</span>
        </div>
      )}

      <style>{`
        .stackly-app-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .global-app-toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          color: var(--text-primary);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          z-index: 9999;
          animation: floatToast 0.25s ease;
        }

        @keyframes floatToast {
          from {
            opacity: 0;
            transform: translate(-50%, 15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
