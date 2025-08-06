import type { HTMLAttributes } from 'react'
import { usePress } from 'react-aria'
import { cn } from '@/utils/cn'
import CardBody from './card-body'
import CardTitle from './card-title'
import CardActions from './card-actions'

/**
 * Props for the Card component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the card.
 * @property {string} [className] - Additional CSS classes to apply to the card.
 * @property {boolean} [compact] - Whether to use compact styling with reduced padding.
 * @property {'sm' | 'md' | 'lg' | 'xl' | '2xl'} [shadow] - The shadow size to apply to the card.
 * @property {boolean} [bordered] - Whether to add a border around the card.
 * @property {boolean} [imageFull] - Whether images should fill the entire card area.
 * @property {boolean} [interactive] - Whether the card should be interactive/clickable.
 * @property {() => void} [onPress] - Handler for press/click events when interactive is true.
 * @property {boolean} [isDisabled] - Whether the card is disabled (only applies when interactive).
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  bordered?: boolean
  imageFull?: boolean
  interactive?: boolean
  onPress?: () => void
  isDisabled?: boolean
}

export default function Card({
  children,
  className,
  compact = false,
  shadow,
  bordered = false,
  imageFull = false,
  interactive = false,
  onPress,
  isDisabled = false,
  ...props
}: CardProps) {
  const baseClasses = 'card'

  const modifierClasses = [
    compact && 'card-compact',
    shadow && `shadow-${shadow}`,
    bordered && 'card-bordered',
    imageFull && 'image-full',
    interactive && 'cursor-pointer',
    interactive && !isDisabled && 'hover:shadow-lg transition-shadow',
    isDisabled && 'opacity-50 cursor-not-allowed',
  ].filter(Boolean)

  const classes = cn(baseClasses, ...modifierClasses, className)

  // Use React Aria's press functionality for interactive cards
  const { pressProps } = usePress({
    isDisabled: isDisabled || !interactive,
    onPress: interactive ? onPress : undefined,
  })

  // Apply press props only if card is interactive
  const cardProps = interactive
    ? {
        ...props,
        ...pressProps,
        role: props.role || 'button',
        tabIndex: isDisabled ? -1 : 0,
      }
    : props

  return (
    <div className={classes} {...cardProps}>
      {children}
    </div>
  )
}

// Attach sub-components to main Card
Card.Body = CardBody
Card.Title = CardTitle
Card.Actions = CardActions
