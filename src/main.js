import { runSimulation, PRESETS } from './agentSimulator.js';

// State management
let state = {
  activeTab: 'productivity',
  activeAgentRun: false,
  memory: [
    { text: 'Prefers vegetarian meals during long-haul travel.', id: 1 },
    { text: 'Focus time hours preferred: 09:00 - 12:00.', id: 2 },
    { text: 'Always include 15-minute buffers between scheduling meetings.', id: 3 }
  ],
  tasks: {
    P1: [
      { text: 'Review draft report for tomorrow', completed: false, id: 101 }
    ],
    P2: [
      { text: 'Reply to client email inbox', completed: false, id: 102 },
      { text: 'Refill monthly medication prescription', completed: true, id: 103 }
    ],
    P3: [
      { text: 'Water the home plants', completed: true, id: 104 },
      { text: 'Organize laptop downloads folder', completed: false, id: 105 }
    ],
    P4: [
      { text: 'Research local weekend park trails', completed: false, id: 106 }
    ]
  },
  schedule: [
    { time: '09:00', title: 'Deep Work: Review drafts', duration: '90m', type: 'deep-work', id: 201 },
    { time: '10:30', title: 'Buffer Break / Walk', duration: '15m', type: 'break', id: 202 },
    { time: '10:45', title: 'Focus Session: Solve inbox issues', duration: '90m', type: 'deep-work', id: 203 },
    { time: '12:15', title: 'Screen-Free Lunch', duration: '60m', type: 'break', id: 204 }
  ],
  itinerary: {
    destination: 'Kyoto, Japan',
    budgetTotal: '$2,500',
    budgetSpent: '$1,850',
    currentDay: 1,
    packingList: [
      { text: 'Passport & JR Rail Pass', checked: true },
      { text: 'Comfortable walking shoes', checked: false },
      { text: 'Universal power adapter', checked: false },
      { text: 'Yen currency (cash)', checked: true }
    ],
    days: []
  },
  consentCallback: null
};

// Initialize UI Elements
document.addEventListener('DOMContentLoaded', () => {
  // Lucide icons init
  lucide.createIcons();
  
  // Render Initial state widgets
  renderAllWidgets();

  // Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      switchTab(tabName);
    });
  });

  // Chat Submit
  const chatForm = document.getElementById('chat-input-form');
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleChatSubmit();
  });

  // Prompt Presets
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetType = chip.dataset.preset;
      let promptText = '';
      if (presetType === 'travel') promptText = 'Plan a 4-day culture trip to Kyoto with a moderate budget.';
      if (presetType === 'schedule') promptText = 'Optimize my study schedule for tomorrow, including breaks.';
      if (presetType === 'tasks') promptText = 'Prioritize these tasks: submit project report draft, laundry, scheduling doctor checkup next week.';
      if (presetType === 'summary') promptText = 'Summarize meeting notes: Sarah to review budget before Friday noon, beta launch July 10.';
      
      const input = document.getElementById('chat-user-input');
      input.value = promptText;
      handleChatSubmit();
    });
  });

  // Quick Widget Creators
  document.getElementById('widget-task-form').addEventListener('submit', handleAddTask);
  document.getElementById('widget-schedule-form').addEventListener('submit', handleAddScheduleEvent);
  document.getElementById('add-memory-form').addEventListener('submit', handleAddMemory);
  
  // Toggles inside Widgets
  document.getElementById('add-schedule-item-btn').addEventListener('click', () => {
    document.getElementById('widget-schedule-form').classList.toggle('hidden');
  });
  document.getElementById('close-sched-form-btn').addEventListener('click', () => {
    document.getElementById('widget-schedule-form').classList.add('hidden');
  });
  
  document.getElementById('clear-feed-btn').addEventListener('click', () => {
    document.getElementById('system-feed-logs').innerHTML = '';
    addSystemLog('System Event Console cleared.', 'system');
  });

  document.getElementById('clear-memory-btn').addEventListener('click', () => {
    state.memory = [];
    renderMemoryWidget();
    addSystemLog('Memory Bank wiped out by user.', 'error');
  });

  document.getElementById('summarize-action-btn').addEventListener('click', handleSummarizeNotes);

  // Consent Popup Buttons
  document.getElementById('consent-approve-btn').addEventListener('click', () => {
    if (state.consentCallback) state.consentCallback(true);
    closeConsentPopup();
  });
  document.getElementById('consent-deny-btn').addEventListener('click', () => {
    if (state.consentCallback) state.consentCallback(false);
    closeConsentPopup();
  });
});

