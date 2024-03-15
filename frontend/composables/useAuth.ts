interface User {
  name: string
}

export default function useAuth() {
  const user = useState<User | undefined>('user', undefined)

  const getUser = async (): Promise<User | undefined> => {
    const uid = useCookie('auth.uid')
    const token = useCookie('auth.token')

    if (!uid.value || !token.value)
      return

    try {
      user.value = await $fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid.value,
          token: token.value,
        }),
      })

      return user.value
    }
    catch (error) {}
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      return {
        data: response,
        error: null,
      }
    }
    catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  const signOut = async () => {
    const uid = useCookie('auth.uid')
    const token = useCookie('auth.token')

    uid.value = undefined
    token.value = undefined

    user.value = undefined
  }

  const isAuthenticated = computed(() => !!user.value)

  return {
    getUser,
    signIn,
    signOut,
    isAuthenticated,
  }
}
