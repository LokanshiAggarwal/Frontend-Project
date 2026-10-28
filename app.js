const auth = createAuthStore(window.RBAC_CONFIG);
let routeReady = false;

const ICONS = {
  grid: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-9.5z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 11a3.2 3.2 0 1 0-3.2-3.2A3.2 3.2 0 0 0 9 11zm7.2.6a2.7 2.7 0 1 0-2.7-2.7 2.7 2.7 0 0 0 2.7 2.7zM3.2 18.6c.3-2.6 2.4-4 5.8-4s5.5 1.4 5.8 4v.6H3.2zm9.3.4c-.2-1 .2-2 .9-2.8 1.3-.3 3.2.2 3.8 2.8v.6h-4.7z"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h7l5 5v15H7V2zm7 1.6V8h4.2M9.2 12h7.6v1.6H9.2zm0 3.2h7.6V17H9.2z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.4 13a7.7 7.7 0 0 0 .1-2l2-1.5-2-3.4-2.3.7a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.5 2.8a7.6 7.6 0 0 0-1.7 1L6.5 6.1l-2 3.4L6.5 11a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.4 2.3-.7a7.6 7.6 0 0 0 1.7 1L11 21h4l.5-2.8a7.6 7.6 0 0 0 1.7-1l2.3.7 2-3.4-2.1-1.5zM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5z"/></svg>',
  tasks: '<svg viewBox="0 0 24 24"><path d="M7 4h12v2H7V4zm0 7h12v2H7v-2zm0 7h12v2H7v-2zM4 4h2v2H4V4zm0 7h2v2H4v-2zm0 7h2v2H4v-2z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm7-6V11a7 7 0 0 0-5-6.7V3a2 2 0 1 0-4 0v1.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2z"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8l6 6v14H6V2zm8 1.5V8h4.5"/></svg>',
  person: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
  bug: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.2 4.2 14.6 3l1.2 1.2-1.1 1.1A5 5 0 0 1 17 9h2v2h-2.1a5 5 0 0 1-.4 1.6l1.8 1.8-1.4 1.4-1.7-1.7A5 5 0 0 1 13 15.8V19h-2v-3.2a5 5 0 0 1-2.2-1.7l-1.7 1.7-1.4-1.4 1.8-1.8A5 5 0 0 1 7.1 11H5V9h2a5 5 0 0 1 2.3-3.7L8.2 4.2 9.4 3l1.4 1.2A5 5 0 0 1 13.2 4.2zM9 11a3 3 0 0 0 6 0V9H9v2z"/></svg>',
  slides: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v12H3V4zm2 2v8h14V6H5zm5.2 14 .8-2h2l.8 2h-3.6zM8 8h3v5H8V8zm4 2h4v3h-4v-3z"/></svg>',
  board: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 3.2h8a2 2 0 0 1 2 2V6h1.2A1.8 1.8 0 0 1 21 7.8v11.4A1.8 1.8 0 0 1 19.2 21H4.8A1.8 1.8 0 0 1 3 19.2V7.8A1.8 1.8 0 0 1 4.8 6H6V5.2a2 2 0 0 1 2-2zm1.1 2v1.1h5.8V5.2H9.1zM7.2 10.2h9.6v1.6H7.2zm0 3.3h6.4v1.6H7.2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1 11H7V11h4V6h2v7z"/></svg>',
  crown: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17 5.2 8l4.1 3.4L12 6l2.7 5.4L18.8 8 21 17H3zm1.2 2h15.6v2H4.2z"/></svg>',
  trend: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 16.5 9.2 11l3.1 3.2L20 7.2V11h2V4h-7v2h3.6l-6.2 6.6-3.1-3.2L3 15.2z"/></svg>'
};

const NOTES = [
  { title: "New user registered", time: "2 minutes ago", page: "users", tone: "bg-lilac", icon: "user" },
  { title: "Report generated", time: "12 minutes ago", page: "reports", tone: "bg-amber", icon: "doc" },
  { title: "Settings updated", time: "1 hour ago", page: "settings", tone: "bg-blue", icon: "gear" },
  { title: "User permissions changed", time: "2 hours ago", page: "users", tone: "bg-green", icon: "users" }
];