// SWITCH TABS VISUALLY
function switchTab(tabName) {
  state.activeTab = tabName;
  
  // Toggle Active Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Toggle Pane visibility
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `pane-${tabName}`);
  });
}

// LOG SYSTEM MESSAGES
function addSystemLog(text, type = 'system') {
  const container = document.getElementById('system-feed-logs');
  const line = document.createElement('div');
  line.className = `feed-line ${type}-line`;
  line.textContent = `[${type.toUpperCase()}] ${text}`;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

// CHAT HANDLER
async function handleChatSubmit() {
  if (state.activeAgentRun) return; // Prevent double submit
  
  const inputEl = document.getElementById('chat-user-input');
  const query = inputEl.value.trim();
  if (!query) return;

  // Clear Input
  inputEl.value = '';
  
  // Add User Message
  appendChatBubble(query, 'user', 'You');

  // Activate agent active state
  state.activeAgentRun = true;
  document.getElementById('chat-submit-btn').disabled = true;
  document.getElementById('chat-user-input').disabled = true;
  document.getElementById('active-agents-count').textContent = '1 / 9';
  document.getElementById('system-status-text').className = 'status-value status-online';
  document.getElementById('system-status-text').textContent = 'PROCESSING';
  
  // Clear agent consoles
  document.querySelectorAll('.agent-console').forEach(c => c.textContent = 'Active...');
  document.querySelectorAll('.agent-card').forEach(c => {
    c.classList.remove('done', 'processing');
  });
  document.querySelectorAll('.phase-step').forEach(s => {
    s.classList.remove('active', 'completed');
  });

  // Run Simulation
  try {
    await runSimulation(
      query,
      // onProgress callback
      (progress) => {
        // Update Agent Cards
        const card = document.getElementById(`agent-${progress.activeAgent}`);
        if (card) {
          document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('processing'));
          card.classList.add('processing');
          
          const consoleEl = document.getElementById(`console-${progress.activeAgent}`);
          if (consoleEl) {
            consoleEl.textContent = progress.consoleText;
            consoleEl.scrollLeft = 0;
          }
        }

        // Update Phase circles
        const phaseStep = document.getElementById(progress.activePhaseId);
        if (phaseStep) {
          phaseStep.classList.add('active');
          
          // Mark previous steps as completed
          let sibling = phaseStep.previousElementSibling;
          while (sibling) {
            sibling.classList.remove('active');
            sibling.classList.add('completed');
            sibling = sibling.previousElementSibling;
          }
        }

        // Update active agents counter count
        const activeCount = document.querySelectorAll('.agent-card.processing').length || 1;
        document.getElementById('active-agents-count').textContent = `${activeCount} / 9`;

        // Update progress bar width
        document.getElementById('phase-line-progress').style.width = `${progress.progressPercent}%`;

        // Append logs
        addSystemLog(progress.sysMsg, progress.activeAgent === 'safety' ? 'safety' : 'agent');
      },
      // onComplete callback
      async (result) => {
        // Mark all agents done
        document.querySelectorAll('.agent-card').forEach(c => {
          c.classList.remove('processing');
          c.classList.add('done');
        });
        document.querySelectorAll('.phase-step').forEach(s => {
          s.classList.remove('active');
          s.classList.add('completed');
        });
        
        document.getElementById('active-agents-count').textContent = '0 / 9';
        document.getElementById('system-status-text').textContent = 'ACTIVE';

        // Add Bot message response formatted in MD
        appendChatBubble(result.finalResponse, 'bot', 'ConciergeAI', true);

        // Apply results to workspace
        await applySimulationResults(result);

        // Reset inputs
        state.activeAgentRun = false;
        document.getElementById('chat-submit-btn').disabled = false;
        document.getElementById('chat-user-input').disabled = false;
      }
    );
  } catch (error) {
    addSystemLog(`Simulation crash: ${error.message}`, 'error');
    state.activeAgentRun = false;
    document.getElementById('chat-submit-btn').disabled = false;
    document.getElementById('chat-user-input').disabled = false;
  }
}

