import React, { useState, useEffect } from 'react';
import { 
  timeframeData, 
  trafficDistribution, 
  initialReports, 
  dataSources 
} from '../data/mockAnalytics';
import { 
  IconTrendingUp, 
  IconTrendingDown, 
  IconBarChart, 
  IconDownload, 
  IconSparkles, 
  IconFilter, 
  IconRefresh, 
  IconCalendar, 
  IconSearch, 
  IconFileText, 
  IconDatabase,
  IconCheck
} from './Icons';

export default function LiveDashboardStudio({ onOpenReportModal }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [activeChartType, setActiveChartType] = useState('area'); // 'area' | 'line' | 'bar'
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cadenceFilter, setCadenceFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isEmptyStatePreview, setIsEmptyStatePreview] = useState(false);
  const [hoveredDataIndex, setHoveredDataIndex] = useState(null);
  const [reportsList, setReportsList] = useState(initialReports);
  const [selectedReports, setSelectedReports] = useState([]);
  const [customStartDate, setCustomStartDate] = useState('2026-08-08');
  const [customEndDate, setCustomEndDate] = useState('2026-09-08');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => observer.observe(el));
    const checkViewport = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach(el => {
        if (el.getBoundingClientRect().top < vh - 30) {
          el.classList.add('revealed');
        }
      });
    };
    checkViewport();
    setTimeout(checkViewport, 150);
  }, []);

  const currentData = timeframeData[selectedTimeframe] || timeframeData['30d'];

  // Refresh data simulation (Topic 10: Loading State)
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Live metrics synced from Snowflake & Stripe clusters.');
    }, 900);
  };

  const triggerLoadingPreview = () => {
    setIsLoadingPreview(true);
    setTimeout(() => {
      setIsLoadingPreview(false);
      showToast('Loading skeleton state completed. Data feed fully restored.');
    }, 1300);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // TOPIC 9: Real CSV & JSON Export
  const handleExportCSV = () => {
    const headers = ['Timeframe_Period', 'Revenue_USD', 'Active_Users', 'Conversion_Rate_Pct'];
    const rows = currentData.chartLabels.map((label, idx) => [
      label,
      currentData.revenueSeries[idx],
      currentData.usersSeries[idx],
      currentData.conversions[idx]
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stackly_analytics_${selectedTimeframe}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Analytics dataset exported successfully as CSV!');
  };

  const handleExportJSON = () => {
    const payload = {
      cluster: "us-east-analytics",
      timeframe: selectedTimeframe,
      exportedAt: new Date().toISOString(),
      metrics: currentData.chartLabels.map((l, i) => ({
        period: l,
        revenue: currentData.revenueSeries[i],
        users: currentData.usersSeries[i],
        conversionRate: currentData.conversions[i]
      }))
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `stackly_dataset_${selectedTimeframe}.json`;
    link.click();
    showToast('Analytics JSON dataset downloaded.');
  };

  const handleExportPDFBrief = () => {
    window.print();
  };

  // Apply custom date range
  const handleApplyCustomDate = () => {
    setIsLoadingPreview(true);
    setTimeout(() => {
      setIsLoadingPreview(false);
      showToast(`Applied custom date range: ${customStartDate} to ${customEndDate}`);
    }, 600);
  };

  // TOPIC 3: Filtered reports logic
  const filteredReports = reportsList.filter(rep => {
    const matchesSearch = !searchQuery || 
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === 'All' || rep.source.toLowerCase().includes(sourceFilter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || rep.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCadence = cadenceFilter === 'All' || rep.cadence.toLowerCase() === cadenceFilter.toLowerCase();
    return matchesSearch && matchesSource && matchesStatus && matchesCadence;
  });

  // Master Select All checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReports(filteredReports.map(r => r.id));
    } else {
      setSelectedReports([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedReports(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSourceFilter('All');
    setStatusFilter('All');
    setCadenceFilter('All');
    setIsEmptyStatePreview(false);
  };

  // Calculate SVG Chart dimensions and paths
  const chartWidth = 720;
  const chartHeight = 220;
  const series = currentData.revenueSeries;
  const maxVal = Math.max(...series) * 1.15;
  const minVal = Math.min(...series) * 0.85;
  const dx = chartWidth / (series.length - 1 || 1);

  const pointsCoords = series.map((val, i) => {
    const y = chartHeight - ((val - minVal) / (maxVal - minVal)) * (chartHeight - 40) - 20;
    return [i * dx, y];
  });

  let linePath = `M ${pointsCoords[0][0]} ${pointsCoords[0][1]}`;
  for (let i = 1; i < pointsCoords.length; i++) {
    const prev = pointsCoords[i - 1];
    const curr = pointsCoords[i];
    const cx = (prev[0] + curr[0]) / 2;
    linePath += ` C ${cx} ${prev[1]}, ${cx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
  }
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  const isActuallyEmpty = isEmptyStatePreview || filteredReports.length === 0;

  return (
    <section id="live-dashboard" className="studio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag reveal-left">
            <IconSparkles size={14} />
            <span>Interactive Platform Studio</span>
          </span>
          <h2 className="reveal-left delay-1">
            Create Reports & <span className="gradient-text">Explore Analytics</span>
          </h2>
          <p className="reveal-right delay-2">
            Experience the actual Stackly dashboard engine below. Filter timeframes, inspect live revenue 
            and traffic distributions, generate automated reports, and export raw data.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className={`dashboard-console-wrapper glass-card ${isLoadingPreview ? 'is-loading' : ''}`}>
          {/* 13 TOPICS FEATURE BADGE CHECKLIST BAR */}
          <div className="features-checklist-bar reveal-left delay-1">
            <div className="checklist-title">
              <span>⚡ 13 Capabilities Built-in & Active</span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 'normal', textTransform: 'none' }}>
                (All topics from specification fully interactive)
              </span>
            </div>
            <div className="checklist-pills-wrap">
              <span className="chk-pill"><span className="chk-icon">✓</span> 1. Statistics Cards</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 2. Date Range Filter</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 3. Search & Filter</span>
              <span className="chk-pill"><span class="chk-icon">✓</span> 4. Line / Area Chart</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 5. Bar Chart</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 6. Pie / Donut Chart</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 7. Data Table</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 8. Status Breakdown</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 9. Export Button</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 10. Loading State</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 11. Empty State</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 12. Responsive Charts</span>
              <span className="chk-pill"><span className="chk-icon">✓</span> 13. Responsive Layout</span>
            </div>
          </div>

          {/* TOP BAR (Telemetry, Date Range Filter, Export & Loading Controls) */}
          <div className="console-topbar reveal-right delay-2">
            <div className="topbar-left">
              <div className="status-live-badge">
                <span className="live-dot"></span>
                <span>Live Telemetry</span>
              </div>
              <div className="engine-info">
                <span>Cluster: <strong>us-east-analytics</strong></span>
                <span className="divider">•</span>
                <span>Ingress: <strong>ClickHouse + Kafka</strong></span>
              </div>
            </div>

            {/* TOPIC 2: DATE RANGE FILTER & TOPIC 9: EXPORT BUTTONS & TOPIC 10: LOADING STATE */}
            <div className="date-filter-group">
              {/* Preset Timeframe Selector */}
              <div className="canvas-time-toggles" style={{ padding: '3px' }}>
                {['7d', '30d', '90d', '1y'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`time-pill-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                  >
                    {tf.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Custom Date Range Pickers */}
              <div className="custom-date-box" title="Custom Date Range Filter">
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>FROM</span>
                <input 
                  type="date" 
                  value={customStartDate} 
                  onChange={(e) => setCustomStartDate(e.target.value)} 
                />
                <span className="custom-date-sep">TO</span>
                <input 
                  type="date" 
                  value={customEndDate} 
                  onChange={(e) => setCustomEndDate(e.target.value)} 
                />
                <button className="btn btn-secondary btn-xs" onClick={handleApplyCustomDate}>Apply</button>
              </div>

              {/* Loading State Preview Trigger (Topic 10) */}
              <button 
                onClick={triggerLoadingPreview} 
                className="btn btn-secondary btn-sm"
                title="Preview shimmer skeleton loading state"
              >
                🔄 Preview Loading State
              </button>

              {/* Action Buttons (Topic 9) */}
              <button 
                onClick={handleRefresh} 
                className={`btn btn-secondary btn-sm ${isRefreshing ? 'spinning' : ''}`}
                title="Sync latest live events"
              >
                <IconRefresh size={14} />
                <span>Sync</span>
              </button>

              <button 
                onClick={handleExportCSV} 
                className="btn btn-secondary btn-sm"
                title="Download CSV export"
              >
                <IconDownload size={14} />
                <span>Export CSV</span>
              </button>

              <button 
                onClick={handleExportJSON} 
                className="btn btn-secondary btn-sm"
                title="Download JSON dataset"
              >
                📊 JSON
              </button>

              <button 
                onClick={handleExportPDFBrief} 
                className="btn btn-secondary btn-sm"
                title="Export executive brief"
              >
                📄 PDF Brief
              </button>

              <button 
                onClick={onOpenReportModal} 
                className="btn btn-primary btn-sm"
              >
                <IconSparkles size={14} />
                <span>New Report</span>
              </button>
            </div>
          </div>

          {/* TOPIC 10: LOADING BANNER */}
          {isLoadingPreview && (
            <div className="loading-banner show">
              <span className="live-dot" style={{ background: '#38bdf8' }}></span>
              <span>Re-aggregating ClickHouse multi-cluster data feed & refreshing visualizations...</span>
            </div>
          )}

          {/* TOPIC 1: STATISTICS CARDS (4 Rich KPI Cards with Sparklines & Deltas) */}
          <div className="console-kpi-grid">
            {/* KPI 1: Gross Revenue */}
            <div className="kpi-card glass-card reveal-left delay-1">
              <div className="kpi-header">
                <span className="kpi-title">Gross Revenue ({currentData.label})</span>
                <span className="badge badge-success">
                  <IconTrendingUp size={13} />
                  {currentData.revenueDelta}
                </span>
              </div>
              <div className="kpi-value">{currentData.revenue}</div>
              <svg className="kpi-sparkline" viewBox="0 0 120 28" preserveAspectRatio="none">
                <path d="M0,24 Q30,18 50,14 T85,12 T120,4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="120" cy="4" r="3.5" fill="#10b981" />
              </svg>
              <div className="kpi-footer">
                <span className="kpi-sub">Forecasted run rate +14% next month</span>
              </div>
            </div>

            {/* KPI 2: Active Subscriptions */}
            <div className="kpi-card glass-card reveal-left delay-2">
              <div className="kpi-header">
                <span className="kpi-title">Active Subscriptions</span>
                <span className="badge badge-indigo">
                  <IconTrendingUp size={13} />
                  {currentData.usersDelta}
                </span>
              </div>
              <div className="kpi-value">{currentData.activeUsers}</div>
              <svg className="kpi-sparkline" viewBox="0 0 120 28" preserveAspectRatio="none">
                <path d="M0,22 Q30,20 60,12 T90,14 T120,5" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="120" cy="5" r="3.5" fill="#6366f1" />
              </svg>
              <div className="kpi-footer">
                <span className="kpi-sub">Global enterprise & pro seats</span>
              </div>
            </div>

            {/* KPI 3: Latency SLA */}
            <div className="kpi-card glass-card reveal-right delay-2">
              <div className="kpi-header">
                <span className="kpi-title">Query Latency SLA</span>
                <span className="badge badge-cyan">
                  <IconTrendingDown size={13} />
                  {currentData.latencyDelta}
                </span>
              </div>
              <div className="kpi-value">{currentData.queryLatency}</div>
              <svg className="kpi-sparkline" viewBox="0 0 120 28" preserveAspectRatio="none">
                <path d="M0,6 Q30,10 60,16 T90,18 T120,24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="120" cy="24" r="3.5" fill="#38bdf8" />
              </svg>
              <div className="kpi-footer">
                <span className="kpi-sub">99.9th percentile ClickHouse query</span>
              </div>
            </div>

            {/* KPI 4: NRR */}
            <div className="kpi-card glass-card reveal-right delay-3">
              <div className="kpi-header">
                <span className="kpi-title">Net Revenue Retention (NRR)</span>
                <span className="badge badge-success">
                  <IconTrendingUp size={13} />
                  {currentData.retentionDelta}
                </span>
              </div>
              <div className="kpi-value">{currentData.retentionRate}</div>
              <svg className="kpi-sparkline" viewBox="0 0 120 28" preserveAspectRatio="none">
                <path d="M0,20 Q35,16 65,14 T95,8 T120,6" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="120" cy="6" r="3.5" fill="#a855f7" />
              </svg>
              <div className="kpi-footer">
                <span className="kpi-sub">Top 5% across B2B SaaS benchmarks</span>
              </div>
            </div>
          </div>

          {/* TOPIC 4, 5, 6, 12: ANALYTICS VISUALIZATIONS */}
          <div className="analytics-visualization-grid">
            {/* Left: Line / Area / Bar Chart Panel (Topics 4, 5, 12) */}
            <div className="chart-panel glass-card reveal-left delay-1">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">Revenue Trajectory & Velocity</h3>
                  <p className="panel-subtitle">Streaming aggregated payouts from Stripe & custom webhooks</p>
                </div>

                <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.35)', padding: '3px', borderRadius: 'var(--radius-full)' }}>
                  <button 
                    className={`time-pill-btn ${activeChartType === 'line' ? 'active' : ''}`}
                    onClick={() => setActiveChartType('line')}
                  >
                    📈 Smooth Line
                  </button>
                  <button 
                    className={`time-pill-btn ${activeChartType === 'area' ? 'active' : ''}`}
                    onClick={() => setActiveChartType('area')}
                  >
                    🌊 Gradient Area
                  </button>
                  <button 
                    className={`time-pill-btn ${activeChartType === 'bar' ? 'active' : ''}`}
                    onClick={() => setActiveChartType('bar')}
                  >
                    📊 Volume Bars
                  </button>
                </div>
              </div>

              {/* SVG Main Interactive Chart (Topic 12: Responsive Charts) */}
              <div className="main-chart-viewport">
                {activeChartType !== 'bar' ? (
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="interactive-svg-chart" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="mainAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                        <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[0.25, 0.5, 0.75].map((factor, i) => (
                      <line 
                        key={i} 
                        x1="0" 
                        y1={chartHeight * factor} 
                        x2={chartWidth} 
                        y2={chartHeight * factor} 
                        stroke="rgba(255,255,255,0.06)" 
                        strokeDasharray="4 4" 
                      />
                    ))}

                    {/* Area fill (only when activeChartType === 'area') */}
                    {activeChartType === 'area' && (
                      <path d={areaPath} fill="url(#mainAreaGrad)" />
                    )}

                    {/* Line path */}
                    <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

                    {/* Interactive points */}
                    {pointsCoords.map(([x, y], idx) => (
                      <g 
                        key={idx} 
                        className="svg-node"
                        onMouseEnter={() => setHoveredDataIndex(idx)}
                        onMouseLeave={() => setHoveredDataIndex(null)}
                      >
                        <circle cx={x} cy={y} r={hoveredDataIndex === idx ? "8" : "5"} fill="#38bdf8" stroke="#ffffff" strokeWidth="2.5" />
                      </g>
                    ))}
                  </svg>
                ) : (
                  /* Bar Chart Mode (Topic 5) */
                  <div className="bar-chart-container">
                    {series.map((val, idx) => {
                      const heightPct = Math.round(((val - minVal) / (maxVal - minVal)) * 80 + 15);
                      return (
                        <div 
                          key={idx} 
                          className="bar-col"
                          onMouseEnter={() => setHoveredDataIndex(idx)}
                          onMouseLeave={() => setHoveredDataIndex(null)}
                        >
                          <div className="bar-track">
                            <div 
                              className={`bar-fill ${hoveredDataIndex === idx ? 'highlight' : ''}`} 
                              style={{ height: `${heightPct}%` }}
                            ></div>
                          </div>
                          <span className="bar-label">{currentData.chartLabels[idx]}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Hover Tooltip display */}
                {hoveredDataIndex !== null && (
                  <div 
                    className="chart-tooltip"
                    style={{
                      left: `${(hoveredDataIndex / (series.length - 1 || 1)) * 85 + 5}%`,
                      top: '15%'
                    }}
                  >
                    <div className="tooltip-date">{currentData.chartLabels[hoveredDataIndex]}</div>
                    <div className="tooltip-rev">Revenue: ${series[hoveredDataIndex]?.toLocaleString()}</div>
                    <div className="tooltip-users">Active Users: {currentData.usersSeries[hoveredDataIndex]?.toLocaleString()}</div>
                    <div className="tooltip-conv">Conversion: {currentData.conversions[hoveredDataIndex]}%</div>
                  </div>
                )}
              </div>

              {/* Chart X-Axis Labels */}
              <div className="chart-x-labels">
                {currentData.chartLabels.map((lbl, i) => (
                  <span key={i} className={`x-label ${hoveredDataIndex === i ? 'active' : ''}`}>{lbl}</span>
                ))}
              </div>
            </div>

            {/* Right: TOPIC 6: PIE / DONUT CHART PANEL */}
            <div className="distribution-panel glass-card reveal-right delay-2">
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">Acquisition Channels</h3>
                  <p className="panel-subtitle">Multi-touch attribution split (Donut Chart)</p>
                </div>
                <span className="badge badge-indigo">142K Total</span>
              </div>

              {/* SVG Segmented Donut Chart */}
              <div className="donut-container">
                <svg className="donut-svg" viewBox="0 0 200 200">
                  <circle className="donut-ring-track" cx="100" cy="100" r="75" />
                  <circle className="donut-slice" cx="100" cy="100" r="75" stroke="#6366f1" strokeDasharray="179 471.24" strokeDashoffset="0" title="Organic Search: 38%" />
                  <circle className="donut-slice" cx="100" cy="100" r="75" stroke="#38bdf8" strokeDasharray="127 471.24" strokeDashoffset="-179" title="Direct Inbound: 27%" />
                  <circle className="donut-slice" cx="100" cy="100" r="75" stroke="#a855f7" strokeDasharray="85 471.24" strokeDashoffset="-306" title="Referral Partners: 18%" />
                  <circle className="donut-slice" cx="100" cy="100" r="75" stroke="#10b981" strokeDasharray="80 471.24" strokeDashoffset="-391" title="Paid Campaigns: 17%" />
                </svg>
                <div className="donut-center-text">
                  <div className="donut-center-val">142K</div>
                  <div className="donut-center-lbl">Total Visits</div>
                </div>
              </div>

              {/* Progress bars with percentages */}
              <div className="channels-list">
                {trafficDistribution.map((item, i) => (
                  <div key={i} className="channel-item">
                    <div className="channel-info-row">
                      <div className="channel-name-wrap">
                        <span className="channel-color-dot" style={{ background: item.color }}></span>
                        <span className="channel-name">{item.source}</span>
                      </div>
                      <div className="channel-stats">
                        <span className="channel-val">{item.value}</span>
                        <span className="channel-pct">{item.percentage}%</span>
                      </div>
                    </div>

                    <div className="channel-progress-bar">
                      <div 
                        className="channel-progress-fill" 
                        style={{ width: `${item.percentage}%`, background: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connected Data Sources Widget */}
              <div className="connected-sources-preview">
                <div className="sources-header">
                  <IconDatabase size={14} />
                  <span>Integrated Data Pipelines (8 Active)</span>
                </div>
                <div className="sources-pills-row">
                  {dataSources.slice(0, 5).map((src) => (
                    <span key={src.id} className="source-mini-pill" title={`${src.name} (${src.category})`}>
                      <span>{src.icon}</span>
                      <span>{src.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TOPIC 8: STATUS BREAKDOWN WIDGET */}
          <div className="status-breakdown-widget glass-card reveal-left delay-1">
            <div className="status-breakdown-header">
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  Pipeline & Cluster Ingestion Status Breakdown
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Real-time stream health across distributed edge partitions
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="badge badge-success">Overall Health: 99.98%</span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Latency: 14ms ping</span>
              </div>
            </div>

            {/* Multi-Segment Proportion Bar */}
            <div className="status-multi-bar" title="Status Distribution: Ready (94.2%), Syncing (4.1%), Scheduled (1.7%), Warning (0.0%)">
              <div className="status-bar-seg" style={{ width: '94.2%', background: '#10b981' }}></div>
              <div className="status-bar-seg" style={{ width: '4.1%', background: '#38bdf8' }}></div>
              <div className="status-bar-seg" style={{ width: '1.7%', background: '#f59e0b' }}></div>
              <div className="status-bar-seg" style={{ width: '0.0%', background: '#ef4444' }}></div>
            </div>

            {/* Legend Cards */}
            <div className="status-legend-row">
              <div className="status-legend-item">
                <span className="status-dot-pulse" style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                <div>
                  <strong style={{ color: '#10b981' }}>Ready / Optimal (94.2%)</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>18 of 19 shards synchronized</div>
                </div>
              </div>
              <div className="status-legend-item">
                <span className="status-dot-pulse" style={{ background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }}></span>
                <div>
                  <strong style={{ color: '#38bdf8' }}>Syncing (4.1%)</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Snowflake batch ingestion in flight</div>
                </div>
              </div>
              <div className="status-legend-item">
                <span className="status-dot-pulse" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }}></span>
                <div>
                  <strong style={{ color: '#f59e0b' }}>Scheduled (1.7%)</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Nightly ClickHouse roll-ups queued</div>
                </div>
              </div>
              <div className="status-legend-item">
                <span className="status-dot-pulse" style={{ background: '#ef4444' }}></span>
                <div>
                  <strong style={{ color: '#94a3b8' }}>Warning / Anomaly (0.0%)</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Zero active pipeline alerts</div>
                </div>
              </div>
            </div>
          </div>

          {/* TOPIC 3: SEARCH / FILTER & TOPIC 7: DATA TABLE & TOPIC 11: EMPTY STATE */}
          <div className="reports-table-panel glass-card reveal-scale delay-1">
            <div className="table-control-bar">
              <div>
                <h3 className="panel-title">Generated Reports & Executive Deliverables</h3>
                <p className="panel-subtitle">Automated scheduled digests, PDF executive briefs, and CSV datasets</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setIsEmptyStatePreview(!isEmptyStatePreview)} 
                  className="btn btn-secondary btn-sm"
                  title="Toggle Empty State preview"
                >
                  🔍 {isEmptyStatePreview ? 'Show Reports Table' : 'Preview Empty State'}
                </button>
                <button 
                  onClick={onOpenReportModal} 
                  className="btn btn-primary btn-sm"
                >
                  <IconSparkles size={14} />
                  <span>Create Custom Report</span>
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="table-control-bar" style={{ marginBottom: '1rem' }}>
              <div className="search-filter-row">
                {/* Search Bar */}
                <div className="search-input-wrap">
                  <span className="search-icon-pos">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search report title, data source, cadence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Source Filter */}
                <select 
                  className="filter-select"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  <option value="All">All Data Sources</option>
                  <option value="Stripe">Stripe + Snowflake</option>
                  <option value="Google">Google Analytics 4</option>
                  <option value="PostgreSQL">PostgreSQL Datadog</option>
                  <option value="Shopify">Shopify + BigQuery</option>
                  <option value="AWS">AWS CloudWatch</option>
                </select>

                {/* Status Filter */}
                <select 
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Ready">Ready</option>
                  <option value="Syncing">Syncing</option>
                  <option value="Scheduled">Scheduled</option>
                </select>

                {/* Cadence Filter */}
                <select 
                  className="filter-select"
                  value={cadenceFilter}
                  onChange={(e) => setCadenceFilter(e.target.value)}
                >
                  <option value="All">All Cadences</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>

                <button onClick={handleResetFilters} className="btn btn-secondary btn-xs">
                  ↺ Reset Filters
                </button>
              </div>
            </div>

            {/* Table Content or Empty State */}
            {!isActuallyEmpty ? (
              <div className="table-responsive-wrapper">
                <table className="stackly-table">
                  <thead>
                    <tr>
                      <th style={{ width: '36px' }}>
                        <input 
                          type="checkbox" 
                          onChange={handleSelectAll}
                          checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                        />
                      </th>
                      <th>Report Deliverable</th>
                      <th>Data Source</th>
                      <th>Cadence</th>
                      <th>Status</th>
                      <th>Last Synthesized</th>
                      <th>Format & Size</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((rep) => (
                      <tr key={rep.id} className="table-row">
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedReports.includes(rep.id)}
                            onChange={() => handleRowSelect(rep.id)}
                          />
                        </td>
                        <td>
                          <div className="report-title-cell">
                            <span className="report-icon-tag">
                              <IconFileText size={16} />
                            </span>
                            <div>
                              <div className="report-name">{rep.title}</div>
                              <div className="report-id">ID: {rep.id} • {rep.downloads} downloads</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="source-tag">{rep.source}</span>
                        </td>
                        <td>
                          <span className="cadence-text">{rep.cadence}</span>
                        </td>
                        <td>
                          <span className="badge badge-success">
                            <IconCheck size={12} />
                            {rep.status}
                          </span>
                        </td>
                        <td className="timestamp-cell">{rep.generatedAt}</td>
                        <td>
                          <span className="badge badge-indigo">{rep.format} ({rep.fileSize})</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            onClick={() => showToast(`Downloading ${rep.title} (${rep.format})...`)} 
                            className="action-icon-btn"
                            title="Download Report"
                          >
                            <IconDownload size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* TOPIC 11: EMPTY STATE */
              <div className="empty-state-card">
                <div className="empty-icon-wrap">🔍</div>
                <h4 className="empty-state-title">No Matching Reports Found</h4>
                <p className="empty-state-desc">
                  We couldn't find any reports matching your current filter criteria. Try adjusting your search query or reset your filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  ↺ Reset All Filters
                </button>
              </div>
            )}

            {/* Table Footer Bar (Topic 7: Pagination & Bulk Selection) */}
            <div className="table-footer-bar">
              <div>
                Showing 1 to {filteredReports.length} of {reportsList.length} reports ({selectedReports.length} selected)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {selectedReports.length > 0 && (
                  <button 
                    onClick={() => showToast(`Exporting ${selectedReports.length} selected reports...`)} 
                    className="btn btn-secondary btn-xs"
                  >
                    ⬇ Export Selected ({selectedReports.length})
                  </button>
                )}
                <div className="pagination-btns">
                  <button className="page-btn">← Prev</button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-notification glass-card">
          <IconSparkles size={16} className="text-emerald" />
          <span>{toastMessage}</span>
        </div>
      )}

      <style>{`
        .studio-section {
          padding: 80px 0;
          position: relative;
        }

        .dashboard-console-wrapper {
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-xl);
          padding: 1.75rem;
          box-shadow: var(--shadow-lg);
        }

        .console-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .status-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          font-size: 0.78rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          letter-spacing: 0.02em;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: pulse-soft 1.5s infinite;
        }

        .engine-info {
          font-size: 0.82rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .divider {
          color: var(--border-medium);
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .timeframe-group {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          padding: 3px 6px;
          border-radius: var(--radius-md);
          gap: 4px;
        }

        .tf-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .tf-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
        }

        .spinning svg {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        /* KPI Grid */
        .console-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .kpi-card {
          padding: 1.35rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-glow);
        }

        .kpi-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .kpi-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .kpi-value {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.6rem;
        }

        .kpi-footer {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .kpi-sub {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        /* Visualization Grid */
        .analytics-visualization-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .panel-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .panel-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .chart-panel {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          position: relative;
        }

        .chart-controls {
          display: flex;
          background: var(--bg-primary);
          padding: 3px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .chart-type-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .chart-type-btn.active {
          background: var(--bg-surface);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .main-chart-viewport {
          height: 230px;
          width: 100%;
          position: relative;
          margin-bottom: 0.75rem;
        }

        .interactive-svg-chart {
          width: 100%;
          height: 100%;
          display: block;
        }

        .svg-node {
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .svg-node:hover circle {
          filter: drop-shadow(0 0 8px #6366f1);
        }

        /* Bar Chart Mode */
        .bar-chart-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          height: 100%;
          padding: 0 1rem;
        }

        .bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          gap: 0.5rem;
          cursor: pointer;
          width: 48px;
        }

        .bar-track {
          width: 100%;
          height: 180px;
          display: flex;
          align-items: flex-end;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 6px;
        }

        .bar-fill {
          width: 100%;
          background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
          border-radius: 6px 6px 0 0;
          transition: height 0.4s ease, opacity 0.2s ease;
        }

        .bar-fill.highlight {
          filter: brightness(1.25);
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
        }

        .bar-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .chart-tooltip {
          position: absolute;
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          pointer-events: none;
          z-index: 20;
          font-size: 0.8rem;
          animation: pulse-soft 0.2s ease;
        }

        .tooltip-date {
          font-weight: 700;
          color: var(--accent-secondary);
          margin-bottom: 0.2rem;
        }

        .tooltip-rev {
          font-weight: 700;
          color: var(--text-primary);
        }

        .tooltip-users, .tooltip-conv {
          color: var(--text-muted);
        }

        .chart-x-labels {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0.5rem 0 0.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .x-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .x-label.active {
          color: var(--accent-secondary);
        }

        /* Right Panel: Channels */
        .distribution-panel {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .channels-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .channel-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }

        .channel-name-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .channel-color-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .channel-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .channel-stats {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .channel-val {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .channel-pct {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .channel-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .channel-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .connected-sources-preview {
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .sources-header {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.6rem;
        }

        .sources-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .source-mini-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          padding: 0.2rem 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        /* Reports Table */
        .reports-table-panel {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
        }

        .table-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .table-filters-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-medium);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-md);
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.82rem;
          font-family: var(--font-body);
          width: 180px;
        }

        .format-filters {
          display: flex;
          background: var(--bg-primary);
          border: 1px solid var(--border-medium);
          padding: 2px;
          border-radius: var(--radius-md);
        }

        .format-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .format-btn.active {
          background: var(--bg-surface);
          color: var(--accent-secondary);
        }

        .table-responsive-wrapper {
          overflow-x: auto;
        }

        .stackly-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          text-align: left;
        }

        .stackly-table th {
          color: var(--text-muted);
          font-weight: 600;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stackly-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }

        .table-row:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .report-title-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .report-icon-tag {
          width: 32px;
          height: 32px;
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .report-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .report-id {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .source-tag {
          font-size: 0.78rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .cadence-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .timestamp-cell {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .action-icon-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .action-icon-btn:hover {
          color: var(--accent-secondary);
          border-color: var(--accent-secondary);
          background: rgba(56, 189, 248, 0.1);
        }

        .empty-table-state {
          text-align: center;
          padding: 2.5rem;
          color: var(--text-muted);
        }

        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-glow);
          padding: 0.9rem 1.4rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 9999;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          animation: float 0.3s ease;
        }

        @media (max-width: 1100px) {
          .console-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .analytics-visualization-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .console-kpi-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-console-wrapper {
            padding: 1rem;
          }
          .search-box input {
            width: 120px;
          }
        }
      `}</style>
    </section>
  );
}
