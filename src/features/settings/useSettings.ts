import { useQuery } from '@tanstack/react-query'
import { getSettings } from '../../services/apiSettings'
import { SettingsType } from '../../types'

export function useSettings(): {
  settings: SettingsType
  isLoading: boolean
  error: Error | null
} {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  return { settings, isLoading, error }
}