// APPEND CHAT MESSAGE BUBBLE
function appendChatBubble(text, senderType, senderName, parseMarkdown = false) {
  const container = document.getElementById('chat-messages-container');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${senderType}-message`;
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let bodyContent = text;
  if (parseMarkdown) {
    bodyContent = formatMarkdown(text);
  } else {
    // Basic text escaping
    bodyContent = `<p>${text.replace(/\n/g, '<br>')}</p>`;
  }

  bubble.innerHTML = `
    <div class="message-meta">
      <span class="sender-name">${senderName}</span>
      <span class="message-time">${time}</span>
    </div>
    <div class="message-body">
      ${bodyContent}
    </div>
  `;

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  
  // Re-init lucide icons for newly appended DOM elements if any
  lucide.createIcons();
}

// MARKDOWN PARSER FOR CHAT BUBBLES
function formatMarkdown(md) {
  let html = md;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');
  
  // Unordered list items
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^(?:<li>.*<\/li>)+/gim, '<ul>$&</ul>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Linebreaks
  html = html.replace(/\n/g, '<br>');

  return html;
}

// APPLY SIMULATION RESULTS TO THE TAB WORKSPACES
async function applySimulationResults(result) {
  if (result.category === 'travel') {
    switchTab('itinerary');
    state.itinerary.destination = result.destination;
    state.itinerary.budgetTotal = result.budgetTotal;
    state.itinerary.budgetSpent = result.budgetSpent;
    state.itinerary.packingList = result.packingList;
    state.itinerary.days = result.itinerary;
    state.itinerary.currentDay = 1;
    
    renderItineraryWidget();
    addSystemLog('Itinerary data loaded. Destination: ' + result.destination, 'system');
    
    // Consent prompt for vegetarian food preference
    const vegetarianPref = 'Prefers vegetarian dining during travel (Kyoto Trip).';
    if (!state.memory.some(m => m.text.includes('vegetarian'))) {
      const consentGranted = await showConsentPopup(`ConciergeAI detected a preference for: "${vegetarianPref}". Allow Memory Agent to retain this context?`);
      if (consentGranted) {
        state.memory.push({ text: vegetarianPref, id: Date.now() });
        renderMemoryWidget();
        addSystemLog('Memory preference stored: Vegetarian dining.', 'safety');
      }
    }
  } 
  
  else if (result.category === 'schedule') {
    switchTab('schedule');
    state.schedule = result.timeblocks;
    renderScheduleWidget();
    addSystemLog('Time Blocks mapped to Calendar grid.', 'system');
    
    // Consent for Study focus buffer
    const schedulePref = 'Requires 15m break buffers between study work blocks.';
    if (!state.memory.some(m => m.text.includes('15m break'))) {
      const consentGranted = await showConsentPopup(`ConciergeAI wants to remember focus preference: "${schedulePref}". Do you grant permission?`);
      if (consentGranted) {
        state.memory.push({ text: schedulePref, id: Date.now() });
        renderMemoryWidget();
        addSystemLog('Memory preference stored: Study focus buffers.', 'safety');
      }
    }
  } 
  
  else if (result.category === 'productivity') {
    switchTab('productivity');
    state.tasks.P1 = result.p1 || [];
    state.tasks.P2 = result.p2 || [];
    state.tasks.P3 = result.p3 || [];
    state.tasks.P4 = result.p4 || [];
    
    // Assign IDs if missing
    Object.keys(state.tasks).forEach(pri => {
      state.tasks[pri].forEach((t, idx) => {
        if (!t.id) t.id = Date.now() + idx;
      });
    });

    renderProductivityWidget();
    addSystemLog('Tasks prioritized P1-P4 on Task Board.', 'system');
  } 
  
  else if (result.category === 'summarizer') {
    switchTab('summarizer');
    
    // Render parser output card inside summarizer tab
    const outputBox = document.getElementById('summarizer-output-box');
    const rawInput = document.getElementById('summarizer-raw-input');
    rawInput.value = result.rawText;
    
    renderSummaryOutput(result.parsedSummary);
    addSystemLog('Parsed document summary. Action items extracted.', 'system');
  }
}

// -----------------------------------------------------------------------------
// WIDGET RENDERING MODULES
// -----------------------------------------------------------------------------

function renderAllWidgets() {
  renderProductivityWidget();
  renderScheduleWidget();
  renderItineraryWidget();
  renderMemoryWidget();
}

// 1. PRODUCTIVITY WIDGET
function renderProductivityWidget() {
  const categories = ['P1', 'P2', 'P3', 'P4'];
  let totalTasks = 0;
  
  categories.forEach(pri => {
    const listEl = document.getElementById(`task-list-${pri.toLowerCase()}`);
    listEl.innerHTML = '';
    
    const items = state.tasks[pri];
    totalTasks += items.length;
    
    items.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.draggable = true;
      li.dataset.id = task.id;
      li.dataset.priority = pri;
      
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task done" />
        <span class="task-label">${task.text}</span>
        <button class="delete-task-btn" title="Delete Task"><i data-lucide="trash-2"></i></button>
      `;
      
      // Events
      li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
        task.completed = e.target.checked;
        li.classList.toggle('completed', task.completed);
        renderProductivityCounter();
      });
      
      li.querySelector('.delete-task-btn').addEventListener('click', () => {
        state.tasks[pri] = state.tasks[pri].filter(t => t.id !== task.id);
        renderProductivityWidget();
      });
      
      // Drag events
      li.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id: task.id, from: pri }));
      });
      
      listEl.appendChild(li);
    });

    // Column drop target
    const col = listEl.parentElement;
    col.addEventListener('dragover', (e) => e.preventDefault());
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      try {
        const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (dragData.from !== pri) {
          // Move task
          const taskObj = state.tasks[dragData.from].find(t => t.id === dragData.id);
          if (taskObj) {
            state.tasks[dragData.from] = state.tasks[dragData.from].filter(t => t.id !== dragData.id);
            state.tasks[pri].push(taskObj);
            renderProductivityWidget();
            addSystemLog(`Moved task to ${pri}.`, 'system');
          }
        }
      } catch (err) {}
    });
  });

  lucide.createIcons();
  renderProductivityCounter();
}

