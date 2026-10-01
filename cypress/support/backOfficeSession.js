
export function seedBackOfficeSession(win, session) {
  win.localStorage.clear();
  win.sessionStorage.clear();
  win.localStorage.setItem('token', session.token);
  win.localStorage.setItem('user', JSON.stringify(session.user));
  win.localStorage.setItem('lang', 'en');
}