import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end'
}

export default function CardActions({
  children,
  className,
  justify = 'end',
  ...props
}: CardActionsProps) {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  } as const

  return (
    <div className={cn('card-actions', justifyClasses[justify], className)} {...props}>
      {children}
    </div>
  )
}