function renderProductivityCounter() {
  let count = 0;
  Object.keys(state.tasks).forEach(k => {
    count += state.tasks[k].filter(t => !t.completed).length;
  });
  document.getElementById('productivity-counter').textContent = `${count} Active Tasks`;
}

function handleAddTask(e) {
  e.preventDefault();
  const textEl = document.getElementById('new-task-text');
  const priEl = document.getElementById('new-task-priority');
  
  const text = textEl.value.trim();
  const pri = priEl.value;
  
  if (!text) return;
  
  state.tasks[pri].push({
    text: text,
    completed: false,
    id: Date.now()
  });
  
  textEl.value = '';
  renderProductivityWidget();
  addSystemLog(`Added manual task under ${pri}.`, 'system');
}

// 2. CALENDAR WIDGET
function renderScheduleWidget() {
  const timelineGrid = document.getElementById('calendar-timeline-grid');
  timelineGrid.innerHTML = '';
  
  // Sort schedule times
  state.schedule.sort((a, b) => a.time.localeCompare(b.time));
  
  state.schedule.forEach(event => {
    const row = document.createElement('div');
    row.className = 'time-slot-row';
    
    row.innerHTML = `
      <div class="time-label">${event.time}</div>
      <div class="events-cell">
        <div class="calendar-event event-${event.type}" data-id="${event.id}">
          <span class="event-title"><strong>${event.title}</strong></span>
          <span class="event-meta">${event.duration} | ${event.type.replace('-', ' ')}</span>
        </div>
      </div>
    `;
    
    // Double click to delete
    row.querySelector('.calendar-event').addEventListener('dblclick', () => {
      state.schedule = state.schedule.filter(e => e.id !== event.id);
      renderScheduleWidget();
      addSystemLog('Time Block event removed.', 'system');
    });
    
    timelineGrid.appendChild(row);
  });
}

