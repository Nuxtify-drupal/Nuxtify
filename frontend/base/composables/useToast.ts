export default function useToast() {
  const toasts = useState<Toast[]>('toasts')

  if (!toasts.value)
    toasts.value = []

  const notify = (message: string, icon?: string) => {
    const id = toasts.value.length
      ? Math.max(...toasts.value.map(toast => toast.id)) + 1
      : 1

    toasts.value.push({ id, message, icon })
  }

  const error = (message: string) => {
    return notify(message, 'mdi:alert-octagon')
  }

  const success = (message: string) => {
    return notify(message, 'mdi:check-circle')
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts,
    error,
    success,
    removeToast,
  }
}
