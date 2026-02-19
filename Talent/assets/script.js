
/* --- Data --- */
const CATEGORIES = [
  { id: 'Technology', title: 'Technology', description: 'Cloud architects, code masters, and tech troubleshooters.', icon: '💻', colorBg: 'var(--color-tech-bg)', colorText: 'var(--color-tech-text)' },
  { id: 'Speakers', title: 'Speakers', description: 'Confident presenters and storytellers for your next big stage.', icon: '🎙️', colorBg: 'var(--color-speaker-bg)', colorText: 'var(--color-speaker-text)' },
  { id: 'Writers', title: 'Writers', description: 'Creative copywriters and technical documentation experts.', icon: '✍️', colorBg: 'var(--color-writer-bg)', colorText: 'var(--color-writer-text)' },
  { id: 'Media', title: 'Media', description: 'Visual designers, video editors, and newsletter creators.', icon: '📸', colorBg: 'var(--color-media-bg)', colorText: 'var(--color-media-text)' },
  { id: 'Events', title: 'Event Organizers', description: 'Logistics wizards and community gathering experts.', icon: '🗓️', colorBg: 'var(--color-event-bg)', colorText: 'var(--color-event-text)' }
];

const TALENTS = [
  {
    id: '1', name: 'Khalid Alyahya', department: 'GIDD STU', category: 'Media',
    skills: ['Web developer', 'After Effects', 'Photography'],
    expertLevel: 'Senior',
    imageUrl: '',
    email: 'ikhalod@gmail.com', bio: 'Video editor specializing in short-form internal communication content.',
    projects: ['New Product Launch Video', 'CEO Quarterly Vlog']
  },
  {
    id: '2', name: 'Abdulmajeed Alzahrani', department: 'NAGO Digital', category: 'Technology',
    skills: ['Web developer', 'After Effects', 'Photography'],
    expertLevel: 'Expert',
    imageUrl: '',
    email: 'ikhalod@gmail.com', bio: 'Video editor specializing in short-form internal communication content.',
    projects: ['New Product Launch Video', 'CEO Quarterly Vlog']
  },
  {
    id: '3', name: 'Fahad Alqahtani', department: 'GIDD OJT', category: 'Writers',
    skills: ['Web developer', 'After Effects', 'Photography'],
    expertLevel: 'Mid',
    imageUrl: '',
    email: 'ikhalod@gmail.com', bio: 'Video editor specializing in short-form internal communication content.',
    projects: ['New Product Launch Video', 'CEO Quarterly Vlog']
  },
  {
    id: '4', name: 'Ahmed Abdulmoti', department: 'USSSSD', category: 'Speakers',
    skills: ['Presenter'],
    expertLevel: 'Senior',
    imageUrl: '',
    email: 'Ahmed@aramco.com', bio: 'Experienced public speaker and corporate trainer.',
    projects: ['Leadership Workshop', 'Annual Tech Conference']
  }
];

/* --- Router --- */
const app = document.getElementById('app');

