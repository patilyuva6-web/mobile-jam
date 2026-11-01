/**
 * ClassMode Teacher Dashboard — Production-Ready Client Logic
 * Handles real-time focus timers, MDM simulation, device state transitions,
 * accessible native <dialog> modals, and search filtering.
 */

// Initial Sample Dataset
const INITIAL_STUDENTS = [
  { id: 'dev-01', name: 'Maya Patel', avatar: 'MP', deviceModel: 'Google Pixel 8', assetTag: 'CM-204-01', battery: 84, status: 'unlocked', unlockRemainingSeconds: 465, unlockReason: 'Scientific Calculator App', lastSync: '12s ago' },
  { id: 'dev-02', name: 'Lucas Scott', avatar: 'LS', deviceModel: 'iPhone 15 Pro', assetTag: 'CM-204-02', battery: 92, status: 'unlocked', unlockRemainingSeconds: 210, unlockReason: 'Medical Monitoring', lastSync: '30s ago' },
  { id: 'dev-03', name: 'Liam Chen', avatar: 'LC', deviceModel: 'iPhone 14', assetTag: 'CM-204-03', battery: 78, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '1m ago' },
  { id: 'dev-04', name: 'Emma Watson', avatar: 'EW', deviceModel: 'Samsung Galaxy S24', assetTag: 'CM-204-04', battery: 65, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '45s ago' },
  { id: 'dev-05', name: 'Noah Kim', avatar: 'NK', deviceModel: 'Samsung Galaxy S23', assetTag: 'CM-204-05', battery: 14, status: 'offline', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '18m ago' },
  { id: 'dev-06', name: 'Sophia Rodriguez', avatar: 'SR', deviceModel: 'iPad (10th Gen)', assetTag: 'CM-204-06', battery: 89, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '2m ago' },
  { id: 'dev-07', name: 'James Wilson', avatar: 'JW', deviceModel: 'iPhone 13', assetTag: 'CM-204-07', battery: 52, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '1m ago' },
  { id: 'dev-08', name: 'Olivia Martinez', avatar: 'OM', deviceModel: 'Google Pixel 7a', assetTag: 'CM-204-08', battery: 73, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '3m ago' },
  { id: 'dev-09', name: 'Ethan Davis', avatar: 'ED', deviceModel: 'OnePlus 12', assetTag: 'CM-204-09', battery: 95, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: 'Just now' },
  { id: 'dev-10', name: 'Ava Johnson', avatar: 'AJ', deviceModel: 'iPhone 15', assetTag: 'CM-204-10', battery: 61, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '5m ago' },
  { id: 'dev-11', name: 'Alexander Wright', avatar: 'AW', deviceModel: 'Samsung Galaxy A54', assetTag: 'CM-204-11', battery: 18, status: 'offline', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '24m ago' },
  { id: 'dev-12', name: 'Mia Brown', avatar: 'MB', deviceModel: 'iPhone SE (3rd Gen)', assetTag: 'CM-204-12', battery: 80, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '1m ago' },
  { id: 'dev-13', name: 'Benjamin Taylor', avatar: 'BT', deviceModel: 'Google Pixel 8 Pro', assetTag: 'CM-204-13', battery: 68, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '3m ago' },
  { id: 'dev-14', name: 'Charlotte Miller', avatar: 'CM', deviceModel: 'iPhone 14 Plus', assetTag: 'CM-204-14', battery: 87, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: 'Just now' },
  { id: 'dev-15', name: 'Daniel Anderson', avatar: 'DA', deviceModel: 'Motorola Edge', assetTag: 'CM-204-15', battery: 54, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '2m ago' },
  { id: 'dev-16', name: 'Amelia Thomas', avatar: 'AT', deviceModel: 'iPhone 15', assetTag: 'CM-204-16', battery: 91, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '1m ago' },
  { id: 'dev-17', name: 'Henry Jackson', avatar: 'HJ', deviceModel: 'Samsung Galaxy S22', assetTag: 'CM-204-17', battery: 42, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '4m ago' },
  { id: 'dev-18', name: 'Harper White', avatar: 'HW', deviceModel: 'iPhone 13 mini', assetTag: 'CM-204-18', battery: 77, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '3m ago' },
  { id: 'dev-19', name: 'Sebastian Harris', avatar: 'SH', deviceModel: 'Google Pixel 7', assetTag: 'CM-204-19', battery: 63, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '2m ago' },
  { id: 'dev-20', name: 'Evelyn Martin', avatar: 'EM', deviceModel: 'iPhone 14 Pro', assetTag: 'CM-204-20', battery: 85, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: 'Just now' },
  { id: 'dev-21', name: 'Jack Thompson', avatar: 'JT', deviceModel: 'iPad Air (5th Gen)', assetTag: 'CM-204-21', battery: 71, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '1m ago' },
  { id: 'dev-22', name: 'Abigail Garcia', avatar: 'AG', deviceModel: 'Samsung Galaxy S23 FE', assetTag: 'CM-204-22', battery: 49, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '5m ago' },
  { id: 'dev-23', name: 'Logan Martinez', avatar: 'LM', deviceModel: 'iPhone 12', assetTag: 'CM-204-23', battery: 62, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '2m ago' },
  { id: 'dev-24', name: 'Emily Robinson', avatar: 'ER', deviceModel: 'Google Pixel 6a', assetTag: 'CM-204-24', battery: 83, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '3m ago' },
  { id: 'dev-25', name: 'Mason Clark', avatar: 'MC', deviceModel: 'iPhone 15 Pro Max', assetTag: 'CM-204-25', battery: 96, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: 'Just now' },
  { id: 'dev-26', name: 'Ella Lewis', avatar: 'EL', deviceModel: 'Samsung Galaxy A34', assetTag: 'CM-204-26', battery: 74, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '1m ago' },
  { id: 'dev-27', name: 'Oliver Lee', avatar: 'OL', deviceModel: 'iPhone 14', assetTag: 'CM-204-27', battery: 59, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '4m ago' },
  { id: 'dev-28', name: 'Aria Walker', avatar: 'AW', deviceModel: 'Google Pixel 8', assetTag: 'CM-204-28', battery: 88, status: 'focused', unlockRemainingSeconds: 0, unlockReason: '', lastSync: '2m ago' }
];