function handleAddScheduleEvent(e) {
  e.preventDefault();
  const title = document.getElementById('sched-title').value.trim();
  const start = document.getElementById('sched-start').value;
  const end = document.getElementById('sched-end').value;
  const type = document.getElementById('sched-type').value;
  
  if (!title) return;
  
  // Calc duration
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let durMins = (eh * 60 + em) - (sh * 60 + sm);
  if (durMins < 0) durMins += 24 * 60; // Over midnight
  
  state.schedule.push({
    time: start,
    title: title,
    duration: `${durMins}m`,
    type: type,
    id: Date.now()
  });
  
  // Reset form
  document.getElementById('sched-title').value = '';
  document.getElementById('widget-schedule-form').classList.add('hidden');
  renderScheduleWidget();
  addSystemLog(`Added schedule time block: ${title}.`, 'system');
}

// 3. ITINERARY WIDGET
function renderItineraryWidget() {
  document.getElementById('itinerary-destination-title').textContent = state.itinerary.destination;
  document.getElementById('itinerary-budget-total').textContent = state.itinerary.budgetTotal;
  document.getElementById('itinerary-budget-spent').textContent = state.itinerary.budgetSpent;
  
  // Day tabs
  const dayTabs = document.getElementById('itinerary-day-tabs');
  dayTabs.innerHTML = '';
  
  // If no days, load Kyoto demo preset values defaults
  if (state.itinerary.days.length === 0) {
    state.itinerary.days = PRESETS.travel.itinerary;
  }
  
  state.itinerary.days.forEach(d => {
    const btn = document.createElement('button');
    btn.className = `day-tab ${state.itinerary.currentDay === d.day ? 'active' : ''}`;
    btn.textContent = `Day ${d.day}`;
    btn.addEventListener('click', () => {
      state.itinerary.currentDay = d.day;
      renderItineraryWidget();
    });
    dayTabs.appendChild(btn);
  });
  
  // Itinerary stops
  const stopsContainer = document.getElementById('itinerary-day-content');
  stopsContainer.innerHTML = '';
  
  const currentDayData = state.itinerary.days.find(d => d.day === state.itinerary.currentDay);
  if (currentDayData) {
    // Add subtitle
    const subTitle = document.createElement('h4');
    subTitle.className = 'day-itinerary-subtitle';
    subTitle.style.marginBottom = '12px';
    subTitle.style.fontSize = '0.9rem';
    subTitle.textContent = currentDayData.title;
    stopsContainer.appendChild(subTitle);
    
    currentDayData.stops.forEach(stop => {
      const card = document.createElement('div');
      card.className = 'itinerary-stop';
      card.innerHTML = `
        <span class="stop-time-badge">${stop.time}</span>
        <div class="stop-info">
          <div class="stop-title">${stop.title}</div>
          <p class="stop-desc">${stop.desc}</p>
          <div class="stop-tips"><i data-lucide="info" style="width:10px;height:10px;"></i> ${stop.tip}</div>
        </div>
      `;
      stopsContainer.appendChild(card);
    });
  }
  
  // Packing List
  const packingList = document.getElementById('itinerary-packing-list');
  packingList.innerHTML = '';
  state.itinerary.packingList.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = `packing-item ${item.checked ? 'checked' : ''}`;
    
    li.innerHTML = `
      <input type="checkbox" ${item.checked ? 'checked' : ''} id="pack-item-${idx}" />
      <label for="pack-item-${idx}">${item.text}</label>
    `;
    
    li.querySelector('input').addEventListener('change', (e) => {
      item.checked = e.target.checked;
      li.classList.toggle('checked', item.checked);
    });
    
    packingList.appendChild(li);
  });
  
  lucide.createIcons();
}

