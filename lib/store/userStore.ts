"use client"

import { create } from "zustand"

type User = {
  id?: string
  first_name?: string
  last_name?: string
  name?: string
  email?: string
}

type UserState = {
  token?: string | null
  user?: User | null
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  clear: () => void
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set(() => ({ token })),
  setUser: (user) => set(() => ({ user })),
  clear: () => set(() => ({ token: null, user: null })),
}))

export default useUserStore
