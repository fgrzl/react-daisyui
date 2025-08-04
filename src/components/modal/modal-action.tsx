import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface ModalActionProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end'
}

export default function ModalAction({
  children,
  className,
  justify = 'end',
  ...props
}: ModalActionProps) {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  } as const

  return (
    <div className={cn('modal-action', justifyClasses[justify], className)} {...props}>
      {children}
    </div>
  )
}
