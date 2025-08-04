import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export default function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div className={cn('card-body', className)} {...props}>
      {children}
    </div>
  )
}
