/* Mock RBAC config. Add a role here only.
   Give each nav item a component name that exists in PAGES inside app.js.
   Menus, protected routes, and the login list all read this object. */
window.RBAC_CONFIG = {
  accounts: [
    { role: "admin", name: "Admin", email: "admin@company.com", password: "admin123" },
    { role: "manager", name: "Manager", email: "manager@company.com", password: "manager123" },
    { role: "user", name: "User", email: "user@company.com", password: "user123" }
  ],
  roles: {
    admin: {
      label: "Admin",
      nav: [
        { id: "dashboard", label: "Dashboard", icon: "grid", component: "adminDashboard" },
        { id: "users", label: "User Management", icon: "users", component: "users" },
        { id: "reports", label: "Reports", icon: "chart", component: "reports" },
        { id: "settings", label: "Settings", icon: "gear", component: "settings" }
      ]
    },
    manager: {
      label: "Manager",
      nav: [
        { id: "dashboard", label: "Dashboard", icon: "grid", component: "managerDashboard" },
        { id: "team", label: "Team Management", icon: "users", component: "team" },
        { id: "tasks", label: "Tasks", icon: "tasks", component: "tasks" },
        { id: "reports", label: "Reports", icon: "chart", component: "reports" }
      ]
    },
    user: {
      label: "User",
      nav: [
        { id: "dashboard", label: "Dashboard", icon: "grid", component: "userDashboard" },
        { id: "tasks", label: "My Tasks", icon: "tasks", component: "myTasks" },
        { id: "profile", label: "My Profile", icon: "user", component: "profile" }
      ]
    }
  }
};
