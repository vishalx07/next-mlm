const route = <T extends string>(path: T) => `${path}` as const;

const userRoute = <T extends string>(path: T) => route(`/user${path}`);

export const ROUTES = {
  home: route("/"),
  // auth
  login: route("/login"),
  register: route("/register"),
  forgotPassword: route("/forgot-password"),
  // dashboard
  user: {
    root: userRoute(""),
    dashboard: userRoute("/dashboard"),
    plans: userRoute("/plans"),
    profile: userRoute("/profile"),
  },
};

export const AUTH_ROUTES = new Set<string>([
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
]);
