import process from 'node:process'

export default eventHandler(async (event): Promise<User | undefined> => {
  const body = await readBody(event)

  const token = body.token
  const uid = body.uid

  try {
    const user = await $fetch<{
      [key: string]: { value: string }[]
    }>(`${process.env.NUXT_PUBLIC_BACKEND_URL}/user/${uid}?_format=json`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    return {
      id: uid,
      email: user.mail[0].value,
      name: user.name[0].value,
      role: 'account',
    }
  }
  catch (error) {
  }
})
