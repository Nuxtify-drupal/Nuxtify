export default function useAuth() {
  const user = useState<User | undefined>('user', undefined)
  const { locale } = useI18n()

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
    if (!email.length || !password.length) {
      return {
        data: null,
        error: new Error('Email and password are required'),
      }
    }

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      await getUser()

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

  const signUp = async (
    email: string,
    password: string,
    password_confirm: string,
  ) => {
    if (!email.length || !password.length) {
      return {
        data: null,
        error: new Error('Email and password are required'),
      }
    }

    if (password !== password_confirm) {
      return {
        data: null,
        error: new Error('Passwords do not match'),
      }
    }

    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          langcode: locale.value,
          email,
          password,
          password_confirm,
        }),
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

  const verify = async (
    uid: string,
    timestamp: string,
    token: string,
  ) => {
    if (!uid.length || !timestamp.length || !token.length) {
      return {
        data: null,
        error: new Error('Invalid verification link'),
      }
    }

    try {
      const response = await $fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          timestamp,
          token,
        }),
      })

      if (!response)
        throw new Error('Verification failed')

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
    signUp,
    verify,
    signOut,
    isAuthenticated,
  }
}
