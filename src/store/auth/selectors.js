export const selectAuth = (state) => state.auth;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;