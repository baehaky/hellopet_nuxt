import { useCookie } from "#app";

export function useAuthCookie() {
  const tokenCookie = useCookie("sb-access-token", { httpOnly: true, sameSite: "lax" });

  function setToken(token: string | null) {
    if (token) {
      tokenCookie.value = token;
    } else {
      tokenCookie.value = null;
    }
  }

  function getToken() {
    return tokenCookie.value;
  }

  return {
    setToken,
    getToken,
  };
}