// 4. NOTES SUMMARIZER WIDGET
function handleSummarizeNotes() {
  const textarea = document.getElementById('summarizer-raw-input');
  const text = textarea.value.trim();
  if (!text) return;
  
  // If notes matches preset notes trigger presets summary
  let parsed = null;
  if (text.includes('Marketing sync') || text.includes('Beta launch')) {
    parsed = PRESETS.summary.parsedSummary;
  } else {
    // Generate default custom summary structure
    parsed = {
      title: 'Processed Meeting Summary',
      executiveSummary: 'Brief analysis generated from user notes inputs. Key discussion points extracted successfully.',
      actionItems: [
        { task: 'Action item: review inputs details', owner: 'Unassigned', priority: 'P2' }
      ],
      decisions: [
        { decision: 'Analyzed custom pasted memo text.', authority: 'Reviewer' }
      ],
      deadlines: [
        { item: 'Resolve tasks', date: 'End of week' }
      ]
    };
  }
  
  renderSummaryOutput(parsed);
  addSystemLog('Notes analyzed by Content Summarizer Agent.', 'safety');
}

function renderSummaryOutput(summary) {
  const container = document.getElementById('summarizer-output-box');
  container.innerHTML = `
    <div class="summary-output-doc">
      <h4>${summary.title}</h4>
      
      <div class="summary-section">
        <h5>Executive Summary</h5>
        <p>${summary.executiveSummary}</p>
      </div>

      <div class="summary-section">
        <h5>Action Items</h5>
        <ul>
          ${summary.actionItems.map(item => `
            <li>
              <strong>[${item.priority}]</strong> ${item.task} 
              <span class="owner-tag" style="color:var(--accent-blue);font-size:0.65rem;font-family:var(--font-mono);margin-left:6px;">(${item.owner})</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="summary-section">
        <h5>Key Decisions</h5>
        <ul>
          ${summary.decisions.map(d => `<li>${d.decision} (Authority: ${d.authority})</li>`).join('')}
        </ul>
      </div>

      <div class="summary-section">
        <h5>Upcoming Deadlines</h5>
        <ul>
          ${summary.deadlines.map(d => `<li>${d.item}: <strong>${d.date}</strong></li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// 5. MEMORY WIDGET
function renderMemoryWidget() {
  const container = document.getElementById('memory-facts-list');
  container.innerHTML = '';
  
  if (state.memory.length === 0) {
    container.innerHTML = '<li class="text-muted" style="font-size:0.75rem;padding:10px 0;">No preferences remembered yet. Run queries or add them below.</li>';
    return;
  }
  
  state.memory.forEach(pref => {
    const li = document.createElement('li');
    li.className = 'remembered-item';
    li.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <i data-lucide="check-circle-2"></i>
        <span>${pref.text}</span>
      </div>
      <button class="forget-memory-btn" title="Forget"><i data-lucide="x"></i></button>
    `;
    
    li.querySelector('.forget-memory-btn').addEventListener('click', () => {
      state.memory = state.memory.filter(m => m.id !== pref.id);
      renderMemoryWidget();
      addSystemLog('Fact forgotten from memory bank.', 'system');
    });
    
    container.appendChild(li);
  });
  
  lucide.createIcons();
}

function handleAddMemory(e) {
  e.preventDefault();
  const input = document.getElementById('new-memory-text');
  const text = input.value.trim();
  
  if (!text) return;
  
  state.memory.push({
    text: text,
    id: Date.now()
  });
  
  input.value = '';
  renderMemoryWidget();
  addSystemLog(`Manually recorded preference: "${text}"`, 'system');
}

// -----------------------------------------------------------------------------
// CONSENT POPUP DIALOG
// -----------------------------------------------------------------------------
function showConsentPopup(message) {
  return new Promise((resolve) => {
    document.getElementById('consent-message').textContent = message;
    const popup = document.getElementById('consent-popup');
    popup.classList.remove('hidden');
    
    state.consentCallback = (approved) => {
      resolve(approved);
    };
  });
}

function closeConsentPopup() {
  document.getElementById('consent-popup').classList.add('hidden');
  state.consentCallback = null;
}
