import process from 'node:process'

export default async function useAuth() {
  const user = useState<User | undefined>('user')

  const getUser = async (): Promise<User | undefined> => {
    if (process.client)
      return

    const uid = useCookie('auth.uid')
    const token = useCookie('auth.token')

    if (!uid.value || !token.value)
      return

    try {
      const userData = await $fetch<User | undefined>('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid.value,
          token: token.value,
        }),
      })

      return userData
    }
    catch (error) {}
  }

  await callOnce(async () => {
    user.value = await getUser()
  })

  const signIn = async (email: string, password: string, locale: string) => {
    if (!email.length || !password.length) {
      return {
        data: null,
        error: new Error('Email and password are required'),
      }
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          langcode: locale,
          email,
          password,
        }),
      })

      if (!response || Math.floor(response.status / 100) !== 2) {
        const json = await response.json()

        if (json.message) {
          return {
            data: null,
            error: json.message,
          }
        }
      }

      user.value = await getUser()

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
    locale: string,
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          langcode: locale,
          email,
          password,
          password_confirm,
        }),
      })

      if (!response || Math.floor(response.status / 100) !== 2) {
        const json = await response.json()

        if (json.message) {
          return {
            data: null,
            error: json.message,
          }
        }
      }

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

  const refresh = async () => {
    const token = useCookie('auth.token')

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token.value,
        }),
      })

      if (!response || Math.floor(response.status / 100) !== 2) {
        const json = await response.json()

        throw new Error(json.message)
      }
    }
    catch (error) {}
  }

  const signOut = async () => {
    const uid = useCookie('auth.uid')
    const token = useCookie('auth.token')

    uid.value = undefined
    token.value = undefined

    user.value = undefined
  }

  return {
    user,
    signIn,
    signUp,
    verify,
    refresh,
    signOut,
  }
}
