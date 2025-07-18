const route = <T extends string>(path: T) => `${path}` as const;

const userRoute = <T extends string>(path: T) => route(`/user${path}`);

const myNetwork = <T extends string>(path: T) =>
  userRoute(`/my-network${path}`);

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
    myNetwork: {
      root: myNetwork(""),
      genealogy: myNetwork("/genealogy"),
      myReferrals: myNetwork("/my-referrals"),
      totalTeams: myNetwork("/total-teams"),
    },
    referralLink: userRoute("/referral-link"),
  },
};

export const AUTH_ROUTES = new Set<string>([
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
]);
