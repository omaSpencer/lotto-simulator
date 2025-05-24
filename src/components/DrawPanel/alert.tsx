import { AlertCircle } from 'lucide-react'
import { useMemo } from 'react'

import { AlertType } from '@/lib/enums'
import { useAppStore } from '@/lib/store'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  type AlertProps,
} from '@/components/Alert'

export const DrawPanelAlert = () => {
  const alert = useAppStore((state) => state.alert)

  const variant = useMemo((): AlertProps['variant'] => {
    switch (alert?.type) {
      case AlertType.ERROR:
        return 'destructive'
      case AlertType.WARNING:
        return 'warning'

      default:
        return 'default'
    }
  }, [alert?.type])

  if (alert === null) return null

  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.message}</AlertDescription>
    </Alert>
  )
}