const SCHEDULE_DATA = [
  { period: 'Period 1', name: 'Biology Honors (Grade 9)', room: 'Room 204', time: '08:15 AM – 09:25 AM', duration: '70 mins', status: 'Completed', policy: 'Standard Lecture' },
  { period: 'Period 3', name: 'AP Biology (Grade 10)', room: 'Room 204 • Lab B', time: '09:30 AM – 10:45 AM', duration: '75 mins', status: 'Current', policy: 'Exam & Lab Strict' },
  { period: 'Period 5', name: 'Environmental Science', room: 'Room 108', time: '11:30 AM – 12:45 PM', duration: '75 mins', status: 'Upcoming', policy: 'Standard Lecture' },
  { period: 'Period 7', name: 'Genetics Lab (Grade 11/12)', room: 'Room 204 • Lab A', time: '01:15 PM – 02:30 PM', duration: '75 mins', status: 'Upcoming', policy: 'Collaborative Study' }
];

const INITIAL_FEED = [
  { text: 'MDM focus policy synchronized to 26 active devices', time: '1m ago', type: 'teal' },
  { text: 'Lucas Scott approved for 5m medical monitoring unlock', time: '3m ago', type: 'amber' },
  { text: 'Maya Patel approved for 10m digital calculator access', time: '8m ago', type: 'amber' },
  { text: 'Noah Kim device signal lost (Wi-Fi beacon timeout)', time: '18m ago', type: 'slate' },
  { text: 'Period 3 AP Biology focus session commenced', time: '33m ago', type: 'teal' }
];

