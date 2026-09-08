import React, { useState } from 'react';
import { IconSparkles, IconArrowRight, IconShieldCheck, IconCheck } from './Icons';

export default function LoginPage({ onBackToDashboard, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: string }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert({ type: 'error', message: 'Please provide both work email and password.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userName = email.split('@')[0];
      setAlert({ type: 'success', message: `Welcome back, ${userName}! Directing to Live Studio...` });

      const userData = {
        email,
        name: userName,
        role: email.includes('chen') ? 'Lead Data Engineer' : 'VP Executive Analytics',
        loggedInAt: new Date().toISOString()
      };

      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(userData);
        }, 800);
      }
    }, 1000);
  };

  const simulateOAuth = (provider) => {
    setAlert({ type: 'success', message: `Connecting securely to ${provider} Enterprise IdP...` });
    setTimeout(() => {
      setAlert({ type: 'success', message: `Authenticated via ${provider}! Directing to Live Studio...` });
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess({
            email: `verified.${provider.toLowerCase().replace(/[^a-z]/g, '')}@stackly.io`,
            name: `${provider} Verified User`,
            provider,
            loggedInAt: new Date().toISOString()
          });
        }, 800);
      }
    }, 1000);
  };

  const handleForgotPassword = () => {
    const entered = window.prompt('Enter your work email for a single-use Magic Login Link:', email || 'alex.morgan@stackly.io');
    if (entered) {
      setAlert({ type: 'success', message: `Password reset & magic link dispatched to ${entered}.` });
    }
  };

  return (
    <div className="login-page-root">
      {/* Top Header */}
      <header className="auth-header">
        <div className="container auth-header-inner">
          <div className="brand-logo" onClick={onBackToDashboard} style={{ cursor: 'pointer' }}>
            <svg className="logo-crest-svg" viewBox="0 0 80 80" fill="none" style={{ width: '42px', height: '42px' }}>
              <defs>
                <linearGradient id="loginSilverTower" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="loginTowerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <ellipse cx="40" cy="62" rx="34" ry="9" stroke="url(#loginSilverTower)" strokeWidth="3" fill="none" />
              <polygon points="22,60 22,34 32,26 32,60" fill="url(#loginSilverTower)" opacity="0.85" />
              <polygon points="34,60 34,16 46,6 46,60" fill="url(#loginSilverTower)" />
              <polygon points="48,60 48,28 58,36 58,60" fill="url(#loginSilverTower)" opacity="0.9" />
              <polygon points="18,22 20,15 27,17 22,20 25,27 19,23 14,26 17,19 11,17 18,15" fill="#38bdf8" />
            </svg>
            <div className="brand-text-block">
              <span className="brand-title">Stackly</span>
              <span className="brand-sub">Reports & Analytics</span>
            </div>
          </div>

          <button onClick={onBackToDashboard} className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="auth-main-wrapper">
        <div className="container">
          <div className="auth-split-grid">
            
            {/* Left Showcase Column */}
            <div className="auth-showcase-col reveal-left revealed">
              <div className="telemetry-pill">
                <span className="pulse-dot"></span>
                <span>ClickHouse Columnar 12ms • 14,200 Active Tenants</span>
              </div>

              <h1 className="auth-showcase-title">
                Next-Generation <br />
                <span className="gradient-text">Intelligence Console</span>
              </h1>

              <p className="auth-showcase-desc">
                Sign in to unleash unified ARR telemetry, automated board summaries, 
                and sub-second SQL queries designed for hyper-growth teams.
              </p>

              {/* Executive Quote Card */}
              <div className="auth-quote-card">
                <p className="quote-text">
                  “Stackly transformed our executive decision-making. We cut our quarterly board deck synthesis from 3 weeks to under 14 seconds.”
                </p>
                <div className="quote-author">
                  <div className="quote-avatar">ER</div>
                  <div className="quote-meta">
                    <span className="quote-name">Elena Rostova</span>
                    <span className="quote-role">VP Analytics & Operations • Vercel Partner</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges Strip */}
              <div className="auth-trust-strip">
                <span className="trust-tag">
                  <span className="trust-icon">✓</span> SOC-2 Type II Certified
                </span>
                <span className="trust-tag">
                  <span className="trust-icon">✓</span> 256-Bit SSL Encryption
                </span>
                <span className="trust-tag">
                  <span className="trust-icon">✓</span> HIPAA & GDPR Ready
                </span>
                <span className="trust-tag">
                  <span className="trust-icon">✓</span> 99.99% SLA Uptime
                </span>
              </div>
            </div>

            {/* Right Auth Card Column */}
            <div className="auth-form-card reveal-right revealed">
              <div className="form-header">
                <h2 className="form-title">Sign in to your account</h2>
                <p className="form-subtitle">
                  New to Stackly?{' '}
                  <span onClick={onBackToDashboard} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 600 }}>
                    Start 14-day free trial
                  </span>
                </p>
              </div>

              {/* Social Logins */}
              <div className="oauth-row">
                <button type="button" onClick={() => simulateOAuth('Google')} className="oauth-btn">
                  <svg className="oauth-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button type="button" onClick={() => simulateOAuth('GitHub')} className="oauth-btn">
                  <svg className="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <button type="button" onClick={() => simulateOAuth('Enterprise SSO')} className="sso-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Single Sign-On (SAML / Okta / Azure AD)</span>
              </button>

              <div className="or-divider">
                <span>Or continue with work email</span>
              </div>

              {/* Alert Feedback */}
              {alert && (
                <div className={`auth-alert-box ${alert.type}`} style={{ display: 'flex' }}>
                  <span>{alert.type === 'success' ? '✓' : '⚠️'}</span>
                  <span>{alert.message}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reactUserEmail">Work Email</label>
                  <div className="input-wrapper">
                    <span className="input-icon-left">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input 
                      type="email" 
                      id="reactUserEmail" 
                      className="form-input" 
                      placeholder="alex.morgan@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-label">
                    <label htmlFor="reactUserPassword">Password</label>
                  </div>
                  <div className="input-wrapper">
                    <span className="input-icon-left">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      id="reactUserPassword" 
                      className="form-input" 
                      placeholder="••••••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                    <button 
                      type="button" 
                      className="input-toggle-right" 
                      onClick={() => setShowPassword(!showPassword)}
                      title="Toggle Password Visibility"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-row-between">
                  <label className="custom-checkbox-wrap">
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                    />
                    <span className="custom-checkbox">
                      {rememberMe && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span>Remember this device (30 days)</span>
                  </label>

                  <button 
                    type="button" 
                    onClick={handleForgotPassword} 
                    className="forgot-link" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary btn-block">
                  {isLoading ? (
                    <span>Verifying session credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <IconArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer">
        <div className="container">
          <span>© 2026 Stackly Data Inc. Enterprise Security Architecture.</span>
          <span style={{ margin: '0 0.5rem' }}>•</span>
          <span onClick={onBackToDashboard} style={{ color: '#cbd5e1', cursor: 'pointer' }}>Dashboard Home</span>
        </div>
      </footer>
    </div>
  );
}
