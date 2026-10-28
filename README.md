# AccessFlow

AccessFlow is a frontend role-based access control app. Three roles sign in and each one sees a different menu and different pages. There is no backend and no database.

## Tech

- HTML
- CSS
- JavaScript

Login data lives in `roles.js`. The same data is also in `roles.json`. The session is stored in the browser: `localStorage` when Remember me is on, otherwise `sessionStorage`. Pages use hash routes such as `#/dashboard` and `#/settings`.

## Run

Open `index.html` in a browser.

Or start a local server from this folder:

```bash
python -m http.server 5500
```

Then open `http://127.0.0.1:5500/`.

## Demo accounts

The Login as dropdown must match the account role.

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@company.com | admin123 |
| Manager | manager@company.com | manager123 |
| User | user@company.com | user123 |

Use Demo Accounts on the login page signs in with one click.

## What each role can open

- **Admin:** Dashboard, User Management, Reports, Settings
- **Manager:** Dashboard, Team Management, Tasks, Reports
- **User:** Dashboard, My Tasks, My Profile

## Access Denied

The Access Denied page opens in two cases:

- Email, password, or selected role does not match
- A signed-in user opens a page their role is not allowed to see

Back to Home returns to the login page. Back to Dashboard returns to that role's home page when a session exists.

## Files

- `index.html` — screens
- `style.css` — layout and visuals
- `app.js` — login, routing, and page rendering
- `auth-store.js` — session and permission checks
- `roles.js` — accounts and role menus
- `roles.json` — the same role data in JSON
