export const cookieMock = {
  cookies: {
    sessionId: "132453",
    attributes: {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  },
  headers: {
    "Set-Cookie": "sessionId=132453; Path=/; HttpOnly; SameSite=Lax;",
    "Content-Type": "application/json",
  },
  body: {
    sessionId: "132453",
  },
  status: 200,
};
