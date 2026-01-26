"use client"

export function setTokenCookie(token: string, days = 30) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `token=${token}; path=/; max-age=${maxAge}; samesite=lax`
}

export function clearTokenCookie() {
  document.cookie = `token=; path=/; max-age=0; samesite=lax`
}

export function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'))
  if (match) return match[2]
  return null
}
