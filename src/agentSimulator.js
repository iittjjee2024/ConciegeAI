/* ConciergeAI - Agent Simulator Engine */

// Predefined query results for rich interactive demonstrations
export const PRESETS = {
  travel: {
    category: 'travel',
    destination: 'Kyoto, Japan',
    budgetTotal: '$2,500',
    budgetSpent: '$1,850',
    packingList: [
      { text: 'Passport & JR Rail Pass', checked: true },
      { text: 'Comfortable walking shoes', checked: false },
      { text: 'Universal power adapter', checked: false },
      { text: 'Light rain jacket / umbrella', checked: false },
      { text: 'Yen currency (cash)', checked: true }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Ancient Higashiyama',
        stops: [
          { time: '14:00', title: 'Check-in at Ryokan', desc: 'Arrive at the traditional inn in Gion. Settle in and refresh.', tip: 'Bring cash for local taxes.' },
          { time: '16:00', title: 'Kiyomizu-dera Temple', desc: 'Walk up the historic streets. Explore the iconic wooden stage overlooking Kyoto.', tip: 'Sunset views here are highly rated.' },
          { time: '19:00', title: ' Kaiseki Dinner', desc: 'Traditional multi-course dining experience focusing on seasonal local ingredients.', tip: 'Vegetarian menus must be requested in advance.' }
        ]
      },
      {
        day: 2,
        title: 'Bamboo Groves & Golden Pavilion',
        stops: [
          { time: '08:30', title: 'Arashiyama Bamboo Grove', desc: 'Early morning walk through the towering bamboo paths to beat the crowds.', tip: 'Rent a bicycle to explore nearby temples.' },
          { time: '11:00', title: 'Tenryu-ji Temple', desc: 'Visit the stunning 14th-century Zen garden, preserved in its original form.', tip: 'Sit on the veranda to meditate.' },
          { time: '14:30', title: 'Kinkaku-ji (Golden Pavilion)', desc: 'Travel north to see the breathtaking gold-leaf Zen temple reflecting on the pond.', tip: 'Get your camera ready for the classic shot.' }
        ]
      },
      {
        day: 3,
        title: 'Shrines & Traditional Tea Cultures',
        stops: [
          { time: '07:30', title: 'Fushimi Inari Torii Gates', desc: 'Hike up the mountain path lined with thousands of bright vermillion gates.', tip: 'The hike takes 2-3 hours; wear good sneakers.' },
          { time: '13:00', title: 'Nishiki Market Food Crawl', desc: 'Sample Kyoto street food including octopus skewers, matcha ice cream, and mochi.', tip: 'Avoid eating while walking; eat at the stalls.' },
          { time: '16:00', title: 'Matcha Tea Ceremony', desc: 'Private workshop with a tea master in a Gion machiya townhouse.', tip: 'Great photo opportunity.' }
        ]
      },
      {
        day: 4,
        title: 'Departure via Bullet Train',
        stops: [
          { time: '09:30', title: 'Souvenir Shopping', desc: 'Pick up Uji matcha, woodblock prints, and local sweets at Kyoto Station.', tip: 'Use tax-free counters if you have your passport.' },
          { time: '11:30', title: 'Shinkansen to Tokyo', desc: 'Board the Nozomi express. Buy an Ekiben (station bento) for lunch.', tip: 'Book D-E seats for Mount Fuji views.' }
        ]
      }
    ],
    agentLogs: {
      intent: 'Intent: TRAVEL_PLANNING | Urgency: LOW | Target: Kyoto, Japan',
      context: 'Destination: Kyoto | Duration: 4 Days | Budget: $2500 | Pax: 1',
      planning: 'Creating 4-day structural plan. Optimizing for geographical grouping (East, West, South).',
      scheduling: 'Time slots allocated. Buffers: 1.5h between activities. Protected dinner blocks.',
      productivity: 'Priority Tasks: P1 Travel Documents, P2 Hotel Ryokan booking, P3 Packing checklist.',
      travel: 'Packing checklist generated. Budget breakdown calculated: $1,850 spent, $650 contingency.',
      memory: 'Consent request queued: Save Kyoto destination preferences and vegetarian meals request.',
      safety: 'Audited. Privacy scrub completed (removed real passport numbers from context). Safe.',
      response: 'Itinerary generated successfully. Ready to render in workspace tab.'
    },
    finalResponse: `### Intent
Travel Planning (Kyoto, Japan - 4 Days)

### Key Context
* Destination: Kyoto, Japan
* Duration: 4 Days, 3 Nights
* Budget: $2,500 total (Estimated expense: $1,850)
* Preferences: Historical sights, culinary exploration

### Analysis Summary
The multi-agent system has generated a geographically optimized 4-day itinerary. It clusters sights to minimize transit time, schedules morning departures to avoid tourist peaks, and embeds necessary breaks.

### Recommendation
Activate the **Itinerary Tab** in your workspace to view the complete day-by-day planner, check off your packing list, and monitor your budget breakdown.

### Action Plan
* **Step 1:** Confirm reservation at Ryokan in Gion (P1).
* **Step 2:** Pre-purchase JR Kansai Area Pass online (P2).
* **Step 3:** Pack comfortable walking footwear (Kyoto averages 18,000 steps/day) (P3).
* **Step 4:** Review Gion Kaiseki dinner dress code guidelines (P4).

### Priority Level
P2 Important

### Risks / Considerations
* Temple sites get crowded after 10:00 AM; morning starts are critical.
* Kaiseki dining requires 48-hour cancellation notice.

### Next Best Action
Click the **Itinerary** tab in the dashboard to review your customized travel checklist and daily schedules.`
  },

  schedule: {
    category: 'schedule',
    timeblocks: [
      { time: '08:00', title: 'Morning Routine & Buffer', duration: '60m', type: 'routine' },
      { time: '09:00', title: 'Deep Work: Review Study Materials', duration: '90m', type: 'deep-work' },
      { time: '10:30', title: 'Buffer Break / Rehydration', duration: '15m', type: 'break' },
      { time: '10:45', title: 'Deep Work: Solve Practice Problems', duration: '90m', type: 'deep-work' },
      { time: '12:15', title: 'Lunch & Screen-Free Break', duration: '60m', type: 'break' },
      { time: '13:15', title: 'Routine: Organize Study Notes & Plan', duration: '45m', type: 'routine' },
      { time: '14:00', title: 'Study Sync / Group Review Session', duration: '60m', type: 'meeting' },
      { time: '15:00', title: 'Active Recall & Quick Flashcards', duration: '45m', type: 'deep-work' },
      { time: '15:45', title: 'Afternoon Walk / Buffer Time', duration: '30m', type: 'break' }
    ],
    agentLogs: {
      intent: 'Intent: SCHEDULING_OPTIMIZATION | Urgency: HIGH | Target: Study block',
      context: 'Duration: 8 hours | Constraints: Include breaks, avoid fatigue, protect focus',
      planning: 'Constructing Pomodoro-style block structure. Restricting deep work to max 3h.',
      scheduling: 'Mapped hourly blocks. 15m buffer morning, 60m lunch, 30m afternoon break included.',
      productivity: 'Priorities: P1 Practice problems, P2 Flashcards, P3 Note organization.',
      travel: 'No travel required. Agent bypassed.',
      memory: 'Recalled preference: User works best in morning deep work sessions.',
      safety: 'Audited. Verified schedule does not exceed 8 hours of total study to prevent burnout.',
      response: 'Focus schedule generated. Injecting data into Calendar widget.'
    },
    finalResponse: `### Intent
Focus Schedule Optimization (Study & Exam Prep)

### Key Context
* Date: Today (Wednesday)
* Goals: Active study, practice problem solving
* Strategy: Deep Work time-blocking, screen-free breaks, and cognitive buffers

### Analysis Summary
The system created an optimized focus schedule protecting morning high-energy hours for deep learning, leaving administrative tasks and review sessions for post-lunch periods.

### Recommendation
Check the **Schedule Tab** in your workspace. We have blocked out 3 Deep Work sessions (totaling 3.75 hours) and paired them with strategic active breaks.

### Action Plan
* **Step 1:** Block notifications on all devices from 09:00 to 12:15 (P1).
* **Step 2:** Prepare study workspace with water, notes, and flashcards before 09:00 (P2).
* **Step 3:** Go outside for a walk during the 15:45 break (P3).

### Priority Level
P1 Critical

### Risks / Considerations
* Attempting back-to-back study blocks without a break will drastically reduce retention.
* Ensure lunch is screen-free to allow cognitive recovery.

### Next Best Action
Select the **Schedule** tab in the dashboard to edit, add events, or start your morning time block.`
  },

  tasks: {
    category: 'productivity',
    p1: [
      { text: 'Submit project report draft (Due tomorrow at 12:00 PM)', completed: false },
      { text: 'Review feedback on sales deck', completed: false }
    ],
    p2: [
      { text: 'Schedule annual doctor checkup', completed: false },
      { text: 'Replenish prescription meds at pharmacy', completed: true },
      { text: 'Respond to urgent client emails', completed: false }
    ],
    p3: [
      { text: 'Do laundry (weekly darks)', completed: false },
      { text: 'Water houseplants', completed: true },
      { text: 'Organize desktop downloads folder', completed: false }
    ],
    p4: [
      { text: 'Buy notebook/stationery supplies', completed: false },
      { text: 'Research local weekend hikes', completed: false }
    ],
    agentLogs: {
      intent: 'Intent: TASK_PRIORITIZATION | Urgency: HIGH | Items: Multi-domain list',
      context: 'Deadlines: Project report tomorrow | Health constraints: Doctor checkup',
      planning: 'Sorting tasks into P1-P4 framework. Evaluating deadlines & long-term value.',
      scheduling: 'Project report scheduled for immediate deep work block. Laundry batched for evening.',
      productivity: 'Classifying: P1=Report, P2=Doctor/Client, P3=Laundry/Plants, P4=Stationery/Hikes.',
      travel: 'No travel required. Agent bypassed.',
      memory: 'Saved preference: Preference for medical/health tasks sorted into P2.',
      safety: 'Audited. Checked for privacy conflicts. Direct personal contacts removed.',
      response: 'Prioritized task board populated. P1 priority alert highlighted.'
    },
    finalResponse: `### Intent
Task Prioritization and Organization

### Key Context
* Inputs: Project report (due tomorrow), laundry, doctor checkup, housekeeping, admin.
* Deadlines: Project report draft (Critical - 24h).
* Goal: Reduce overload, clarify immediate next actions.

### Analysis Summary
Tasks have been classified according to their urgency and long-term utility. The project report takes absolute priority (P1), while admin and chore-based tasks have been categorized as P3 and P4 to reduce immediate cognitive load.

### Recommendation
Open the **Tasks Tab** in the workspace. Your tasks have been organized into the four quadrants (P1-P4). Focus entirely on finishing P1 items before attempting others.

### Action Plan
* **Step 1:** Open the project report draft and work on the introduction section (P1).
* **Step 2:** Call the medical clinic at 09:00 AM tomorrow to schedule the checkup (P2).
* **Step 3:** Load the washing machine during your afternoon break today (P3).

### Priority Level
P1 Critical

### Risks / Considerations
* Working on low-priority items (like desktop cleanup) provides a false sense of productivity but increases project deadline risk.

### Next Best Action
Click the **Tasks** tab in the dashboard to review your board, mark completed tasks, or drag items between columns.`
  },

  summary: {
    category: 'summarizer',
    rawText: `- Marketing sync today at 2pm.
- Review budget drafts before Friday at noon (Sarah to complete).
- Agreed to launch the beta on July 10th.
- Set up weekly dashboard reports starting Monday.
- Discussed hiring a content writer (John to check budget).`,
    parsedSummary: {
      title: 'Marketing Sync & Beta Launch Alignment',
      executiveSummary: 'The team aligned on key timelines for the upcoming beta release on July 10th. A major action item is reviewing the budget drafts by Friday to allocate funds for Content Writing and dashboard reporting setup.',
      actionItems: [
        { task: 'Review budget drafts before Friday at 12:00 PM', owner: 'Sarah', priority: 'P1' },
        { task: 'Set up weekly dashboard reports starting Monday', owner: 'Unassigned', priority: 'P2' },
        { task: 'Check budget availability for hiring a content writer', owner: 'John', priority: 'P3' }
      ],
      decisions: [
        { decision: 'Beta release date locked for July 10th.', authority: 'Team' },
        { decision: 'Marketing sync scheduled daily leading up to launch.', authority: 'Marketing Lead' }
      ],
      deadlines: [
        { item: 'Budget Draft Review', date: 'Friday at 12:00 PM' },
        { item: 'Weekly Dashboard Setup', date: 'Next Monday' },
        { item: 'Beta Launch', date: 'July 10th' }
      ]
    },
    agentLogs: {
      intent: 'Intent: NOTE_SUMMARIZATION | Urgency: MEDIUM | Text size: 5 lines',
      context: 'Found key milestones: Beta launch July 10, budget reviews Friday.',
      planning: 'Drafting structured summary layout. Separating Actions, Decisions, Deadlines.',
      scheduling: 'Noting Friday 12:00 PM deadline. Marking Monday for Dashboard setup.',
      productivity: 'Prioritized Actions: P1 Budget review, P2 Dashboard reports, P3 Hiring review.',
      travel: 'No travel required. Agent bypassed.',
      memory: 'Saved: Team project beta launch date (July 10) added to calendar records.',
      safety: 'Audited. Checked for security risks. No passwords or API keys in text. Approved.',
      response: 'Formatted executive summary compiled. Action checklist generated.'
    },
    finalResponse: `### Intent
Document Summarization and Action Item Extraction

### Key Context
* Source: Marketing sync notes
* Core Milestone: Beta launch (July 10th)
* Critical Deadline: Budget review (Friday noon)

### Analysis Summary
The notes have been analyzed, extracting three distinct action items with assigned owners, two key decisions, and three calendar deadlines.

### Recommendation
Navigate to the **Summarizer Tab** to view the structured dashboard output, which includes an Executive Summary, clear Action Items with ownership tags, and critical deadlines.

### Action Plan
* **Step 1:** Sarah: Review budget drafts and share notes by Friday noon (P1).
* **Step 2:** Assign ownership for the weekly dashboard report setup (P2).
* **Step 3:** John: Verify marketing budget availability for a content writer (P3).

### Priority Level
P2 Important

### Risks / Considerations
* "Weekly dashboard reports" is currently unassigned; this represents a project dependency risk.

### Next Best Action
View the **Summarizer** tab to copy the formatted meeting minutes or export action items.`
  }
};