function router() {
  const hash = window.location.hash || '#home';
  const path = hash.split('?')[0]; // simple split to handle params if we added them later
  const params = new URLSearchParams(hash.split('?')[1]);

  // Scroll to top
  window.scrollTo(0, 0);

  // Clear App
  if (app) app.innerHTML = '';

  if (path === '#home') {
    renderHome();
  } else if (path === '#talents') {
    renderTalentList();
  } else if (path === '#apply') {
    renderApply();
  } else if (path === '#request') {
    renderRequestTalent(params.get('id'));
  } else {
    renderHome();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/* --- Views --- */

function renderHome() {
  const container = document.createElement('div');

  // Hero Section
  const heroSection = document.createElement('section');
  heroSection.className = 'container animate-slide-up';
  heroSection.style.paddingTop = '160px';
  heroSection.style.paddingBottom = '100px';
  heroSection.style.textAlign = 'center';

  heroSection.innerHTML = `
    <span class="badge" style="background:#fff; border:1px solid #eee; margin-bottom: 32px; color: #666;">
      Internal Knowledge Economy
    </span>
    <h1 class="text-huge font-bold" style="margin-bottom: 32px;">
      The skillset of <br />
      <span class="gradient-text">the whole office.</span>
    </h1>
    <p class="text-xl text-gray" style="max-width: 600px; margin: 0 auto 48px auto;">
      Your colleagues are more than their job titles. 
      Discover hidden experts and build better things together.
    </p>
    <div class="flex justify-center gap-4" style="flex-wrap: wrap;">
      <a href="#talents" class="btn btn-primary">Explore the Bank</a>
      <a href="#apply" class="btn btn-secondary">Join the Network</a>
    </div>
  `;
  container.appendChild(heroSection);

  // Featured Experts Section
  const featuredSection = document.createElement('section');
  featuredSection.className = 'container';
  featuredSection.style.paddingBottom = '100px';

  const featuredHeader = document.createElement('div');
  featuredHeader.className = 'flex justify-between items-end';
  featuredHeader.style.marginBottom = '48px';
  featuredHeader.innerHTML = `
    <div>
      <h2 class="text-3xl font-bold">Meet the Experts</h2>
      <p class="text-gray">Top-rated talents ready to collaborate.</p>
    </div>
    <a href="#talents" class="text-accent font-bold text-sm">View all experts →</a>
  `;
  featuredSection.appendChild(featuredHeader);

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-3 gap-8';

  // CRITITAL: Only show 3 items on the home page
  const featured = TALENTS.slice(0, 3);

  featured.forEach(talent => {
    grid.appendChild(createTalentCard(talent));
  });

  featuredSection.appendChild(grid);
  container.appendChild(featuredSection);

  // Categories Section
  const catSection = document.createElement('section');
  catSection.className = 'container';
  catSection.style.paddingBottom = '80px';

  catSection.innerHTML = `
    <div style="margin-bottom: 48px;">
      <h2 class="text-3xl font-bold">Categories</h2>
      <p class="text-gray">Browse by specialization.</p>
    </div>
  `;

  const catGrid = document.createElement('div');
  catGrid.className = 'grid grid-cols-5 gap-6';

  CATEGORIES.forEach(cat => {
    const card = document.createElement('a');
    card.href = `#talents?category=${cat.id}`;
    card.className = 'cat-card card';
    card.innerHTML = `
      <div>
        <div class="cat-icon" style="background: ${cat.colorBg}; color: ${cat.colorText};">
          ${cat.icon}
        </div>
        <h3 class="text-lg font-bold">${cat.title}</h3>
        <p class="text-xs text-gray" style="margin-top: 8px; line-height: 1.6;">${cat.description}</p>
      </div>
    `;
    // Handle query param routing cleanly
    card.onclick = (e) => {
      e.preventDefault();
      window.location.hash = `#talents?category=${cat.id}`;
    };
    catGrid.appendChild(card);
  });

  catSection.appendChild(catGrid);
  container.appendChild(catSection);

  app.appendChild(container);

  // Animate elements sequentially
}

function renderTalentList() {
  const container = document.createElement('div');
  container.className = 'container';
  container.style.paddingTop = '140px';
  container.style.paddingBottom = '100px';

  // State
  let state = {
    search: '',
    category: 'All',
    expertLevel: 'All',
    sortBy: 'nameAsc', // nameAsc, nameDesc
    viewMode: 'grid' // grid, table
  };

  // Parse query params for category
  const rawHash = window.location.hash; // #talents?category=Foo
  if (rawHash.includes('?')) {
    const params = new URLSearchParams(rawHash.split('?')[1]);
    state.category = params.get('category') || 'All';
  }

  // Header
  const header = document.createElement('div');
  header.className = 'flex flex-col md:flex-row justify-between items-end gap-8';
  header.style.marginBottom = '40px';

  header.innerHTML = `
    <div>
      <h1 class="text-3xl lg:text-5xl font-bold mb-4">Expert Directory</h1>
      <p class="text-xl text-gray">Browse the internal collective.</p>
    </div>
  `;
  container.appendChild(header);

  // Controls Bar
  const controls = document.createElement('div');
  controls.className = 'controls-bar';
  controls.style.marginBottom = '40px';

  // Search
  const searchInput = document.createElement('input');
  searchInput.className = 'input input-sm input-search';
  searchInput.placeholder = 'Search skills or names...';
  searchInput.style.width = '280px';
  searchInput.addEventListener('input', (e) => {
    state.search = e.target.value.toLowerCase();
    renderTalentView(viewContainer, state);
  });
  controls.appendChild(searchInput);

  // Category Filter
  const categorySelect = document.createElement('select');
  categorySelect.className = 'input input-sm';
  categorySelect.style.width = '160px';
  categorySelect.style.cursor = 'pointer';
  categorySelect.innerHTML = `<option value="All">All Categories</option>`;
  CATEGORIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.innerText = c.title;
    if (c.id === state.category) opt.selected = true;
    categorySelect.appendChild(opt);
  });
  categorySelect.addEventListener('change', (e) => {
    state.category = e.target.value;
    renderTalentView(viewContainer, state);
  });
  controls.appendChild(categorySelect);

  // Expert Level Filter
  const levelSelect = document.createElement('select');
  levelSelect.className = 'input input-sm';
  levelSelect.style.width = '140px';
  levelSelect.style.cursor = 'pointer';
  levelSelect.innerHTML = `
    <option value="All">All Levels</option>
    <option value="Junior">Junior</option>
    <option value="Mid">Mid</option>
    <option value="Senior">Senior</option>
    <option value="Expert">Expert</option>
  `;
  levelSelect.addEventListener('change', (e) => {
    state.expertLevel = e.target.value;
    renderTalentView(viewContainer, state);
  });
  controls.appendChild(levelSelect);

  // Sort By
  const sortSelect = document.createElement('select');
  sortSelect.className = 'input input-sm';
  sortSelect.style.width = '160px';
  sortSelect.style.cursor = 'pointer';
  sortSelect.innerHTML = `
    <option value="nameAsc">Name (A-Z)</option>
    <option value="nameDesc">Name (Z-A)</option>
  `;
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderTalentView(viewContainer, state);
  });
  controls.appendChild(sortSelect);

  // View Toggle
  const viewToggle = document.createElement('div');
  viewToggle.className = 'view-toggle';

  const gridBtn = document.createElement('div');
  gridBtn.className = 'view-toggle-btn active';
  gridBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
  `;
  gridBtn.onclick = () => {
    state.viewMode = 'grid';
    gridBtn.classList.add('active');
    tableBtn.classList.remove('active');
    renderTalentView(viewContainer, state);
  };

  const tableBtn = document.createElement('div');
  tableBtn.className = 'view-toggle-btn';
  tableBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
  `;
  tableBtn.onclick = () => {
    state.viewMode = 'table';
    tableBtn.classList.add('active');
    gridBtn.classList.remove('active');
    renderTalentView(viewContainer, state);
  };

  viewToggle.appendChild(gridBtn);
  viewToggle.appendChild(tableBtn);
  controls.appendChild(viewToggle);

  container.appendChild(controls);

  // View Container
  const viewContainer = document.createElement('div');
  renderTalentView(viewContainer, state);
  container.appendChild(viewContainer);

  app.appendChild(container);
}

