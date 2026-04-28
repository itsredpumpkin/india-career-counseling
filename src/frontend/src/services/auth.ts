// Mock authentication service for local development
// Replace with actual backend calls once deployed

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock credentials - matches backend
    if (username === 'admin' && password === 'ICC@Admin2024') {
      const token = `admin-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      return {
        success: true,
        token: token,
      }
    }

    return {
      success: false,
      message: 'Invalid username or password',
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: 'An error occurred during login',
    }
  }
}

export async function validateAdminSession(token: string): Promise<boolean> {
  try {
    // For mock implementation, just check if token exists
    return !!token && token.startsWith('admin-token-')
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

export async function logoutAdmin(token: string): Promise<void> {
  try {
    // Mock logout - just clear the token
    console.log('User logged out')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