// Generic response fallback for arbitrary user queries
export const getFallbackResult = (query) => {
  return {
    category: 'productivity',
    p1: [
      { text: `Analyze query: "${query}"`, completed: false }
    ],
    p2: [
      { text: 'Request clarification on project details', completed: false }
    ],
    p3: [
      { text: 'Refine workflow tasks', completed: false }
    ],
    p4: [
      { text: 'Add custom elements', completed: false }
    ],
    agentLogs: {
      intent: `Intent: QUERY_ANALYSIS | Query: "${query}"`,
      context: 'Context: Generic user inquiry | Extracting details...',
      planning: 'Planning: Generating default action plan for custom query.',
      scheduling: 'Scheduling: Blocking general productivity time.',
      productivity: 'Productivity: Categorizing custom steps as P1-P4.',
      travel: 'Travel: Bypassed (Non-travel intent).',
      memory: 'Memory: Consent check active for preference logs.',
      safety: 'Safety: Auditing custom query. Policy checks passed.',
      response: 'Response: Formulating helpful default assistance.'
    },
    finalResponse: `### Intent
General Task Inquiry

### Key Context
* Query: "${query}"
* Local Time: ${new Date().toLocaleTimeString()}

### Analysis Summary
The system has classified your query. To provide detailed scheduling or travel support, please provide more specific parameters such as timelines, location constraints, or budgets.

### Recommendation
Use the **Tasks Tab** in the workspace where we have initialized an action list to analyze and resolve your request.

### Action Plan
* **Step 1:** Analyze the parameters of the request: "${query}" (P1).
* **Step 2:** Request additional details or clarification if needed (P2).
* **Step 3:** Incorporate any feedback into the active task board (P3).

### Priority Level
P3 Useful

### Risks / Considerations
* Insufficient context may lead to generic scheduling; please supply deadlines if urgent.

### Next Best Action
Reply with more details (like budget, location, or deadlines) to run a high-fidelity planning cycle.`
  };
};

