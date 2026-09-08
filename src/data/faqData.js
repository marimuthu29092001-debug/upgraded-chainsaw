// FAQ Data for Stackly Reports & Analytics Dashboard

export const faqs = [
  {
    question: 'How fast can I connect my existing databases and APIs to Stackly?',
    answer: 'In less than 3 minutes. Stackly provides over 50 pre-built 1-click connectors for PostgreSQL, Snowflake, BigQuery, Stripe, Google Analytics 4, Hubspot, and REST APIs. Zero ETL pipelines or custom data engineering scripts required.'
  },
  {
    question: 'Can I export reports to PDF, CSV, and schedule automated Slack/Email updates?',
    answer: 'Yes! You can export pixel-perfect, branded PDF reports or raw CSV/Excel dumps with a single click. Furthermore, you can schedule automated daily, weekly, or monthly digest broadcasts directly to your executive Slack channels or customer email lists.'
  },
  {
    question: 'How does Stackly’s AI Insights engine work?',
    answer: 'Our proprietary BI neural engine continuously analyzes metric time series to detect anomalies, explain unexpected spikes or dips in plain English, and forecast upcoming month-end revenues with up to 96% accuracy.'
  },
  {
    question: 'Is Stackly SOC-2 Type II compliant and secure for enterprise data?',
    answer: 'Absolutely. Stackly connects directly to your databases via encrypted read-only credentials or private VPC peering. We enforce role-based access control (RBAC), SSO via Okta/SAML, and end-to-end TLS 1.3 encryption.'
  },
  {
    question: 'Can I embed Stackly dashboards and reports into my own React application?',
    answer: 'Yes! Stackly provides a native `@stackly/react-embed` SDK. You can embed interactive charts, full dashboards, or single report cards into your own customer-facing portal with full custom CSS theming.'
  },
  {
    question: 'Is there a free trial available for Stackly?',
    answer: 'Yes, we offer a 14-day fully-featured free trial with unlimited seats, access to all 40+ templates, and up to 5 live database connections. No credit card is required to get started.'
  }
];

export const pricingPlans = [
  {
    name: 'Starter',
    badge: 'Seed & Indie',
    monthlyPrice: 29,
    annualPrice: 22,
    description: 'Perfect for early-stage startups and indie makers building their first analytics stack.',
    features: [
      'Up to 3 Data Source Connections',
      '5 Active Dashboard Views',
      'Daily Automated Sync',
      'Standard PDF & CSV Exports',
      'Community & Email Support',
      '1 Workspace Member'
    ],
    ctaText: 'Start 14-Day Free Trial',
    isPopular: false
  },
  {
    name: 'Professional',
    badge: 'Most Popular',
    monthlyPrice: 89,
    annualPrice: 69,
    description: 'Designed for scaling SaaS and e-commerce companies that require deep BI insights.',
    features: [
      'Unlimited Data Connectors',
      'Unlimited Interactive Dashboards',
      'Hourly Real-time Data Sync',
      'AI-Powered Anomaly & Forecast Engine',
      'Scheduled Slack & Email Digests',
      'Role-based permissions & 10 Seats',
      'Priority 24/7 Support'
    ],
    ctaText: 'Launch Pro Studio',
    isPopular: true
  },
  {
    name: 'Enterprise',
    badge: 'Scale & Security',
    monthlyPrice: 249,
    annualPrice: 199,
    description: 'Mission-critical business intelligence with private VPC peering and dedicated SLA.',
    features: [
      'Dedicated ClickHouse Query Cluster',
      'White-label Branding & Custom Domain',
      'React SDK Embedding Rights',
      'SOC-2 Type II & HIPAA Compliance',
      'Custom SQL & DBT Transformations',
      'Dedicated Account Architect',
      '99.99% Uptime SLA'
    ],
    ctaText: 'Talk to Enterprise Team',
    isPopular: false
  }
];