const state = {
  page: "dashboard",
  query: "",
  year: "This Year",
  showAllActivity: false,
  taskFilter: "All",
  users: [
    { name: "Aarav Sharma", email: "aarav@company.com", role: "Manager", status: "Active", avatar: "avatars/avatar-aarav.jpg" },
    { name: "Isha Verma", email: "isha@company.com", role: "User", status: "Active", avatar: "avatars/avatar-isha.jpg" },
    { name: "Rohan Mehta", email: "rohan@company.com", role: "User", status: "Active", avatar: "avatars/avatar-rohan.jpg" },
    { name: "Neha Kapoor", email: "neha@company.com", role: "User", status: "Offline", avatar: "avatars/avatar-neha.jpg" },
    { name: "Kabir Nair", email: "kabir@company.com", role: "User", status: "Active", avatar: "avatars/avatar-kabir.jpg" },
    { name: "Meera Joshi", email: "meera@company.com", role: "User", status: "Active", avatar: "avatars/avatar-meera.jpg" },
    { name: "Arjun Das", email: "arjun@company.com", role: "User", status: "Offline", avatar: "avatars/avatar-arjun.jpg" }
  ],
  team: [
    { name: "Aarav Sharma", title: "UI/UX Designer", status: "Online", tone: "online", color: "#7c5cff", avatar: "avatars/avatar-aarav.jpg" },
    { name: "Isha Verma", title: "Frontend Developer", status: "In Progress", tone: "progress", color: "#d946a6", avatar: "avatars/avatar-isha.jpg" },
    { name: "Rohan Mehta", title: "Backend Developer", status: "In Meeting", tone: "meeting", color: "#3b82f6", avatar: "avatars/avatar-rohan.jpg" },
    { name: "Neha Kapoor", title: "QA Engineer", status: "Offline", tone: "offline", color: "#12b76a", avatar: "avatars/avatar-neha.jpg" },
    { name: "Kabir Nair", title: "DevOps Engineer", status: "Online", tone: "online", color: "#0ea5e9", avatar: "avatars/avatar-kabir.jpg" },
    { name: "Meera Joshi", title: "Product Designer", status: "In Progress", tone: "progress", color: "#a855f7", avatar: "avatars/avatar-meera.jpg" },
    { name: "Arjun Das", title: "Data Analyst", status: "Offline", tone: "offline", color: "#64748b", avatar: "avatars/avatar-arjun.jpg" }
  ],
  tasks: [
    { title: "Update landing page UI", due: "Due Today", status: "In Progress", tone: "t-blue", icon: "doc", ico: "bg-blue" },
    { title: "Fix navigation bug", due: "Due Tomorrow", status: "Pending", tone: "t-pink", icon: "bug", ico: "bg-amber" },
    { title: "Prepare presentation", due: "12 Apr 2025", status: "Completed", tone: "t-lilac", icon: "slides", ico: "bg-lilac" }
  ],
  settings: { org: "AccessFlow", signup: true, timeout: "30 minutes" },
  helpMode: false
};

const $ = (sel) => document.querySelector(sel);

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

function toast(message, type) {
  const el = $("#toast");
  el.textContent = message;
  el.className = "toast show" + (type ? " " + type : "");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.className = "toast"; }, 2200);
}