// Simulated timing delay per agent in milliseconds
const STAGE_DELAY = 300;

export async function runSimulation(query, onProgress, onComplete) {
  // 1. Determine Archetype
  let archetype = 'default';
  const q = query.toLowerCase();
  
  if (q.includes('kyoto') || q.includes('trip') || q.includes('travel') || q.includes('itinerary')) {
    archetype = 'travel';
  } else if (q.includes('schedule') || q.includes('calendar') || q.includes('study') || q.includes('exam') || q.includes('time')) {
    archetype = 'schedule';
  } else if (q.includes('task') || q.includes('prioritize') || q.includes('todo') || q.includes('laundry')) {
    archetype = 'tasks';
  } else if (q.includes('summarize') || q.includes('notes') || q.includes('memo') || q.includes('sync') || q.includes('transcript')) {
    archetype = 'summary';
  }
  
  const data = archetype === 'default' ? getFallbackResult(query) : PRESETS[archetype];
  const logs = data.agentLogs;
  
  // Stages of the reasoning framework
  const stages = [
    { id: 'understand', phase: 'phase-understand', percent: 14, agent: 'intent', log: logs.intent, sysMsg: '[SYSTEM] Intent Classifier node activated...' },
    { id: 'context', phase: 'phase-context', percent: 28, agent: 'context', log: logs.context, sysMsg: '[SYSTEM] Context extraction initiated...' },
    { id: 'gap', phase: 'phase-gap', percent: 42, agent: 'planning', log: logs.planning, sysMsg: '[SYSTEM] Planning milestones outlining...' },
    { id: 'solution', phase: 'phase-solution', percent: 57, agent: 'scheduling', log: logs.scheduling, sysMsg: '[SYSTEM] Scheduling Agent allocating time-blocks...' },
    { id: 'decision', phase: 'phase-decision', percent: 71, agent: 'productivity', log: logs.productivity, sysMsg: '[SYSTEM] Productivity priorities categorized...' },
    { id: 'travel_check', phase: 'phase-solution', percent: 80, agent: 'travel', log: logs.travel, sysMsg: '[SYSTEM] Travel checklist & budget validated...' },
    { id: 'memory_check', phase: 'phase-validate', percent: 85, agent: 'memory', log: logs.memory, sysMsg: '[SYSTEM] Memory Agent reviewing preference logs...' },
    { id: 'safety_check', phase: 'phase-validate', percent: 92, agent: 'safety', log: logs.safety, sysMsg: '[SYSTEM] Safety Agent running compliance/privacy audit...' },
    { id: 'response_construct', phase: 'phase-response', percent: 100, agent: 'response', log: logs.response, sysMsg: '[SYSTEM] Response compilation finalized.' }
  ];
  
  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    
    // Call progress callback
    onProgress({
      activeAgent: stage.agent,
      activePhaseId: stage.phase,
      progressPercent: stage.percent,
      consoleText: stage.log,
      sysMsg: stage.sysMsg,
      stageId: stage.id
    });
    
    // Delay to simulate computation
    await new Promise(resolve => setTimeout(resolve, STAGE_DELAY));
  }
  
  // Complete callback
  onComplete(data);
}
