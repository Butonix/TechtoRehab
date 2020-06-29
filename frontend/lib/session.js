import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: "vqN6P2dqBPsEvQj5GuLyLWxhBZGhqLsF",
    cookieName: "session_user",
    cookieOptions: {
      secure: false,
    },
  });
}
