export function seedBackOfficeSession(win, session) {
  if (!session || !session.token || !session.user) {
    throw new Error(
      'Cannot seed back-office session: token or user is missing.'
    );
  }

  win.localStorage.clear();
  win.sessionStorage.clear();

  win.localStorage.setItem('token', session.token);
  win.localStorage.setItem(
    'user',
    JSON.stringify(session.user)
  );

  win.localStorage.setItem('lang', 'en');
}