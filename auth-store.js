/* Global auth state. One store, many listeners — same job as Context, without Redux.
   Route checks and menus read this store. They do not hard-code role names. */
window.createAuthStore = function createAuthStore(config) {
  const LOCAL_KEY = "accessflow_session";
  const SESSION_KEY = "accessflow_session";
  const listeners = new Set();
  let user = null;
  let ready = false;

  function emit() {
    const snapshot = api.getState();
    listeners.forEach((fn) => fn(snapshot));
  }

  function accountFor(role) {
    return config.accounts.find((account) => account.role === role) || null;
  }

  function readSaved() {
    const raw = localStorage.getItem(LOCAL_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return accountFor(parsed.role);
    } catch {
      return null;
    }
  }

  const api = {
    config,
    getState() {
      return { ready, user };
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    role() {
      return user ? config.roles[user.role] : null;
    },
    can(page) {
      const role = api.role();
      if (!role || !page) return false;
      return role.nav.some((item) => item.id === page);
    },
    componentFor(page) {
      const role = api.role();
      const item = role && role.nav.find((entry) => entry.id === page);
      return item ? item.component : null;
    },
    restore() {
      user = readSaved();
      ready = true;
      emit();
      return user;
    },
    login(account, remember) {
      user = account;
      ready = true;
      const payload = JSON.stringify({ role: account.role });
      localStorage.removeItem(LOCAL_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      (remember ? localStorage : sessionStorage).setItem(LOCAL_KEY, payload);
      emit();
    },
    logout() {
      user = null;
      ready = true;
      localStorage.removeItem(LOCAL_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      emit();
    }
  };

  return api;
};
