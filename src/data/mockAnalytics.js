// Realistic Analytics and BI Data for Stackly Reports & Analytics Dashboard

export const timeframeData = {
  '7d': {
    label: 'Last 7 Days',
    revenue: '$428,490',
    revenueDelta: '+16.8%',
    activeUsers: '38,240',
    usersDelta: '+12.4%',
    queryLatency: '12ms',
    latencyDelta: '-18.2%',
    retentionRate: '96.2%',
    retentionDelta: '+3.1%',
    chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenueSeries: [48200, 54100, 61400, 58900, 68400, 72100, 65390],
    usersSeries: [5200, 5900, 6400, 6100, 7100, 7800, 7140],
    conversions: [3.4, 3.8, 4.2, 4.0, 4.7, 5.1, 4.8],
  },
  '30d': {
    label: 'Last 30 Days',
    revenue: '$1,842,950',
    revenueDelta: '+24.5%',
    activeUsers: '142,800',
    usersDelta: '+18.9%',
    queryLatency: '14ms',
    latencyDelta: '-22.5%',
    retentionRate: '94.8%',
    retentionDelta: '+4.6%',
    chartLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    revenueSeries: [395000, 442000, 485000, 520950],
    usersSeries: [29000, 34500, 38100, 41200],
    conversions: [3.9, 4.3, 4.6, 5.2],
  },
  '90d': {
    label: 'Last 90 Days',
    revenue: '$5,490,200',
    revenueDelta: '+38.2%',
    activeUsers: '390,400',
    usersDelta: '+29.4%',
    queryLatency: '15ms',
    latencyDelta: '-25.0%',
    retentionRate: '93.5%',
    retentionDelta: '+5.2%',
    chartLabels: ['Month 1', 'Month 2', 'Month 3'],
    revenueSeries: [1620000, 1840000, 2030200],
    usersSeries: [115000, 132000, 143400],
    conversions: [3.7, 4.4, 5.0],
  },
  '1y': {
    label: 'Year to Date',
    revenue: '$21,850,000',
    revenueDelta: '+64.7%',
    activeUsers: '1,420,000',
    usersDelta: '+52.1%',
    queryLatency: '14ms',
    latencyDelta: '-31.4%',
    retentionRate: '95.1%',
    retentionDelta: '+7.8%',
    chartLabels: ['Q1', 'Q2', 'Q3', 'Q4 (Proj)'],
    revenueSeries: [4600000, 5250000, 5890000, 6110000],
    usersSeries: [280000, 340000, 390000, 410000],
    conversions: [4.1, 4.6, 5.1, 5.6],
  }
};

export const trafficDistribution = [
  { source: 'Organic Search', percentage: 38, value: '54,264 visits', color: '#6366f1' },
  { source: 'Direct Inbound', percentage: 27, value: '38,556 visits', color: '#38bdf8' },
  { source: 'Referral Partners', percentage: 18, value: '25,704 visits', color: '#a855f7' },
  { source: 'Paid Campaigns', percentage: 11, value: '15,708 visits', color: '#10b981' },
  { source: 'Social & Community', percentage: 6, value: '8,568 visits', color: '#f59e0b' }
];

export const initialReports = [
  {
    id: 'rep-01',
    title: 'Executive Monthly ARR & Cohort Retention',
    source: 'Stripe + Snowflake',
    cadence: 'Monthly',
    status: 'Ready',
    generatedAt: '2026-09-07 08:30 AM',
    fileSize: '4.8 MB',
    format: 'PDF',
    downloads: 142
  },
  {
    id: 'rep-02',
    title: 'Global Conversion Funnel & Cart Abandonment',
    source: 'Google Analytics 4',
    cadence: 'Weekly',
    status: 'Ready',
    generatedAt: '2026-09-06 06:15 PM',
    fileSize: '2.1 MB',
    format: 'CSV',
    downloads: 89
  },
  {
    id: 'rep-03',
    title: 'Engineering API Latency & 99.9th Percentile SLA',
    source: 'PostgreSQL Datadog',
    cadence: 'Daily',
    status: 'Ready',
    generatedAt: '2026-09-08 09:00 AM',
    fileSize: '840 KB',
    format: 'JSON',
    downloads: 310
  },
  {
    id: 'rep-04',
    title: 'Customer Lifetime Value (LTV) vs CAC by Channel',
    source: 'Hubspot + Segment',
    cadence: 'Bi-Weekly',
    status: 'Ready',
    generatedAt: '2026-09-05 11:45 AM',
    fileSize: '3.4 MB',
    format: 'PDF',
    downloads: 73
  },
  {
    id: 'rep-05',
    title: 'Automated AI Revenue Anomaly & Forecast Digest',
    source: 'Stackly Neural Engine',
    cadence: 'Daily (Automated)',
    status: 'Ready',
    generatedAt: '2026-09-08 04:00 AM',
    fileSize: '1.2 MB',
    format: 'PDF',
    downloads: 254
  }
];

export const dataSources = [
  { id: 'stripe', name: 'Stripe Billing', icon: '💳', category: 'Finance', status: 'Connected' },
  { id: 'snowflake', name: 'Snowflake Data Cloud', icon: '❄️', category: 'Data Warehouse', status: 'Connected' },
  { id: 'ga4', name: 'Google Analytics 4', icon: '📊', category: 'Marketing', status: 'Connected' },
  { id: 'postgres', name: 'PostgreSQL DB', icon: '🐘', category: 'Production DB', status: 'Connected' },
  { id: 'hubspot', name: 'Hubspot CRM', icon: '🎯', category: 'Sales & CRM', status: 'Connected' },
  { id: 'bigquery', name: 'Google BigQuery', icon: '⚡', category: 'Cloud DW', status: 'Ready to Connect' },
  { id: 'shopify', name: 'Shopify Store', icon: '🛍️', category: 'E-Commerce', status: 'Ready to Connect' },
  { id: 'mixpanel', name: 'Mixpanel Cohorts', icon: '📈', category: 'Product Analytics', status: 'Ready to Connect' }
];
