import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface ButtonProps extends AriaButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  loading?: boolean
  wide?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  className?: string
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  outline = false,
  loading = false,
  wide = false,
  block = false,
  circle = false,
  square = false,
  isDisabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'btn'

  const variantClasses = {
    primary: outline ? 'btn-outline btn-primary' : 'btn-primary',
    secondary: outline ? 'btn-outline btn-secondary' : 'btn-secondary',
    accent: outline ? 'btn-outline btn-accent' : 'btn-accent',
    neutral: outline ? 'btn-outline btn-neutral' : 'btn-neutral',
    info: outline ? 'btn-outline btn-info' : 'btn-info',
    success: outline ? 'btn-outline btn-success' : 'btn-success',
    warning: outline ? 'btn-outline btn-warning' : 'btn-warning',
    error: outline ? 'btn-outline btn-error' : 'btn-error',
    ghost: 'btn-ghost',
    link: 'btn-link',
  } as const

  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  } as const

  const modifierClasses = [
    loading && 'loading',
    wide && 'btn-wide',
    block && 'btn-block',
    circle && 'btn-circle',
    square && 'btn-square',
  ].filter(Boolean)

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    ...modifierClasses,
    className
  )

  return (
    <AriaButton className={classes} isDisabled={isDisabled || loading} {...props}>
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {children}
        </>
      ) : (
        children
      )}
    </AriaButton>
  )
}