// App State Manager
class ClassModeApp {
  constructor() {
    this.sessionActive = true;
    this.sessionRemainingSeconds = 42 * 60; // 42 minutes remaining
    this.sessionTotalSeconds = 75 * 60;     // 75 minutes total
    this.currentView = 'overview';
    this.devicesSearchQuery = '';
    this.devicesFilterStatus = 'all';
    this.liveSearchQuery = '';
    this.liveFilterStatus = 'all';
    this.hasPendingRequest = true;

    // Deep copy initial data
    this.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    this.schedule = JSON.parse(JSON.stringify(SCHEDULE_DATA));
    this.activityFeed = JSON.parse(JSON.stringify(INITIAL_FEED));

    this.timerInterval = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupDialogAccessibility();
    this.startTicker();

    // Check URL hash for initial screen navigation (e.g. #live, #schedule, #devices)
    const initialHash = window.location.hash.replace('#', '');
    if (['overview', 'live', 'schedule', 'devices'].includes(initialHash)) {
      this.switchView(initialHash);
    } else {
      this.render();
    }

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['overview', 'live', 'schedule', 'devices'].includes(hash)) {
        this.switchView(hash);
      }
    });
  }

  // Setup Modern Web Guidance compliance for <dialog closedby="any">
  setupDialogAccessibility() {
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e, dialog) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
        let pressedOutside = false;
        dialog.addEventListener('pointerdown', (e) => { pressedOutside = outside(e, dialog); });
        dialog.addEventListener('pointerup', (e) => { if (pressedOutside && outside(e, dialog)) dialog.close(); });
      }
    }
  }

  startTicker() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      // 1. Tick session time down if active
      if (this.sessionActive && this.sessionRemainingSeconds > 0) {
        this.sessionRemainingSeconds--;
        this.updateSessionTimers();
      }

      // 2. Tick student temporary unlock timers
      let needsRerender = false;
      this.students.forEach(student => {
        if (student.status === 'unlocked' && student.unlockRemainingSeconds > 0) {
          student.unlockRemainingSeconds--;
          if (student.unlockRemainingSeconds <= 0) {
            student.status = 'focused';
            student.unlockReason = '';
            needsRerender = true;
            this.showToast(`${student.name}'s temporary unlock expired. Focus mode re-engaged.`, 'info');
            this.addActivity(`${student.name} temporary access expired; focus restored`, 'teal');
          }
        }
      });

      // Update timer texts directly in DOM to avoid full re-render on each tick
      this.updateCountdownElements();

      if (needsRerender) {
        this.render();
      }
    }, 1000);
  }

  formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  updateSessionTimers() {
    const remainingMins = Math.ceil(this.sessionRemainingSeconds / 60);
    const elapsedMins = Math.floor((this.sessionTotalSeconds - this.sessionRemainingSeconds) / 60);
    const pct = Math.min(100, Math.round(((this.sessionTotalSeconds - this.sessionRemainingSeconds) / this.sessionTotalSeconds) * 100));

    const heroRemaining = document.getElementById('hero-remaining-time');
    const heroElapsed = document.getElementById('hero-elapsed-time');
    const heroProgress = document.getElementById('hero-progress-bar');
    const liveTimer = document.getElementById('live-timer-text');

    if (heroRemaining) heroRemaining.textContent = `${remainingMins}m`;
    if (heroElapsed) heroElapsed.textContent = `${elapsedMins}m`;
    if (heroProgress) {
      const fill = heroProgress.querySelector('.progress-fill');
      if (fill) fill.style.width = `${pct}%`;
      heroProgress.setAttribute('aria-valuenow', pct);
    }
    if (liveTimer) liveTimer.textContent = `${this.formatTime(this.sessionRemainingSeconds)} remaining`;
  }

  updateCountdownElements() {
    // Update live countdown badges across all views
    document.querySelectorAll('[data-student-countdown]').forEach(el => {
      const studentId = el.getAttribute('data-student-countdown');
      const student = this.students.find(s => s.id === studentId);
      if (student && student.status === 'unlocked') {
        el.textContent = this.formatTime(student.unlockRemainingSeconds);
      }
    });
  }

  bindEvents() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileClose = document.getElementById('mobile-sidebar-close');
    const sidebar = document.getElementById('sidebar');

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => sidebar.classList.add('open'));
    }
    if (mobileClose && sidebar) {
      mobileClose.addEventListener('click', () => sidebar.classList.remove('open'));
    }

    // Topbar Demo Controls
    const toggleSessionBtn = document.getElementById('toggle-session-state-btn');
    if (toggleSessionBtn) {
      toggleSessionBtn.addEventListener('click', () => this.toggleSessionState());
    }

    const toggleLoadingBtn = document.getElementById('toggle-loading-state-btn');
    if (toggleLoadingBtn) {
      toggleLoadingBtn.addEventListener('click', () => this.simulateLoading());
    }

    const toggleErrorBtn = document.getElementById('toggle-error-state-btn');
    if (toggleErrorBtn) {
      toggleErrorBtn.addEventListener('click', () => this.toggleErrorState());
    }

    const resetDataBtn = document.getElementById('reset-demo-data-btn');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => this.resetData());
    }

    const dismissErrorBtn = document.getElementById('dismiss-error-banner-btn');
    if (dismissErrorBtn) {
      dismissErrorBtn.addEventListener('click', () => {
        document.getElementById('error-banner-container').hidden = true;
      });
    }

    // Hero buttons on Overview
    const heroEndSessionBtn = document.getElementById('hero-end-session-btn');
    if (heroEndSessionBtn) {
      heroEndSessionBtn.addEventListener('click', () => this.openSessionConfirmDialog());
    }

    const heroOpenUnlockBtn = document.getElementById('hero-open-unlock-modal-btn');
    if (heroOpenUnlockBtn) {
      heroOpenUnlockBtn.addEventListener('click', () => this.openUnlockModal());
    }

    const overviewGrantTempBtn = document.getElementById('overview-grant-temp-btn');
    if (overviewGrantTempBtn) {
      overviewGrantTempBtn.addEventListener('click', () => this.openUnlockModal());
    }

    const heroPingAllBtn = document.getElementById('hero-ping-all-btn');
    if (heroPingAllBtn) {
      heroPingAllBtn.addEventListener('click', () => {
        this.showToast('Focus reminder dispatched to all 28 enrolled student devices.', 'success');
        this.addActivity('Teacher broadcasted classroom focus reminder', 'teal');
      });
    }

    // Live session toolbar
    const liveUnlockBtn = document.getElementById('live-grant-unlock-btn');
    if (liveUnlockBtn) {
      liveUnlockBtn.addEventListener('click', () => this.openUnlockModal());
    }

    const liveFilterInput = document.getElementById('live-filter-input');
    if (liveFilterInput) {
      liveFilterInput.addEventListener('input', (e) => {
        this.liveSearchQuery = e.target.value.toLowerCase().trim();
        this.renderLiveDevices();
      });
    }

    document.querySelectorAll('[data-live-filter]').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('[data-live-filter]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.liveFilterStatus = pill.getAttribute('data-live-filter');
        this.renderLiveDevices();
      });
    });

    // Pending request banner buttons
    const pendingApproveBtn = document.getElementById('pending-approve-btn');
    if (pendingApproveBtn) {
      pendingApproveBtn.addEventListener('click', () => {
        this.grantTemporaryUnlock('dev-06', 10, 'Digital Calculator App');
        this.hasPendingRequest = false;
        document.getElementById('pending-requests-banner').hidden = true;
      });
    }

    const pendingDenyBtn = document.getElementById('pending-deny-btn');
    if (pendingDenyBtn) {
      pendingDenyBtn.addEventListener('click', () => {
        this.hasPendingRequest = false;
        document.getElementById('pending-requests-banner').hidden = true;
        this.showToast('Exemption request for Sophia Rodriguez declined.', 'info');
      });
    }

    // Devices table controls
    const devicesSearchInput = document.getElementById('devices-search-input');
    if (devicesSearchInput) {
      devicesSearchInput.addEventListener('input', (e) => {
        this.devicesSearchQuery = e.target.value.toLowerCase().trim();
        this.renderDevicesTable();
      });
    }

    document.querySelectorAll('#devices-status-filter-tabs .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#devices-status-filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.devicesFilterStatus = tab.getAttribute('data-status');
        this.renderDevicesTable();
      });
    });

    const devicesQuickUnlockBtn = document.getElementById('devices-quick-unlock-btn');
    if (devicesQuickUnlockBtn) {
      devicesQuickUnlockBtn.addEventListener('click', () => this.openUnlockModal());
    }

    const clearSearchBtn = document.getElementById('clear-device-search-btn');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (devicesSearchInput) devicesSearchInput.value = '';
        this.devicesSearchQuery = '';
        this.devicesFilterStatus = 'all';
        document.querySelectorAll('#devices-status-filter-tabs .filter-tab').forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-status') === 'all');
        });
        this.renderDevicesTable();
      });
    }

    // Schedule day tabs
    document.querySelectorAll('.day-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderSchedule();
      });
    });

    // Session Confirmation Modal Confirm
    const sessionDialogConfirmBtn = document.getElementById('session-dialog-confirm-btn');
    const sessionDialog = document.getElementById('session-dialog');
    if (sessionDialogConfirmBtn && sessionDialog) {
      sessionDialogConfirmBtn.addEventListener('click', () => {
        sessionDialog.close();
        this.toggleSessionState();
      });
    }

    // Temporary Unlock Form Submit
    const unlockForm = document.getElementById('unlock-form');
    const unlockDialog = document.getElementById('unlock-dialog');
    const unlockCancelBtn = document.getElementById('unlock-cancel-btn');

    if (unlockCancelBtn && unlockDialog) {
      unlockCancelBtn.addEventListener('click', () => unlockDialog.close());
    }

    if (unlockForm && unlockDialog) {
      unlockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentSelect = document.getElementById('unlock-student-select');
        const studentId = studentSelect.value;
        const durationRadio = document.querySelector('input[name="unlock-duration"]:checked');
        const duration = parseInt(durationRadio ? durationRadio.value : '5', 10);
        const reasonSelect = document.getElementById('unlock-reason-select');
        const reason = reasonSelect.value;

        this.grantTemporaryUnlock(studentId, duration, reason);
        unlockDialog.close();
      });
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    // Close mobile drawer if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Update Topbar Title
    const titleMap = {
      overview: 'Overview',
      live: 'Live Classroom Session',
      schedule: 'Focus Session Schedule',
      devices: 'Enrolled Devices'
    };
    const subMap = {
      overview: 'Period 3 • AP Biology • Fall 2026',
      live: 'Real-time student device telemetry & temporary exemptions',
      schedule: 'Weekly classroom schedule and automated policy triggers',
      devices: 'Inventory of student devices enrolled in ClassMode'
    };
    const pageTitle = document.getElementById('page-title');
    const pageSub = document.getElementById('page-subtitle');
    if (pageTitle) pageTitle.textContent = titleMap[viewName] || 'Dashboard';
    if (pageSub) pageSub.textContent = subMap[viewName] || '';

    this.render();
  }

  toggleSessionState() {
    this.sessionActive = !this.sessionActive;
    if (this.sessionActive) {
      this.sessionRemainingSeconds = 42 * 60;
      this.showToast('Classroom Focus Session started. 26 devices locked to AP Biology policy.', 'success');
      this.addActivity('Ms. Elena Vance started focus session for AP Biology', 'teal');
    } else {
      // Restore all unlocked devices to standard
      this.students.forEach(s => {
        if (s.status === 'unlocked') {
          s.status = 'focused';
          s.unlockRemainingSeconds = 0;
        }
      });
      this.showToast('Classroom Focus Session ended. All devices restored to standard mode.', 'info');
      this.addActivity('Ms. Elena Vance ended focus session; devices unlocked', 'slate');
    }
    this.render();
  }

  simulateLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.hidden = false;
      setTimeout(() => {
        overlay.hidden = true;
        this.showToast('Classroom roster & MDM policies successfully synchronized.', 'success');
      }, 1200);
    }
  }

  toggleErrorState() {
    const errorBanner = document.getElementById('error-banner-container');
    if (errorBanner) {
      errorBanner.hidden = !errorBanner.hidden;
      if (!errorBanner.hidden) {
        this.showToast('MDM sync alert: Gateway connectivity error triggered.', 'error');
      } else {
        this.showToast('Error banner dismissed.', 'info');
      }
    }
  }

  resetData() {
    this.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    this.activityFeed = JSON.parse(JSON.stringify(INITIAL_FEED));
    this.sessionActive = true;
    this.sessionRemainingSeconds = 42 * 60;
    this.hasPendingRequest = true;
    const banner = document.getElementById('pending-requests-banner');
    if (banner) banner.hidden = false;
    this.showToast('Demo data and student statuses have been reset.', 'info');
    this.render();
  }

  grantTemporaryUnlock(studentId, durationMinutes, reason) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;

    student.status = 'unlocked';
    student.unlockRemainingSeconds = durationMinutes * 60;
    student.unlockReason = reason || 'Teacher Discretion';
    student.lastSync = 'Just now';

    this.showToast(`Temporary access approved for ${student.name} (${durationMinutes}m).`, 'success');
    this.addActivity(`${student.name} approved for ${durationMinutes}m unlock (${student.unlockReason})`, 'amber');

    this.render();
  }

  revokeTemporaryUnlock(studentId) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;

    student.status = 'focused';
    student.unlockRemainingSeconds = 0;
    student.unlockReason = '';
    student.lastSync = 'Just now';

    this.showToast(`Temporary access revoked for ${student.name}. Device restored to focus.`, 'info');
    this.addActivity(`Temporary access revoked for ${student.name}`, 'teal');

    this.render();
  }

  sendReminderPing(studentId) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;

    this.showToast(`Silent reminder ping sent to ${student.name}'s ${student.deviceModel}.`, 'success');
    this.addActivity(`Dispatched focus reminder ping to ${student.name}`, 'teal');
  }

  openSessionConfirmDialog() {
    const dialog = document.getElementById('session-dialog');
    const title = document.getElementById('session-dialog-title');
    const desc = document.getElementById('session-dialog-desc');
    const confirmBtn = document.getElementById('session-dialog-confirm-btn');

    if (!dialog) return;

    if (this.sessionActive) {
      title.textContent = 'End Classroom Focus Session?';
      desc.innerHTML = 'Are you sure you want to end the focus session for <strong>Grade 10 — AP Biology</strong>? All 28 student devices will be restored to their standard profile immediately.';
      confirmBtn.textContent = 'Confirm End Session';
      confirmBtn.className = 'btn btn-danger';
    } else {
      title.textContent = 'Start Classroom Focus Session?';
      desc.innerHTML = 'Start the focus session for <strong>Grade 10 — AP Biology</strong>? Enrolled student devices will enter strict classroom mode until 10:45 AM.';
      confirmBtn.textContent = 'Start Session Now';
      confirmBtn.className = 'btn btn-primary';
    }

    dialog.showModal();
  }

  openUnlockModal(preselectedStudentId = null) {
    const dialog = document.getElementById('unlock-dialog');
    const studentSelect = document.getElementById('unlock-student-select');
    if (!dialog || !studentSelect) return;

    studentSelect.innerHTML = '';
    // Filter students eligible for unlock (focused or offline)
    const eligible = this.students.filter(s => s.status !== 'unlocked');
    if (eligible.length === 0) {
      this.showToast('All enrolled students currently have temporary access.', 'warning');
      return;
    }

    eligible.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.name} (${s.deviceModel} • ${s.assetTag})`;
      if (preselectedStudentId && s.id === preselectedStudentId) {
        opt.selected = true;
      }
      studentSelect.appendChild(opt);
    });

    dialog.showModal();
  }

  addActivity(text, type = 'teal') {
    this.activityFeed.unshift({ text, time: 'Just now', type });
    if (this.activityFeed.length > 8) this.activityFeed.pop();
    this.renderActivityFeed();
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>`;
    if (type === 'error') {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>`;
    } else if (type === 'warning') {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span style="flex:1;">${message}</span>
      <button style="background:transparent; border:none; color:currentColor; cursor:pointer; font-size:1.1rem; line-height:1; opacity:0.8;" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => toast.remove());

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4500);
  }

  // ==========================================
  // Render Methods
  // ==========================================

  render() {
    this.renderHeaderSessionAction();
    this.renderOverview();
    this.renderLiveDevices();
    this.renderSchedule();
    this.renderDevicesTable();
    this.updateCounters();
  }

  updateCounters() {
    const focusedCount = this.students.filter(s => s.status === 'focused').length;
    const unlockedCount = this.students.filter(s => s.status === 'unlocked').length;
    const offlineCount = this.students.filter(s => s.status === 'offline').length;
    const totalCount = this.students.length;

    // Overview metrics
    const mFocused = document.getElementById('metric-focused-count');
    const mTemp = document.getElementById('metric-temp-count');
    const mOffline = document.getElementById('metric-offline-count');
    const mRate = document.getElementById('metric-focus-rate');
    const devTotal = document.getElementById('device-total-count');

    if (mFocused) mFocused.textContent = focusedCount;
    if (mTemp) mTemp.textContent = unlockedCount;
    if (mOffline) mOffline.textContent = offlineCount;
    if (mRate) {
      const rate = ((focusedCount / totalCount) * 100).toFixed(1);
      mRate.textContent = `${rate}% Focus Compliance`;
    }
    if (devTotal) devTotal.textContent = totalCount;

    // Devices page tabs counts
    const cAll = document.getElementById('count-all');
    const cFoc = document.getElementById('count-focused');
    const cUnl = document.getElementById('count-unlocked');
    const cOff = document.getElementById('count-offline');

    if (cAll) cAll.textContent = totalCount;
    if (cFoc) cFoc.textContent = focusedCount;
    if (cUnl) cUnl.textContent = unlockedCount;
    if (cOff) cOff.textContent = offlineCount;

    // Sidebar Live Badge
    const liveBadge = document.getElementById('live-session-badge');
    if (liveBadge) {
      liveBadge.textContent = this.sessionActive ? 'Active' : 'Upcoming';
      liveBadge.style.background = this.sessionActive ? '#047857' : '#0369a1';
    }
  }

  renderHeaderSessionAction() {
    const container = document.getElementById('topbar-session-action');
    if (!container) return;

    if (this.sessionActive) {
      container.innerHTML = `
        <button class="btn btn-sm btn-danger" id="topbar-end-session-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
          </svg>
          <span>End Session</span>
        </button>
      `;
      const btn = document.getElementById('topbar-end-session-btn');
      if (btn) btn.addEventListener('click', () => this.openSessionConfirmDialog());
    } else {
      container.innerHTML = `
        <button class="btn btn-sm btn-primary" id="topbar-start-session-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Start Session</span>
        </button>
      `;
      const btn = document.getElementById('topbar-start-session-btn');
      if (btn) btn.addEventListener('click', () => this.openSessionConfirmDialog());
    }
  }

  renderOverview() {
    // 1. Hero Card Updates
    const heroStatusPill = document.getElementById('hero-status-pill');
    const heroStatusText = document.getElementById('hero-status-text');
    const heroActionsRow = document.getElementById('hero-actions-row');
    const heroProgressWrapper = document.getElementById('hero-progress-wrapper');

    if (this.sessionActive) {
      if (heroStatusPill) {
        heroStatusPill.className = 'status-pill status-pill-active';
        heroStatusPill.innerHTML = '<span class="pulse-dot"></span><span>Active Session</span>';
      }
      if (heroProgressWrapper) heroProgressWrapper.hidden = false;
      if (heroActionsRow) {
        heroActionsRow.innerHTML = `
          <button class="btn btn-danger" id="overview-end-session-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="18" height="18" x="3" y="3" rx="2"/>
            </svg>
            <span>End Session</span>
          </button>
          <button class="btn btn-secondary" id="overview-temp-unlock-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
            </svg>
            <span>Grant Temporary Unlock</span>
          </button>
          <button class="btn btn-outline" id="overview-ping-all-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span>Send Focus Reminder</span>
          </button>
        `;
        document.getElementById('overview-end-session-action').addEventListener('click', () => this.openSessionConfirmDialog());
        document.getElementById('overview-temp-unlock-action').addEventListener('click', () => this.openUnlockModal());
        document.getElementById('overview-ping-all-action').addEventListener('click', () => {
          this.showToast('Focus reminder sent to all 28 enrolled student devices.', 'success');
        });
      }
    } else {
      if (heroStatusPill) {
        heroStatusPill.className = 'status-pill status-pill-upcoming';
        heroStatusPill.innerHTML = '<span>Upcoming Session (Starts in 15m)</span>';
      }
      if (heroProgressWrapper) heroProgressWrapper.hidden = true;
      if (heroActionsRow) {
        heroActionsRow.innerHTML = `
          <button class="btn btn-primary" id="overview-start-session-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span>Start Session Early</span>
          </button>
          <button class="btn btn-outline" id="overview-view-roster-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
            </svg>
            <span>Inspect Enrolled Devices (28)</span>
          </button>
        `;
        document.getElementById('overview-start-session-action').addEventListener('click', () => this.openSessionConfirmDialog());
        document.getElementById('overview-view-roster-action').addEventListener('click', () => this.switchView('devices'));
      }
    }

    this.updateSessionTimers();

    // 2. Active Unlocks List
    const unlocksContainer = document.getElementById('overview-active-unlocks-container');
    if (unlocksContainer) {
      const activeUnlocks = this.students.filter(s => s.status === 'unlocked');
      if (activeUnlocks.length === 0) {
        unlocksContainer.innerHTML = `
          <div class="no-unlocks-msg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="margin-bottom:0.4rem; opacity:0.6;">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p><strong>Zero active temporary unlocks.</strong><br>All present student devices are currently locked into the strict focus policy.</p>
          </div>
        `;
      } else {
        let html = '<div class="active-unlocks-list">';
        activeUnlocks.forEach(s => {
          html += `
            <div class="unlock-item-card">
              <div class="unlock-item-left">
                <div class="unlock-avatar">${s.avatar}</div>
                <div class="unlock-details">
                  <h4>${s.name}</h4>
                  <p>${s.deviceModel} • Reason: ${s.unlockReason}</p>
                </div>
              </div>
              <div class="unlock-item-right">
                <div class="countdown-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span data-student-countdown="${s.id}">${this.formatTime(s.unlockRemainingSeconds)}</span>
                </div>
                <button class="btn btn-sm btn-outline" data-revoke-id="${s.id}">Revoke</button>
              </div>
            </div>
          `;
        });
        html += '</div>';
        unlocksContainer.innerHTML = html;

        unlocksContainer.querySelectorAll('[data-revoke-id]').forEach(btn => {
          btn.addEventListener('click', () => {
            const sid = btn.getAttribute('data-revoke-id');
            this.revokeTemporaryUnlock(sid);
          });
        });
      }
    }

    // 3. Activity Feed
    this.renderActivityFeed();
  }

  renderActivityFeed() {
    const feedContainer = document.getElementById('overview-activity-feed');
    if (!feedContainer) return;

    let html = '';
    this.activityFeed.forEach(item => {
      html += `
        <div class="feed-item">
          <span class="feed-dot ${item.type}"></span>
          <span class="feed-text">${item.text}</span>
          <span class="feed-time">${item.time}</span>
        </div>
      `;
    });
    feedContainer.innerHTML = html;
  }

  renderLiveDevices() {
    const grid = document.getElementById('live-devices-grid');
    if (!grid) return;

    // Filter students
    let filtered = this.students.filter(s => {
      const matchSearch = !this.liveSearchQuery ||
        s.name.toLowerCase().includes(this.liveSearchQuery) ||
        s.deviceModel.toLowerCase().includes(this.liveSearchQuery) ||
        s.assetTag.toLowerCase().includes(this.liveSearchQuery);

      let matchStatus = true;
      if (this.liveFilterStatus === 'focused') matchStatus = (s.status === 'focused');
      else if (this.liveFilterStatus === 'unlocked') matchStatus = (s.status === 'unlocked');
      else if (this.liveFilterStatus === 'offline') matchStatus = (s.status === 'offline');

      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-lg);">
          <div class="empty-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <h3 class="empty-title">No Matching Devices in Live Session</h3>
          <p class="empty-desc">No student device matches the filter criteria "${this.liveSearchQuery || this.liveFilterStatus}".</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(s => {
      let statusBadge = '';
      let statusCardBorder = '';
      let actionButtons = '';

      if (s.status === 'focused') {
        statusBadge = `
          <span class="device-status-badge badge-focused">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Focused
          </span>`;
        actionButtons = `
          <button class="btn btn-sm btn-secondary" data-quick-unlock="${s.id}">Unlock</button>
          <button class="btn btn-sm btn-outline" data-quick-ping="${s.id}" title="Send silent reminder">Ping</button>
        `;
      } else if (s.status === 'unlocked') {
        statusBadge = `
          <span class="device-status-badge badge-unlocked">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Temp Unlocked
          </span>`;
        statusCardBorder = 'style="border-color: #fde68a; background: #fffdfa;"';
        actionButtons = `
          <button class="btn btn-sm btn-outline" data-revoke-id="${s.id}">Revoke Access</button>
        `;
      } else {
        statusBadge = `
          <span class="device-status-badge badge-offline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m1 1 22 22"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/></svg>
            Offline
          </span>`;
        actionButtons = `
          <button class="btn btn-sm btn-outline" data-quick-ping="${s.id}">Re-ping Beacon</button>
        `;
      }

      // Battery class
      let batteryClass = 'battery-high';
      if (s.battery < 20) batteryClass = 'battery-low';
      else if (s.battery < 50) batteryClass = 'battery-med';

      html += `
        <div class="device-card" ${statusCardBorder}>
          <div class="device-card-header">
            <div class="student-identity">
              <div class="student-avatar">${s.avatar}</div>
              <div>
                <div class="student-name">${s.name}</div>
                <div class="student-meta">${s.assetTag}</div>
              </div>
            </div>
            ${statusBadge}
          </div>

          <div class="device-card-body">
            <div class="device-info-row">
              <span style="color:var(--text-muted);">Hardware:</span>
              <span style="font-weight:600;">${s.deviceModel}</span>
            </div>
            <div class="device-info-row">
              <span style="color:var(--text-muted);">Battery:</span>
              <span class="battery-indicator ${batteryClass}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="16" height="10" x="2" y="7" rx="2" ry="2"/>
                  <line x1="22" x2="22" y1="11" y2="13"/>
                </svg>
                ${s.battery}%
              </span>
            </div>
            <div class="device-info-row">
              <span style="color:var(--text-muted);">Last Sync:</span>
              <span>${s.lastSync}</span>
            </div>

            ${s.status === 'unlocked' ? `
              <div class="countdown-live-row">
                <span>Timer: <strong data-student-countdown="${s.id}">${this.formatTime(s.unlockRemainingSeconds)}</strong></span>
                <span style="font-size:0.75rem;">${s.unlockReason}</span>
              </div>
            ` : ''}
          </div>

          <div class="device-card-footer">
            <span style="font-size:0.75rem; color:var(--text-muted);">Room 204 • AP Bio</span>
            <div style="display:flex; gap:0.4rem;">
              ${actionButtons}
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;

    // Attach listeners
    grid.querySelectorAll('[data-quick-unlock]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-quick-unlock');
        this.openUnlockModal(sid);
      });
    });

    grid.querySelectorAll('[data-revoke-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-revoke-id');
        this.revokeTemporaryUnlock(sid);
      });
    });

    grid.querySelectorAll('[data-quick-ping]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-quick-ping');
        this.sendReminderPing(sid);
      });
    });
  }

  renderSchedule() {
    const container = document.getElementById('schedule-timeline-container');
    if (!container) return;

    let html = '';
    this.schedule.forEach(item => {
      const isCurrent = (item.status === 'Current');
      let statusBadge = `<span class="pill-room">${item.status}</span>`;
      if (isCurrent) {
        statusBadge = `<span class="status-pill status-pill-active"><span class="pulse-dot"></span><span>In Progress</span></span>`;
      } else if (item.status === 'Completed') {
        statusBadge = `<span class="status-pill status-pill-ended">Completed</span>`;
      }

      html += `
        <div class="schedule-card ${isCurrent ? 'current' : ''}">
          <div class="schedule-time-col">
            <span class="time-range">${item.time}</span>
            <span class="time-duration">${item.duration} • ${item.period}</span>
          </div>

          <div class="schedule-class-col">
            <h4>${item.name}</h4>
            <p>${item.room} • Enrolled Devices: 28</p>
          </div>

          <div class="schedule-policy-col">
            <span class="policy-badge">Policy: ${item.policy}</span>
            <span class="policy-rules-summary">App Restrictions Active</span>
          </div>

          <div style="display:flex; justify-content:flex-end; align-items:center;">
            ${statusBadge}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderDevicesTable() {
    const tbody = document.getElementById('devices-table-body');
    const emptyState = document.getElementById('devices-empty-state');
    const tableEl = document.getElementById('devices-table');
    if (!tbody) return;

    let filtered = this.students.filter(s => {
      const matchSearch = !this.devicesSearchQuery ||
        s.name.toLowerCase().includes(this.devicesSearchQuery) ||
        s.deviceModel.toLowerCase().includes(this.devicesSearchQuery) ||
        s.assetTag.toLowerCase().includes(this.devicesSearchQuery);

      let matchStatus = true;
      if (this.devicesFilterStatus === 'focused') matchStatus = (s.status === 'focused');
      else if (this.devicesFilterStatus === 'unlocked') matchStatus = (s.status === 'unlocked');
      else if (this.devicesFilterStatus === 'offline') matchStatus = (s.status === 'offline');

      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      if (tableEl) tableEl.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.hidden = true;
    if (tableEl) tableEl.style.display = 'table';

    let html = '';
    filtered.forEach(s => {
      let statusBadge = '';
      let timerCell = '<span style="color:var(--text-light);">—</span>';
      let actionBtn = '';

      if (s.status === 'focused') {
        statusBadge = `<span class="device-status-badge badge-focused">Focused</span>`;
        actionBtn = `<button class="btn btn-sm btn-secondary" data-tbl-unlock="${s.id}">Unlock</button>`;
      } else if (s.status === 'unlocked') {
        statusBadge = `<span class="device-status-badge badge-unlocked">Temp Unlocked</span>`;
        timerCell = `<span class="countdown-badge" style="font-size:0.78rem;" data-student-countdown="${s.id}">${this.formatTime(s.unlockRemainingSeconds)}</span>`;
        actionBtn = `<button class="btn btn-sm btn-outline" data-tbl-revoke="${s.id}">Revoke</button>`;
      } else {
        statusBadge = `<span class="device-status-badge badge-offline">Offline</span>`;
        actionBtn = `<button class="btn btn-sm btn-outline" data-tbl-ping="${s.id}">Ping</button>`;
      }

      let batteryClass = 'battery-high';
      if (s.battery < 20) batteryClass = 'battery-low';
      else if (s.battery < 50) batteryClass = 'battery-med';

      html += `
        <tr>
          <td>
            <div class="table-student-cell">
              <div class="student-avatar" style="width:32px; height:32px; font-size:0.75rem;">${s.avatar}</div>
              <div>
                <strong style="color:var(--navy-900);">${s.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">Period 3 • AP Bio</div>
              </div>
            </div>
          </td>
          <td>${s.deviceModel}</td>
          <td><span class="asset-tag">${s.assetTag}</span></td>
          <td>
            <span class="battery-indicator ${batteryClass}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="16" height="10" x="2" y="7" rx="2" ry="2"/>
                <line x1="22" x2="22" y1="11" y2="13"/>
              </svg>
              ${s.battery}%
            </span>
          </td>
          <td>${statusBadge}</td>
          <td>${timerCell}</td>
          <td class="text-right">
            ${actionBtn}
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    // Attach listeners
    tbody.querySelectorAll('[data-tbl-unlock]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-tbl-unlock');
        this.openUnlockModal(sid);
      });
    });

    tbody.querySelectorAll('[data-tbl-revoke]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-tbl-revoke');
        this.revokeTemporaryUnlock(sid);
      });
    });

    tbody.querySelectorAll('[data-tbl-ping]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-tbl-ping');
        this.sendReminderPing(sid);
      });
    });
  }
}

// Initialize when DOM content is ready
document.addEventListener('DOMContentLoaded', () => {
  window.classModeApp = new ClassModeApp();
});
