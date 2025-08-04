import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import CardBody from './card-body'
import CardTitle from './card-title'
import CardActions from './card-actions'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  bordered?: boolean
  imageFull?: boolean
}

export default function Card({
  children,
  className,
  compact = false,
  shadow,
  bordered = false,
  imageFull = false,
  ...props
}: CardProps) {
  const baseClasses = 'card'

  const modifierClasses = [
    compact && 'card-compact',
    shadow && `shadow-${shadow}`,
    bordered && 'card-bordered',
    imageFull && 'image-full',
  ].filter(Boolean)

  const classes = cn(baseClasses, ...modifierClasses, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

// Attach sub-components to main Card
Card.Body = CardBody
Card.Title = CardTitle
Card.Actions = CardActions