function renderTalentView(container, state) {
  container.innerHTML = '';

  // Filter
  let filtered = TALENTS.filter(t => {
    const matchesCat = state.category === 'All' || t.category === state.category;
    const matchesLevel = state.expertLevel === 'All' || t.expertLevel === state.expertLevel;
    const matchesSearch = t.name.toLowerCase().includes(state.search) ||
      t.skills.some(s => s.toLowerCase().includes(state.search));

    return matchesCat && matchesLevel && matchesSearch;
  });

  // Sort
  filtered.sort((a, b) => {
    if (state.sortBy === 'nameAsc') return a.name.localeCompare(b.name);
    if (state.sortBy === 'nameDesc') return b.name.localeCompare(a.name);
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding: 100px 0;">
        <div style="font-size: 64px; margin-bottom: 24px;">🔭</div>
        <h3 class="text-2xl font-bold text-gray">No experts found</h3>
        <p class="text-gray">Try adjusting your filters.</p>
      </div>
    `;
    return;
  }

  if (state.viewMode === 'grid') {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-3 gap-8';
    filtered.forEach(t => grid.appendChild(createTalentCard(t)));
    container.appendChild(grid);
  } else {
    // Table View
    const tableContainer = document.createElement('div');
    tableContainer.className = 'talent-table-container';

    const table = document.createElement('table');
    table.className = 'talent-table';

    table.innerHTML = `
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Department</th>
          <th>Role</th>
          <th>Level</th>
          <th>Skills</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    tableContainer.appendChild(table);
    container.appendChild(tableContainer);

    // Quick fix: Re-implement table generation to use nodes to support click handlers easier
    filtered.forEach(t => {
      table.querySelector('tbody').appendChild(createTalentRowNode(t));
    });
  }
}

function renderApply() {
  const container = document.createElement('div');
  container.className = 'container animate-slide-up';
  container.style.paddingTop = '140px';
  container.style.paddingBottom = '100px';

  container.innerHTML = `
    <div class="text-center" style="margin-bottom: 60px;">
      <h1 class="text-5xl font-bold mb-4">Apply to the Bank</h1>
      <p class="text-xl text-gray">Share your passions with the team.</p>
    </div>
  `;

  const formCard = document.createElement('form');
  formCard.className = 'card';
  formCard.style.maxWidth = '800px';
  formCard.style.margin = '0 auto';
  formCard.style.cursor = 'default';

  formCard.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 form-group">
      <div>
        <label class="label">Full Name</label>
        <input required type="text" class="input" placeholder="Example: Khaled F Alyahya">
      </div>
      <div>
        <label class="label">Work Email</label>
        <input required type="email" class="input" placeholder="Example: UserID@Aramco.com">
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 form-group">
      <div>
        <label class="label">Division</label>
        <input required type="text" class="input" placeholder="Example: GIDD">
      </div>
      <div>
        <label class="label">Category</label>
        <select class="input">
          ${CATEGORIES.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="form-group">
      <label class="label">Key Skills</label>
      <input required type="text" class="input" placeholder="Example: Excel, Speaker, Power Bi...">
    </div>

    <div class="form-group">
      <label class="label">Elevator Pitch</label>
      <textarea required rows="5" class="input" style="resize:none;" placeholder="How can you help?"></textarea>
    </div>

    <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; margin-top: 16px;">
      Join the Collective
    </button>
  `;

  formCard.addEventListener('submit', (e) => {
    e.preventDefault();
    container.innerHTML = `
      <div style="padding: 100px 0; text-center;" class="animate-zoom-in">
        <div style="width: 80px; height: 80px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 32px auto;">✓</div>
        <h1 class="text-3xl font-bold mb-4">Application Sent.</h1>
        <p class="text-gray mb-8">We will review your profile shortly.</p>
        <a href="#talents" class="btn btn-primary">Return to Directory</a>
      </div>
    `;
  });

  container.appendChild(formCard);
  app.appendChild(container);
}

function renderRequestTalent(talentId) {
  const talent = TALENTS.find(t => t.id === talentId);
  const container = document.createElement('div');
  container.className = 'container animate-slide-up';
  container.style.paddingTop = '140px';
  container.style.paddingBottom = '100px';

  if (!talent) {
    container.innerHTML = `
      <div class="text-center" style="padding: 100px 0;">
         <h1 class="text-2xl font-bold text-gray">Talent Not Found</h1>
         <a href="#talents" class="btn btn-primary" style="margin-top:20px;">Return to Directory</a>
      </div>
    `;
    app.appendChild(container);
    return;
  }

  container.innerHTML = `
    <div class="text-center" style="margin-bottom: 60px;">
      <h1 class="text-5xl font-bold mb-4">Request Talent</h1>
      <p class="text-xl text-gray">Initiate a collaboration with <span class="text-accent font-bold">${talent.name}</span>.</p>
    </div>
  `;

  const formCard = document.createElement('form');
  formCard.className = 'card';
  formCard.style.maxWidth = '800px';
  formCard.style.margin = '0 auto';
  formCard.style.cursor = 'default';

  formCard.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 form-group">
      <div>
        <label class="label">Requester Name</label>
        <input required type="text" class="input" placeholder="Your Name">
      </div>
      <div>
        <label class="label">Requester Email</label>
        <input required type="email" class="input" placeholder="Your Work Email">
      </div>
    </div>
    
    <div class="form-group">
       <label class="label">Project Title</label>
       <input required type="text" class="input" placeholder="Short title for this engagement">
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 form-group">
      <div>
        <label class="label">Estimated Duration</label>
        <select class="input">
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>1 Month</option>
          <option>Ongoing</option>
        </select>
      </div>
      <div>
        <label class="label">Approving Supervisor</label>
        <input required type="text" class="input" placeholder="Supervisor Name or ID">
      </div>
    </div>

    <div class="form-group">
      <label class="label">Project Impact & Description</label>
      <textarea required rows="5" class="input" style="resize:none;" placeholder="Describe why you need this specific talent..."></textarea>
    </div>

    <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; margin-top: 16px;">
      Submit Request
    </button>
  `;

  formCard.addEventListener('submit', (e) => {
    e.preventDefault();
    container.innerHTML = `
      <div style="padding: 100px 0; text-center;" class="animate-zoom-in">
        <div style="width: 80px; height: 80px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 32px auto;">✓</div>
        <h1 class="text-3xl font-bold mb-4">Request Initiated.</h1>
        <p class="text-gray mb-8">Workflow #${Math.floor(Math.random() * 10000)} has been triggered to supervisor.</p>
        <a href="#talents" class="btn btn-primary">Return to Directory</a>
      </div>
    `;
  });

  container.appendChild(formCard);
  app.appendChild(container);
}


/* --- Components --- */

function createTalentCard(talent) {
  const div = document.createElement('div');
  div.className = 'card talent-card';
  div.onclick = (e) => {
    // Only open modal if not clicking buttons
    if (!e.target.closest('.btn-action')) {
      openModal(talent);
    }
  };

  // Skills HTML
  const skillsHtml = talent.skills.slice(0, 3).map(s =>
    `<span style="background:var(--color-tech-bg); color:var(--color-tech-text); padding:4px 8px; border-radius:8px; font-size:11px; font-weight:700;">${s}</span>`
  ).join('');

  div.innerHTML = `
    <div class="flex justify-between items-start mb-6">
      <div class="card-image-container">
        <img src="${talent.imageUrl || 'assets/SVGs/user-placeholder.svg'}" class="card-img" alt="${talent.name}">
      </div>
      <div style="text-align: right;">
        <span class="badge" style="background:#f3f4f6; color:#6b7280; margin-bottom: 4px;">${talent.category}</span>
        <div class="text-xs font-bold text-gray">${talent.department}</div>
      </div>
    </div>
    
    <h3 class="text-xl font-bold mb-2">${talent.name}</h3>
    <p class="text-sm text-gray" style="margin-bottom: 24px; font-style: italic; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">"${talent.bio}"</p>
    
    <div class="flex gap-2 mb-6" style="flex-wrap: wrap;">
      ${skillsHtml}
    </div>

    <div class="flex gap-2 mt-auto">
      <div class="btn btn-primary btn-action" style="flex:1; padding: 12px; font-size: 13px;" onclick="window.location.hash='#request?id=${talent.id}'">Request</div>
      <div class="btn btn-secondary btn-action" style="flex:1; padding: 12px; font-size: 13px;" onclick="openModal(TALENTS.find(t=>t.id=='${talent.id}'))">Profile</div>
    </div>
  `;

  return div;
}

function createTalentRowNode(talent) {
  const tr = document.createElement('tr');
  tr.style.cursor = 'pointer';
  tr.onclick = (e) => {
    if (!e.target.closest('.btn-action-table')) {
      openModal(talent);
    }
  };

  const skillsHtml = talent.skills.slice(0, 2).map(s =>
    `<span style="background:var(--color-tech-bg); color:var(--color-tech-text); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700; margin-right:4px;">${s}</span>`
  ).join('');

  const levelColor = {
    'Expert': '#dbeafe',
    'Senior': '#f3e8ff',
    'Mid': '#fff7ed',
    'Junior': '#f0fdf4'
  }[talent.expertLevel] || '#f3f4f6';

  const levelText = {
    'Expert': '#1e40af',
    'Senior': '#6b21a8',
    'Mid': '#c2410c',
    'Junior': '#15803d'
  }[talent.expertLevel] || '#374151';

  tr.innerHTML = `
    <td>
      <img src="${talent.imageUrl || 'assets/SVGs/user-placeholder.svg'}" class="table-avatar">
    </td>
    <td>
      <div class="font-bold text-sm">${talent.name}</div>
      <div class="text-xs text-gray">${talent.email}</div>
    </td>
    <td>
      <span class="text-sm">${talent.department}</span>
    </td>
    <td>
      <span class="text-sm font-bold">${talent.category}</span>
    </td>
    <td>
      <span class="badge" style="background:${levelColor}; color:${levelText}; font-size:10px;">
        ${talent.expertLevel || 'N/A'}
      </span>
    </td>
    <td>
      <div class="flex items-center">
        ${skillsHtml}
        ${talent.skills.length > 2 ? `<span class="text-xs text-gray">+${talent.skills.length - 2}</span>` : ''}
      </div>
    </td>
    <td style="text-align: right;">
       <div class="flex gap-2 justify-end">
          <button class="btn-action-table text-accent font-bold text-xs" style="background:none; border:none; cursor:pointer;" onclick="window.location.hash='#request?id=${talent.id}'">Request</button>
          <span class="text-gray text-xs">|</span>
          <button class="btn-action-table text-gray font-bold text-xs" style="background:none; border:none; cursor:pointer;" onclick="openModal(TALENTS.find(t=>t.id=='${talent.id}'))">View</button>
       </div>
    </td>
  `;

  return tr;
}

function openModal(talent) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  const content = document.createElement('div');
  content.className = 'modal-content';

  content.innerHTML = `
    <div class="modal-close">✕</div>
    <div class="modal-header">
      <div class="modal-avatar-container">
        <div style="position:relative;">
          <img src="${talent.imageUrl || 'assets/SVGs/user-placeholder.svg'}" class="modal-avatar">
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="flex justify-between items-start mb-6" style="padding-left: 140px;">
        <div>
          <h2 class="text-2xl font-bold">${talent.name}</h2>
          <div class="flex items-center gap-2 mt-1">
             <span class="text-gray font-bold">${talent.department} • ${talent.category}</span>
             <span class="badge" style="background:#f3f4f6; color:#1d1d1f;">${talent.expertLevel || 'N/A'}</span>
          </div>
        </div>
        <div class="flex gap-2">
            <a href="#request?id=${talent.id}" class="btn btn-primary" onclick="document.querySelector('.modal-backdrop').remove(); document.body.removeAttribute('style');">Request Talent</a>
            <a href="mailto:${talent.email}" class="btn btn-secondary">Contact</a>
        </div>
      </div>

      <div style="margin-top: 40px;" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h4 class="label">About</h4>
           <p class="text-gray" style="line-height: 1.6;">${talent.bio}</p>
        </div>
        <div>
           <h4 class="label">Projects</h4>
           <ul style="list-style: disc; padding-left: 20px;" class="text-gray text-sm">
             ${(talent.projects || []).map(p => `<li style="margin-bottom:8px;">${p}</li>`).join('')}
           </ul>
        </div>
      </div>
    </div>
  `;

  backdrop.appendChild(content);
  document.body.appendChild(backdrop);

  // Close Logic
  const close = () => {
    document.body.removeAttribute('style');
    backdrop.remove();
  };

  backdrop.querySelector('.modal-close').onclick = close;
  backdrop.onclick = (e) => {
    if (e.target === backdrop) close();
  };
}

/* --- Scroll Effect --- */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});
