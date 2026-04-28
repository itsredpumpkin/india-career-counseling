import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if token exists in localStorage on mount
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setToken(savedToken)
    }
    setIsLoading(false)
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('admin_token', newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('admin_token')
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
