/**
 * SunTech GmbH (Werk Teisnach) - Erasmus+ BIP Team 1 Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initPillarTabs();
  initRoadmap();
  initResearchLog();
  initCalculator();
  initContactForm();
  initMobileMenu();
  initScrollSpy();
});

/* ==========================================================================
   1. ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000; // ms
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            // format display
            let formatted = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
            counter.textContent = `${prefix}${formatted}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const heroStats = document.getElementById('hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* ==========================================================================
   2. OPERATIONAL PILLARS INTERACTIVE TABS & CARDS
   ========================================================================== */
const pillarData = {
  pillar1: {
    title: "Pillar 1: Finding Talent & Academic Pipelines",
    subtitle: "TH Deggendorf (DIT) Partnership & Global Engineering Pipeline",
    tag: "Recruitment Infrastructure",
    icon: `<svg class="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>`,
    description: "Establishing a continuous recruitment pipeline leveraging local university excellence (TH Deggendorf / DIT) where international student enrollment exceeds 40%, alongside targeted international high-tech engineering channels.",
    highlights: [
      "Direct cooperation with DIT Cham & Deggendorf campuses for Electrical & Mechatronics graduates.",
      "International job portal integration & fast-track German skilled worker visa sponsorship (FEG).",
      "Annual target: 30 highly specialized engineers/year to counter regional demographic aging.",
      "Dedicated HR recruitment squad (Erasmus+ Team 1 model) for seamless intake."
    ],
    kpi: "30 Hires / Year",
    kpiLabel: "Target Intake"
  },
  pillar2: {
    title: "Pillar 2: Integration & Public Grant Funding",
    subtitle: "ESF+ & Arbeitsmarktfonds Bayern Co-Financing & Relocation Support",
    tag: "Financial & Social Shield",
    icon: `<svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    description: "Maximizing public EU and Bavarian grant utilization to eliminate integration friction, provide housing allowances in Landkreis Regen, and ensure family integration for long-term retention.",
    highlights: [
      "Primary funding: European Social Fund (ESF+) & Arbeitsmarktfonds Bayern grants.",
      "Corporate fallback funding: Reinvesting €1.5M–€2M/year from SunTech's €10M–€15M EBITDA.",
      "Relocation package: Housing stipends, spousal job placement assistance, and daycare slot guarantees.",
      "Bilingual German-English integration & cultural acclimatization programs in Teisnach."
    ],
    kpi: "70-80% Subsidy",
    kpiLabel: "Eligible Public Funding"
  },
  pillar3: {
    title: "Pillar 3: Shop-Floor Communication & Mentorship",
    subtitle: "Paid 'Tandem Mentorship' & Standardized Bilingual Operations",
    tag: "Workplace Harmony",
    icon: `<svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    description: "Overcoming shop-floor resistance by financially rewarding veteran German workers as 'Technical Mentors' while digitizing work procedures into bilingual visual formats.",
    highlights: [
      "Paid Mentor Stipends & salary upgrades for veteran technicians guiding foreign recruits.",
      "Eliminating burnout among legacy staff through extra shift distribution and pairing.",
      "Standardized bilingual digital work instructions & tablet-assisted shop-floor assembly.",
      "German language tandem hours integrated directly into paid working schedules."
    ],
    kpi: "100% Bilingual",
    kpiLabel: "Shop-Floor Procedures"
  },
  pillar4: {
    title: "Pillar 4: Employer Brand & European Market Scale",
    subtitle: "Certified Skill Pathways & Solar Inverter Expansion across Europe",
    tag: "Growth & Retention",
    icon: `<svg class="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
    description: "Building an internationally attractive employer brand in rural Bavaria, ensuring 90+ retained technical specialists over 3 years to power European solar inverter market expansion.",
    highlights: [
      "Clear career promotion pathways & accredited photovoltaic engineering certifications.",
      "Preparing SunTech for commercial solar inverter export growth across the EU (3-5 year plan).",
      "Mitigating single-market risk by tapping into broader European green infrastructure demand.",
      "Creating a vibrant international high-tech hub in Teisnach, Landkreis Regen."
    ],
    kpi: "90 Specialists",
    kpiLabel: "3-Year Retained Pool"
  }
};

function initPillarTabs() {
  const pillarButtons = document.querySelectorAll('.pillar-tab-btn');
  const detailContainer = document.getElementById('pillar-detail-content');

  if (!detailContainer) return;

  function renderPillar(id) {
    const data = pillarData[id];
    if (!data) return;

    detailContainer.innerHTML = `
      <div class="glass-card rounded-2xl p-8 border border-slate-200 transition-all duration-300 animate-fadeIn">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-slate-100 pb-6">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200/60 shadow-sm">
              ${data.icon}
            </div>
            <div>
              <span class="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full mb-1 border border-blue-200">${data.tag}</span>
              <h3 class="text-2xl font-bold text-navy-900">${data.title}</h3>
              <p class="text-sm font-medium text-slate-500">${data.subtitle}</p>
            </div>
          </div>
          <div class="bg-gradient-to-br from-navy-900 to-blue-900 text-white px-6 py-3 rounded-xl text-center shadow-lg min-w-[160px]">
            <span class="block text-2xl font-extrabold text-amber-400">${data.kpi}</span>
            <span class="text-xs text-slate-300 uppercase tracking-wider font-medium">${data.kpiLabel}</span>
          </div>
        </div>
        
        <p class="text-slate-600 text-lg leading-relaxed mb-6 font-normal">
          ${data.description}
        </p>

        <h4 class="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          Key Tactical Deliverables:
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${data.highlights.map(item => `
            <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-amber-300 transition-colors">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mt-0.5">✓</span>
              <span class="text-slate-700 text-sm leading-snug">${item}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  pillarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pillarButtons.forEach(b => {
        b.classList.remove('active', 'border-amber-500', 'bg-navy-900', 'text-white', 'shadow-lg');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      btn.classList.add('active', 'border-amber-500', 'bg-navy-900', 'text-white', 'shadow-lg');

      const targetPillar = btn.getAttribute('data-pillar');
      renderPillar(targetPillar);
    });
  });

  // Render initial
  renderPillar('pillar1');
}

/* ==========================================================================
   3. WHAT'S NEXT - 5-YEAR GROWTH ROADMAP INTERACTIVE TIMELINE
   ========================================================================== */
const roadmapData = {
  y1: {
    year: "Year 1",
    phase: "Foundation & Setup Phase",
    status: "Active Preparation",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    headline: "Pipeline Establishment, Mentorship Launch & Public Grant Submissions",
    summary: "Establish official partnership agreements with TH Deggendorf (DIT), structure the Tandem Mentorship initiative for veteran German staff, and file co-funding applications for ESF+ and Arbeitsmarktfonds Bayern grants.",
    deliverables: [
      "Finalize DIT Cham & Deggendorf university talent cooperation contract.",
      "Launch shop-floor Tandem Mentorship program with mentor salary bonuses.",
      "Submit ESF+ & Arbeitsmarktfonds Bayern integration subsidy proposals.",
      "Establish initial candidate screening workflow with HR Team 1."
    ],
    targetMetric: "Target: Infrastructure Setup & Grant Filings Complete",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`
  },
  y2: {
    year: "Year 2",
    phase: "First Onboarding Pilot & Regional Export Pilot",
    status: "Planned Year 2",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    headline: "Onboard Cohort 1 (30 Engineers) & Pilot Inverter Exports to Austria & Czechia",
    summary: "Successfully onboard and integrate the first 30 international engineering specialists at Werk Teisnach. Standardize bilingual digital safety and assembly protocols while piloting solar inverter sales in neighboring EU markets.",
    deliverables: [
      "Onboard and integrate 30 high-tech engineers into manufacturing and R&D.",
      "Deploy tablet-based standardized bilingual work instructions on shop floor.",
      "Initiate solar inverter pilot sales in Austria and Czech Republic.",
      "Provide housing allowances & language courses for international recruits."
    ],
    targetMetric: "Target: 30 Engineers Integrated & €5M Initial Export Revenue",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`
  },
  y3: {
    year: "Year 3",
    phase: "Second Onboarding Cohort & EU Grid Compliance",
    status: "Planned Year 3",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    headline: "Onboard Cohort 2 (30 Engineers) & Adapt Inverters to Broader EU Grid Codes",
    summary: "Expand the international engineering roster to 60 total hires. Secure compliance for SunTech high-efficiency solar inverters across diverse EU electrical grid standards to unlock wide-scale European distribution.",
    deliverables: [
      "Onboard 2nd cohort of 30 international technical specialists.",
      "Adapt solar inverter firmware & hardware to standard EU grid codes (VDE, EN 50549).",
      "Secure external grant disbursement and private investor co-funding.",
      "Expand spousal job placement & local community integration programs in Teisnach."
    ],
    targetMetric: "Target: 60 Total Hires Cumulative & Full EU Compliance",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  },
  y45: {
    year: "Years 4–5",
    phase: "Full European Scale & 90 Specialist Retention",
    status: "Strategic Horizon",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    headline: "Reach 90 Retained Foreign Specialists & Commercial EU Solar Launch",
    summary: "Complete the 3-year talent intake of 90 high-tech engineers, achieve 90%+ retention in Landkreis Regen, and scale SunTech solar inverter sales across all key European markets with regional service hubs.",
    deliverables: [
      "Reach final target of 90 retained international engineering specialists.",
      "Full commercial sales launch across Germany, DACH region, and Southern/Central EU.",
      "Establish regional technical customer service & inverter support hubs in Europe.",
      "Solidify SunTech Werk Teisnach as Bavaria's leading sustainable solar tech employer."
    ],
    targetMetric: "Target: 90 Retained Specialists & Commercial Market Leadership",
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V14.37M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  }
};

function initRoadmap() {
  const stageNodes = document.querySelectorAll('.roadmap-stage-node');
  const detailsContainer = document.getElementById('roadmap-stage-details');

  if (!detailsContainer) return;

  function renderRoadmapStage(key) {
    const data = roadmapData[key];
    if (!data) return;

    detailsContainer.innerHTML = `
      <div class="glass-card rounded-2xl p-8 border border-amber-200/80 shadow-xl animate-fadeIn">
        <div class="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-slate-100 pb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-md">
              ${data.icon}
            </div>
            <div>
              <span class="inline-block px-3 py-1 text-xs font-bold rounded-full mb-1 border ${data.badgeColor}">
                ${data.phase} • ${data.status}
              </span>
              <h3 class="text-2xl font-extrabold text-navy-900">${data.year}: ${data.headline}</h3>
            </div>
          </div>
          <div class="bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-amber-900 text-sm font-semibold">
            ${data.targetMetric}
          </div>
        </div>

        <p class="text-slate-600 text-base leading-relaxed mb-6">
          ${data.summary}
        </p>

        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Action Milestones & Key Steps</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${data.deliverables.map(step => `
            <div class="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all">
              <span class="w-6 h-6 rounded-full bg-navy-900 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">▶</span>
              <span class="text-slate-800 text-sm font-medium leading-normal">${step}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  stageNodes.forEach(node => {
    node.addEventListener('click', () => {
      stageNodes.forEach(n => {
        n.classList.remove('ring-4', 'ring-amber-400', 'bg-navy-900', 'text-amber-400', 'scale-105');
        n.classList.add('bg-white', 'text-navy-900');
      });

      node.classList.remove('bg-white', 'text-navy-900');
      node.classList.add('ring-4', 'ring-amber-400', 'bg-navy-900', 'text-amber-400', 'scale-105');

      const stageKey = node.getAttribute('data-stage');
      renderRoadmapStage(stageKey);
    });
  });

  // Render Y1 initially
  renderRoadmapStage('y1');
}

/* ==========================================================================
   4. ACADEMIC & FINANCIAL RESEARCH LOG
   ========================================================================== */
const researchSources = [
  {
    id: "destatis",
    title: "Destatis Press Release No. PE25_446_12",
    category: "demographics",
    categoryName: "Demographics",
    author: "Federal Statistical Office of Germany (Destatis)",
    year: "2025/2026",
    relevance: "Proves structural working-age population shrinkage in rural Bavarian districts like Landkreis Regen, mandating international skilled talent attraction.",
    citationText: "According to Destatis projections (PE25_446_12), rural administrative districts in eastern Bavaria face up to a 15-22% decline in working-age individuals by 2035 without net international migration inflows.",
    linkText: "View Destatis Demographic Report Details"
  },
  {
    id: "dit",
    title: "TH Deggendorf (DIT) Internationalization Report",
    category: "university",
    categoryName: "University Pipeline",
    author: "Technische Hochschule Deggendorf",
    year: "2025",
    relevance: "Confirms DIT's robust international talent pool (40%+ international students in STEM & engineering master's programs).",
    citationText: "TH Deggendorf (DIT) and its regional campuses in Deggendorf & Cham maintain over 40% international enrollment in High-Tech, Electrical Engineering, and Solar Energy systems, forming an ideal immediate pipeline for Werk Teisnach.",
    linkText: "Explore DIT University Pipeline Data"
  },
  {
    id: "esf",
    title: "ESF+ & Arbeitsmarktfonds Bayern Guidelines",
    category: "grants",
    categoryName: "Public Funding",
    author: "European Social Fund & Bavarian Ministry of Family, Labor & Social Affairs",
    year: "2024-2026 Framework",
    relevance: "Defines co-funding mechanisms providing 50-80% grants for language training, mentorship programs, and workplace integration.",
    citationText: "Programs funded via ESF+ and Arbeitsmarktfonds Bayern provide non-repayable grants to regional mid-sized industrial employers for qualified mentor compensation, dual-language materials, and spousal placement initiatives.",
    linkText: "Review ESF+ & Bavarian Subsidy Guidelines"
  },
  {
    id: "fraunhofer",
    title: "Fraunhofer ISE Photovoltaics Market Report",
    category: "market",
    categoryName: "Solar Market",
    author: "Fraunhofer Institute for Solar Energy Systems ISE",
    year: "2025",
    relevance: "Validates 3-to-5-year European market expansion potential for premium German-engineered solar inverters.",
    citationText: "European solar PV installation capacity is projected to maintain 14-18% CAGR through 2030. Expanding sales of decentralized, highly efficient solar inverters into Central & Eastern Europe offers high margin stability for SunTech GmbH.",
    linkText: "Inspect Fraunhofer Solar Market Forecast"
  }
];

function initResearchLog() {
  const tableBody = document.getElementById('research-table-body');
  const searchInput = document.getElementById('research-search');
  const filterButtons = document.querySelectorAll('.research-filter-btn');
  const modal = document.getElementById('research-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalCitation = document.getElementById('modal-citation');
  const modalRelevance = document.getElementById('modal-relevance');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (!tableBody) return;

  let currentCategory = 'all';

  function renderTable() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    const filtered = researchSources.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchSearch = item.title.toLowerCase().includes(query) ||
                          item.relevance.toLowerCase().includes(query) ||
                          item.author.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="py-8 text-center text-slate-500 font-medium">
            No research entries match your search criteria.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(item => `
      <tr class="hover:bg-amber-50/50 transition-colors border-b border-slate-100 text-sm">
        <td class="py-4 px-4 font-bold text-navy-900">${item.title}</td>
        <td class="py-4 px-4 text-slate-600">${item.author}</td>
        <td class="py-4 px-4">
          <span class="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            ${item.categoryName}
          </span>
        </td>
        <td class="py-4 px-4 text-slate-600 max-w-md line-clamp-2">${item.relevance}</td>
        <td class="py-4 px-4 text-right">
          <button data-id="${item.id}" class="view-research-btn inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline">
            Inspect Citation
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </button>
        </td>
      </tr>
    `).join('');

    // Attach click handlers
    document.querySelectorAll('.view-research-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openModal(id);
      });
    });
  }

  function openModal(id) {
    const item = researchSources.find(s => s.id === id);
    if (!item || !modal) return;

    modalTitle.textContent = item.title;
    modalAuthor.textContent = `${item.author} (${item.year})`;
    modalCitation.textContent = `"${item.citationText}"`;
    modalRelevance.textContent = item.relevance;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-navy-900', 'text-amber-400');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      btn.classList.add('bg-navy-900', 'text-amber-400');

      currentCategory = btn.getAttribute('data-filter');
      renderTable();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderTable);
  }

  renderTable();
}

/* ==========================================================================
   5. INTERACTIVE TALENT & ROI FINANCIAL CALCULATOR
   ========================================================================== */
function initCalculator() {
  const hireSlider = document.getElementById('calc-hires');
  const hireVal = document.getElementById('calc-hires-val');

  const fundingSlider = document.getElementById('calc-funding');
  const fundingVal = document.getElementById('calc-funding-val');

  const exportSlider = document.getElementById('calc-export');
  const exportVal = document.getElementById('calc-export-val');

  const resultGrant = document.getElementById('calc-result-grant');
  const resultMentor = document.getElementById('calc-result-mentor');
  const resultEbitda = document.getElementById('calc-result-ebitda');

  if (!hireSlider) return;

  function calculate() {
    const hiresPerYear = parseInt(hireSlider.value);
    const fundingPercent = parseInt(fundingSlider.value);
    const exportGrowth = parseInt(exportSlider.value);

    // Update label displays
    if (hireVal) hireVal.textContent = `${hiresPerYear} Hires / Yr`;
    if (fundingVal) fundingVal.textContent = `${fundingPercent}% EU Co-Funding`;
    if (exportVal) exportVal.textContent = `+${exportGrowth}% Annual Growth`;

    // Calculation Logic
    // Total 3-year hires = hiresPerYear * 3
    const total3YrHires = hiresPerYear * 3;
    
    // Estimated integration & training cost per recruit = €15,000
    const grossIntegrationCost = total3YrHires * 15000;
    
    // Public Grant Subsidy (€ Saved) = grossIntegrationCost * (fundingPercent / 100)
    const publicGrantSubsidy = grossIntegrationCost * (fundingPercent / 100);

    // Tandem Mentor Bonus Pool (15% of public grant savings allocated to legacy staff mentors)
    const mentorPool = publicGrantSubsidy * 0.18;

    // Projected EBITDA Growth: Base EBITDA €12.5M. Export growth + workforce capacity multiplier
    const capacityMultiplier = (total3YrHires / 90);
    const additionalEbitda = (12.5 * (exportGrowth / 100) * 0.4) * capacityMultiplier;
    const projectedTotalEbitda = 12.5 + additionalEbitda;

    // Format outputs
    if (resultGrant) resultGrant.textContent = `€${(publicGrantSubsidy / 1000000).toFixed(2)}M`;
    if (resultMentor) resultMentor.textContent = `€${Math.round(mentorPool / 1000).toLocaleString('de-DE')}k`;
    if (resultEbitda) resultEbitda.textContent = `€${projectedTotalEbitda.toFixed(1)}M / Year`;
  }

  hireSlider.addEventListener('input', calculate);
  fundingSlider.addEventListener('input', calculate);
  exportSlider.addEventListener('input', calculate);

  calculate();
}

/* ==========================================================================
   6. CONTACT FORM WITH TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('suntech-contact-form');
  const toast = document.getElementById('contact-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Inquiry...
      `;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message to Team 1`;
      }
      form.reset();

      if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('flex', 'animate-bounce');
        setTimeout(() => {
          toast.classList.add('hidden');
          toast.classList.remove('flex', 'animate-bounce');
        }, 5000);
      }
    }, 1200);
  });
}

/* ==========================================================================
   7. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

/* ==========================================================================
   8. SCROLLSPY ACTIVE NAV HIGHLIGHTING
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active', 'text-amber-500', 'font-bold');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active', 'text-amber-500', 'font-bold');
          }
        });
      }
    });
  });
}