function greet() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function formatToday() {
  return new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function show(id) {
  ["loginView", "appView", "deniedView"].forEach((view) => {
    $("#" + view).classList.toggle("hidden", view !== id);
  });
}

function currentUser() {
  return auth.getState().user;
}

function paintChrome() {
  const user = currentUser();
  $("#avatar").textContent = user.name.slice(0, 1);
  $("#avatar").className = "avatar " + user.role;
  $("#userLabel").textContent = user.name;
  $("#today").textContent = formatToday();
}

function showDenied() {
  show("deniedView");
}

function login(account, remember) {
  auth.login(account, remember);
  state.page = "";
  state.query = "";
  $("#globalSearch").value = "";
  openPage("dashboard");
}

function logout() {
  auth.logout();
  document.body.classList.remove("on-dash");
  state.page = "";
  history.replaceState(null, "", location.pathname + location.search);
  show("loginView");
}

function renderNav() {
  const role = auth.role();
  if (!role) return;
  $("#sideNav").innerHTML = role.nav.map((item) => `
    <button class="nav-link${state.page === item.id ? " active" : ""}" type="button" data-page="${esc(item.id)}">
      ${ICONS[item.icon] || ""}
      ${esc(item.label)}
    </button>
  `).join("");
}

/* Protected route: the menu config is the allow-list. Unknown pages show Access Denied. */
function openPage(page, push) {
  if (!currentUser()) {
    show("loginView");
    return;
  }
  if (!auth.can(page)) {
    state.page = "denied";
    document.body.classList.remove("on-dash");
    showDenied();
    if (push !== false) location.hash = "/denied";
    return;
  }
  state.page = page;
  document.body.classList.toggle("on-dash", page === "dashboard");
  paintChrome();
  show("appView");
  renderNav();
  renderContent();
  if (push !== false) location.hash = "/" + page;
}

function match(text) {
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  return String(text).toLowerCase().includes(q);
}

function stat(tone, label, value, delta, good, icon) {
  return `
    <article class="stat ${tone}">
      <header>${label}<span class="bubble">${icon}</span></header>
      <strong>${value}</strong>
      <em class="${good ? "up" : "down"}">${delta} <span>from last month</span></em>
    </article>`;
}

function statSide(tone, label, value, icon) {
  return `
    <article class="stat stat-side ${tone}">
      <span class="bubble">${icon}</span>
      <span class="stat-copy"><small>${esc(label)}</small><strong>${esc(value)}</strong></span>
    </article>`;
}

function faceHtml(person) {
  if (person.avatar) return `<img class="face" src="${esc(person.avatar)}" alt="">`;
  const color = person.color || "#7c5cff";
  return `<span class="avatar sm" style="background:${color}">${esc(person.name.slice(0, 1))}</span>`;
}

function peopleList(items) {
  const rows = items.filter((person) => match(person.name + person.title + person.status));
  if (!rows.length) return `<p class="empty">No people match that search.</p>`;
  return `<ul class="people">${rows.map((person) => `
    <li>
      ${faceHtml(person)}
      <span class="who"><b>${esc(person.name)}</b><small>${esc(person.title)}</small></span>
      <span class="tag ${person.tone}">${esc(person.status)}</span>
    </li>`).join("")}</ul>`;
}

function taskList(items) {
  const rows = items.filter((task) => {
    const statusOk = state.taskFilter === "All" || task.status === state.taskFilter;
    return statusOk && match(task.title + task.status + task.due);
  });
  if (!rows.length) return `<p class="empty">No tasks match that search.</p>`;
  return `<ul class="task-list">${rows.map((task, index) => `
    <li>
      <span class="who"><b>${esc(task.title)}</b><small>${esc(task.due)}</small></span>
      <span class="tag ${task.tone}">${esc(task.status)}</span>
      <button class="icon-mini" type="button" data-task="${index}">${task.status === "Completed" ? "Reopen" : "Done"}</button>
    </li>`).join("")}</ul>`;
}

function renderAdminHome() {
  const bars = state.year === "This Year"
    ? [["Jan", 42], ["Feb", 58], ["Mar", 50], ["Apr", 74, true], ["May", 52], ["Jun", 92]]
    : [["Q1", 48], ["Q2", 70, true], ["Q3", 62], ["Q4", 88]];
  const activity = (state.showAllActivity ? NOTES.concat([
    { title: "Backup completed", time: "Yesterday", page: "settings", tone: "bg-amber" }
  ]) : NOTES).filter((item) => match(item.title));
  return `
    <div class="dash-fit">
    <div class="hello hello-row">
      <div><h2>${greet()}, Admin! 👋</h2><p>Here's what's happening with your organization today.</p></div>
      <time class="today">${formatToday()}</time>
    </div>
    <section class="stats">
      ${stat("blue", "Total Users", "120", "+12%", true, ICONS.users)}
      ${stat("mint", "Active Users", "98", "+8%", true, ICONS.trend)}
      ${stat("peach", "Reports Generated", "24", "+5%", true, ICONS.doc)}
      ${stat("pink", "Pending Requests", "6", "-20%", false, ICONS.clock)}
    </section>
    <section class="grid-2">
      <article class="card">
        <div class="card-head"><h3>User Growth</h3>
          <button class="year" type="button" id="yearBtn">${esc(state.year)}</button>
        </div>
        <div class="bars">
          ${bars.map(([label, height, hot]) => `
            <div class="bar${hot ? " hot" : ""}">
              <i style="height:${height}%">${hot ? `<span class="tip">${state.year === "This Year" ? "80 users in April" : "210 users in Q2"}</span>` : ""}</i>
              <span>${label}</span>
            </div>`).join("")}
        </div>
      </article>
      <article class="card">
        <div class="card-head"><h3>Recent Activity</h3><button type="button" data-page="activity">View all</button></div>
        <ul class="activity">
          ${activity.map((item) => `
            <li><button class="rowbtn" type="button" data-goto="${item.page}">
              <span class="badge-ico ${item.tone}">${ICONS[item.icon] || ICONS.bell}</span>
              <span><b>${esc(item.title)}</b><small>${esc(item.time)}</small></span>
            </button></li>`).join("") || `<li><p class="empty">No activity found.</p></li>`}
        </ul>
      </article>
      <article class="promo">
        <span class="crown">${ICONS.crown}</span>
        <h3>You have full access</h3>
        <p>Manage users, view reports, and configure system settings.</p>
        <button type="button" data-page="settings">Go to Settings →</button>
      </article>
    </section>
    </div>`;
}

function renderManagerHome() {
  return `
    <div class="dash-fit">
    <div class="hello hello-row">
      <div><h2>${greet()}, Manager! 👋</h2><p>Let's keep your team on track today.</p></div>
      <time class="today">${formatToday()}</time>
    </div>
    <section class="stats three">
      ${statSide("blue", "Team Members", "12", ICONS.users)}
      ${statSide("peach", "Tasks in Progress", "8", ICONS.board)}
      ${statSide("mint", "Completed Tasks", "24", ICONS.check)}
    </section>
    <section class="grid-split">
      <article class="card">
        <div class="card-head"><h3>Team Overview</h3><button type="button" data-page="team">View all</button></div>
        ${peopleList(state.team)}
      </article>
      <article class="card">
        <div class="card-head"><h3>Task Progress</h3></div>
        <div class="donut-wrap">
          <div class="donut"><span>75%</span></div>
          <ul class="legend">
            <li><i class="c1"></i> Completed <b>24</b></li>
            <li><i class="c2"></i> In Progress <b>8</b></li>
            <li><i class="c3"></i> Pending <b>4</b></li>
          </ul>
        </div>
        <ul class="points">
          <li><i class="c1"></i><span><b>Update landing page UI</b><small>Completed · Aarav Sharma</small></span></li>
          <li><i class="c2"></i><span><b>Fix navigation bug</b><small>In progress · Rohan Mehta</small></span></li>
          <li><i class="c2"></i><span><b>Prepare presentation</b><small>In progress · Isha Verma</small></span></li>
          <li><i class="c3"></i><span><b>QA regression pass</b><small>Pending · Neha Kapoor</small></span></li>
        </ul>
      </article>
    </section>
    </div>`;
}

function renderUserHome() {
  const tasks = state.tasks.filter((task) => match(task.title + task.status + task.due));
  return `
    <div class="dash-fit">
    <div class="hello hello-row">
      <div><h2>${greet()}, User! 👋</h2><p>Here are your tasks for today.</p></div>
      <time class="today">${formatToday()}</time>
    </div>
    <section class="hero-banner">
      <div class="hero-copy">
        <h3>Stay Productive,<br>You're Doing Great! 👋</h3>
        <button class="btn-primary" type="button" data-page="tasks">View All Tasks →</button>
      </div>
    </section>
    <section class="grid-split">
      <article class="card card-scroll">
        <div class="card-head"><h3>My Tasks</h3><button type="button" data-page="tasks">View all</button></div>
        <ul class="task-list home-tasks">
          ${tasks.map((task) => `
            <li>
              <span class="badge-ico ${task.ico}">${ICONS[task.icon] || ICONS.tasks}</span>
              <span class="who"><b>${esc(task.title)}</b><small>${esc(task.due)}</small></span>
              <span class="tag ${task.tone}">${esc(task.status)}</span>
            </li>`).join("") || `<li><p class="empty">No tasks match that search.</p></li>`}
        </ul>
        <div class="fill-block">
          <h4>Coming up</h4>
          <ul class="agenda">
            <li><i class="c1"></i><span><b>Design review</b><small>Today · 4:00 PM</small></span></li>
            <li><i class="c2"></i><span><b>Bug fix standup</b><small>Tomorrow · 11:00 AM</small></span></li>
            <li><i class="c1"></i><span><b>Share presentation</b><small>12 Apr · 3:00 PM</small></span></li>
          </ul>
        </div>
      </article>
      <article class="card card-scroll profile-panel">
        <div class="card-head"><h3>My Profile</h3></div>
        <div class="profile-card">
          <span class="big">U</span>
          <div>
            <b>User</b>
            <small>user@company.com</small>
            <span class="role-line">${ICONS.user} Frontend Developer</span>
          </div>
        </div>
        <div class="mini-stats">
          <div><b>12</b><small>Day streak</small></div>
          <div><b>86%</b><small>On time</small></div>
          <div><b>6h</b><small>Today</small></div>
        </div>
        <ul class="profile-meta">
          <li><span>Department</span><b>Product</b></li>
          <li><span>Shift</span><b>Morning</b></li>
          <li><span>Open tasks</span><b>2</b></li>
          <li><span>Completed</span><b>1</b></li>
        </ul>
        <button class="btn-primary profile-go" type="button" data-page="profile">View Profile →</button>
      </article>
    </section>
    </div>`;
}

function renderUsers() {
  const rows = state.users.filter((user) => match(user.name + user.email + user.role + user.status));
  return `
    <div class="hello"><h2>User Management</h2><p>People who can sign in to AccessFlow.</p></div>
    <article class="card">
      <form id="addUser" class="stack" style="margin-bottom:14px">
        <input name="name" placeholder="Full name" required>
        <input name="email" type="email" placeholder="Email" required>
        <select name="role"><option>User</option><option>Manager</option><option>Admin</option></select>
        <button class="btn-primary slim" type="submit">Add user</button>
      </form>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${rows.map((user) => `
              <tr>
                <td><span class="who-inline">${faceHtml(user)}${esc(user.name)}</span></td><td>${esc(user.email)}</td><td>${esc(user.role)}</td>
                <td><span class="tag ${user.status === "Disabled" ? "offline" : "online"}">${esc(user.status)}</span></td>
                <td><button class="icon-mini" type="button" data-email="${esc(user.email)}">${user.status === "Disabled" ? "Enable" : "Disable"}</button></td>
              </tr>`).join("") || `<tr><td colspan="5" class="empty">No users found.</td></tr>`}
          </tbody>
        </table>
      </div>
    </article>`;
}

function renderTeam() {
  return `
    <div class="hello"><h2>Team Management</h2><p>Everyone on your team today.</p></div>
    <article class="card">${peopleList(state.team)}</article>`;
}

function renderTasks(mine) {
  return `
    <div class="hello"><h2>${mine ? "My Tasks" : "Tasks"}</h2><p>${mine ? "Work assigned to you." : "Track the team's work."}</p></div>
    <article class="card">
      <div class="filters">
        ${["All", "In Progress", "Pending", "Completed"].map((name) => `
          <button type="button" data-filter="${name}" class="${state.taskFilter === name ? "on" : ""}">${name}</button>
        `).join("")}
      </div>
      ${taskList(state.tasks)}
    </article>`;
}

function renderReports() {
  const reports = [
    ["Access summary", "16 Apr 2025", "Ready"],
    ["Team activity", "15 Apr 2025", "Ready"],
    ["Pending requests", "14 Apr 2025", "Queued"]
  ].filter((row) => match(row.join(" ")));
  return `
    <div class="hello"><h2>Reports</h2><p>Generated reports for this workspace.</p></div>
    <article class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Report</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${reports.map((row) => `
              <tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td><td>${esc(row[2])}</td>
              <td><button class="icon-mini" type="button" data-report="${esc(row[0])}">Download</button></td></tr>
            `).join("") || `<tr><td colspan="4" class="empty">No reports found.</td></tr>`}
          </tbody>
        </table>
      </div>
    </article>`;
}

function renderSettings() {
  const s = state.settings;
  return `
    <div class="hello"><h2>Settings</h2><p>Configure this AccessFlow workspace.</p></div>
    <article class="card">
      <form id="settingsForm" class="stack">
        <label>Organization<input class="plain" name="org" value="${esc(s.org)}"></label>
        <label class="toggle">Allow self signup
          <button class="switch${s.signup ? " on" : ""}" type="button" id="signupToggle"><i></i></button>
        </label>
        <label>Session timeout
          <select class="plain" name="timeout">
            ${["15 minutes", "30 minutes", "1 hour"].map((opt) => `<option${opt === s.timeout ? " selected" : ""}>${opt}</option>`).join("")}
          </select>
        </label>
        <button class="btn-primary slim" type="submit">Save settings</button>
      </form>
    </article>`;
}

function renderProfile() {
  return `
    <div class="hello"><h2>My Profile</h2><p>Your AccessFlow account.</p></div>
    <article class="card">
      <div class="profile-card">
        <span class="big">U</span>
        <div>
          <b>User</b>
          <div>user@company.com</div>
          <small>Frontend Developer · User role</small>
        </div>
      </div>
      <form id="profileForm" class="stack" style="margin-top:16px">
        <input name="title" value="Frontend Developer">
        <button class="btn-primary slim" type="submit">Save profile</button>
      </form>
    </article>`;
}

const PAGES = {
  adminDashboard: renderAdminHome,
  managerDashboard: renderManagerHome,
  userDashboard: renderUserHome,
  users: renderUsers,
  team: renderTeam,
  tasks: () => renderTasks(false),
  myTasks: () => renderTasks(true),
  reports: renderReports,
  settings: renderSettings,
  profile: renderProfile
};

function renderContent() {
  const component = auth.componentFor(state.page);
  const render = PAGES[component];
  if (!render) {
    showDenied();
    return;
  }
  $("#content").innerHTML = render();
}

function notesHtml() {
  return NOTES.map((note) => `
    <button type="button" data-goto="${note.page}">
      <b>${esc(note.title)}</b><small>${esc(note.time)}</small>
    </button>`).join("");
}

function downloadReport(name) {
  const blob = new Blob([`${name}\nGenerated by AccessFlow\n`], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name.toLowerCase().replace(/\s+/g, "-") + ".txt";
  link.click();
  URL.revokeObjectURL(url);
  toast("Report downloaded");
}

function bindContent(event) {
  const pageBtn = event.target.closest("[data-page]");
  if (pageBtn) {
    const page = pageBtn.dataset.page;
    if (page === "activity") {
      state.showAllActivity = !state.showAllActivity;
      renderContent();
      return;
    }
    openPage(page);
    return;
  }
  const goto = event.target.closest("[data-goto]");
  if (goto) {
    $("#noteMenu").classList.add("hidden");
    openPage(goto.dataset.goto);
    return;
  }
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state.taskFilter = filter.dataset.filter;
    renderContent();
    return;
  }
  const taskBtn = event.target.closest("[data-task]");
  if (taskBtn) {
    const visible = state.tasks.filter((task) => {
      const statusOk = state.taskFilter === "All" || task.status === state.taskFilter;
      return statusOk && match(task.title + task.status + task.due);
    });
    const task = visible[Number(taskBtn.dataset.task)];
    if (!task) return;
    if (task.status === "Completed") {
      task.status = "Pending";
      task.tone = "pending";
    } else {
      task.status = "Completed";
      task.tone = "done";
    }
    renderContent();
    toast("Task updated");
    return;
  }
  const report = event.target.closest("[data-report]");
  if (report) downloadReport(report.dataset.report);
  const emailBtn = event.target.closest("[data-email]");
  if (emailBtn) {
    const user = state.users.find((item) => item.email === emailBtn.dataset.email);
    if (!user) return;
    user.status = user.status === "Disabled" ? "Active" : "Disabled";
    renderContent();
    toast(user.status === "Active" ? "User enabled" : "User disabled");
  }
  if (event.target.id === "yearBtn") {
    state.year = state.year === "This Year" ? "By quarter" : "This Year";
    renderContent();
  }
  if (event.target.id === "signupToggle") {
    state.settings.signup = !state.settings.signup;
    renderContent();
  }
}

function onContentSubmit(event) {
  const form = event.target;
  if (form.id === "addUser") {
    event.preventDefault();
    const data = new FormData(form);
    state.users.unshift({
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      role: data.get("role"),
      status: "Active"
    });
    renderContent();
    toast("User added");
  }
  if (form.id === "settingsForm") {
    event.preventDefault();
    const data = new FormData(form);
    state.settings.org = data.get("org").trim() || "AccessFlow";
    state.settings.timeout = data.get("timeout");
    toast("Settings saved");
  }
  if (form.id === "profileForm") {
    event.preventDefault();
    toast("Profile saved");
  }
}

function openForgot() {
  $("#modalTitle").textContent = "Forgot password";
  $("#modalText").textContent = "Enter your work email and we will send a reset link.";
  $("#modalEmail").classList.remove("hidden");
  $("#modalOk").textContent = "Send link";
  $("#modal").classList.remove("hidden");
  state.helpMode = false;
}

function openHelp() {
  $("#modalTitle").textContent = "Help & Support";
  $("#modalText").textContent = "Ask your administrator if a page is locked. Settings and user management stay with the admin role.";
  $("#modalEmail").classList.add("hidden");
  $("#modalOk").textContent = "Open settings";
  $("#modal").classList.remove("hidden");
  state.helpMode = true;
}

function fillLoginChoices() {
  const { accounts, roles } = auth.config;
  $("#role").innerHTML = Object.entries(roles).map(([id, role]) => (
    `<option value="${esc(id)}">${esc(role.label)}</option>`
  )).join("");
  $("#demoPanel").innerHTML = accounts.map((account) => `
    <button type="button" data-demo="${esc(account.role)}">
      <b>${esc(account.name)}</b>
      <small>${esc(account.email)} · ${esc(account.password)}</small>
    </button>
  `).join("");
}

function init() {
  $("#today") && ($("#today").textContent = formatToday());
  fillLoginChoices();

  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $("#email").value.trim().toLowerCase();
    const password = $("#password").value;
    const role = $("#role").value;
    const card = $(".login-card");
    const error = $("#loginError");
    const account = auth.config.accounts.find((item) => item.email === email);
    if (!email || !password) {
      error.textContent = "Enter email and password";
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
      return;
    }
    if (!account || account.password !== password || account.role !== role) {
      error.textContent = "";
      showDenied();
      location.hash = "/denied";
      return;
    }
    error.textContent = "";
    login(account, $("#remember").checked);
  });

  $("#togglePass").addEventListener("click", () => {
    const input = $("#password");
    input.type = input.type === "password" ? "text" : "password";
  });

  $("#demoToggle").addEventListener("click", () => {
    $("#demoPanel").classList.toggle("hidden");
  });

  $("#demoPanel").addEventListener("click", (event) => {
    const button = event.target.closest("[data-demo]");
    if (!button) return;
    const account = auth.config.accounts.find((item) => item.role === button.dataset.demo);
    if (account) login(account, true);
  });

  $("#forgotBtn").addEventListener("click", openForgot);
  $("#helpBtn").addEventListener("click", openHelp);
  $("#logoutBtn").addEventListener("click", logout);
  $("#homeBtn").addEventListener("click", logout);
  $("#backDash").addEventListener("click", () => openPage("dashboard"));

  $("#sideNav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (button) openPage(button.dataset.page);
  });

  $("#content").addEventListener("click", bindContent);
  $("#content").addEventListener("submit", onContentSubmit);

  $("#globalSearch").addEventListener("input", (event) => {
    state.query = event.target.value;
    if (currentUser()) renderContent();
  });

  $("#bellBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = $("#noteMenu");
    menu.innerHTML = notesHtml();
    menu.classList.toggle("hidden");
  });
  $("#noteMenu").addEventListener("click", (event) => {
    const button = event.target.closest("[data-goto]");
    if (!button) return;
    $("#noteMenu").classList.add("hidden");
    openPage(button.dataset.goto);
  });

  $("#userChip").addEventListener("click", () => {
    if (auth.can("profile")) openPage("profile");
    else toast("Signed in as " + currentUser().name);
  });

  document.addEventListener("click", () => $("#noteMenu").classList.add("hidden"));

  $("#modal").addEventListener("click", (event) => {
    if (event.target.id === "modal") $("#modal").classList.add("hidden");
  });
  $("#modalCancel").addEventListener("click", () => $("#modal").classList.add("hidden"));
  $("#modalCard").addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.helpMode) {
      $("#modal").classList.add("hidden");
      if (currentUser()) openPage("settings");
      return;
    }
    const email = $("#modalEmail").value.trim();
    if (!email) {
      toast("Enter an email", "err");
      return;
    }
    $("#modal").classList.add("hidden");
    toast("Reset link sent");
  });

  window.addEventListener("hashchange", () => {
    if (!routeReady || !currentUser()) return;
    const page = location.hash.replace("#/", "") || "dashboard";
    if (page === "denied") {
      showDenied();
      return;
    }
    if (page !== state.page) openPage(page, false);
  });

  const saved = auth.restore();
  if (saved) {
    const hash = location.hash.replace("#/", "");
    if (hash === "denied") showDenied();
    else openPage(hash || "dashboard", false);
  } else if ((location.hash.replace("#/", "") || "") === "denied") {
    showDenied();
  } else {
    show("loginView");
  }
  routeReady = true;
  document.body.classList.add("auth-ready");
}

init();
