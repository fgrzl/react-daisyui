import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function CardTitle({
  children,
  className,
  as: Component = 'h2',
  ...props
}: CardTitleProps) {
  return (
    <Component className={cn('card-title', className)} {...props}>
      {children}
    </Component>
  )
}
